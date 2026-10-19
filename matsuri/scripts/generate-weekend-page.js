// 段階3。公開可否はこの定数だけで切り替える。
const ROBOTS_CONTENT = "index,follow";
const fs = require("fs");
const path = require("path");
const { MONTHS, REGIONS, MATSURI_ROOT, loadHubData, renderMonthPage } = require("./lib/hub-shared");
const OUTPUT = path.join(MATSURI_ROOT, "this-weekend/index.html");
const CANONICAL = "https://vigorlab.net/matsuri/this-weekend/";
const TITLE = "今週末の祭り｜開催確認済みの祭りを探す | MATSURI";
const DESCRIPTION = "今週末に開催が確認できた全国の祭りを、日程・地域・見どころ・駐車場情報から探せます。近日開催の祭りや月別・地域別の探し方も紹介します。";
const escape = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function todayJst(now = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(now);
}
function parseDate(text) {
  if (typeof text !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(text)) throw new Error(`不正な日付: ${text}`);
  const [y, m, d] = text.split("-").map(Number);
  const value = new Date(Date.UTC(y, m - 1, d));
  if (value.getUTCFullYear() !== y || value.getUTCMonth() + 1 !== m || value.getUTCDate() !== d) throw new Error(`不正な日付: ${text}`);
  return value;
}
function addDays(text, days) {
  const date = parseDate(text);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
function weekendRange(asOf) {
  const dow = parseDate(asOf).getUTCDay();
  const start = addDays(asOf, dow === 0 ? -1 : (6 - dow + 7) % 7);
  return { start, end: addDays(start, 1) };
}
const shortDate = (s) => { const [, m, d] = s.split("-").map(Number); return `${m}/${d}`; };
function formatCardDates(dates, asOf) {
  const remaining = [...new Set(dates.filter((date) => date >= asOf))].sort();
  const groups = [];
  for (const date of remaining) {
    const last = groups[groups.length - 1];
    if (last && addDays(last[1], 1) === date) last[1] = date;
    else groups.push([date, date]);
  }
  const format = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    return `${year === Number(asOf.slice(0, 4)) ? "" : `${year}年`}${month}月${day}日`;
  };
  return groups.slice(0, 3).map(([start, end]) => start === end ? format(start) : `${format(start)}〜${format(end)}`).join("・") + (groups.length > 3 ? "ほか" : "");
}
function monthWindows(asOf) {
  const [y, m] = asOf.split("-").map(Number);
  return [0, 1, 2].map((i) => ({ year: y + Math.floor((m - 1 + i) / 12), month: (m - 1 + i) % 12 + 1 }));
}

// すべての掲載ブロックが共用する確認済み判定。取得できない事実は補わない。
function confirmedEntry(festival, entry, asOf, { includeEnded = false } = {}) {
  if (!entry || (entry.eventStatus !== "confirmed" && !(includeEnded && entry.eventStatus === "ended"))) return { reason: "status_not_confirmed" };
  const dates = entry.dates;
  if (!Array.isArray(dates) || !dates.length) return { reason: "dates_empty" };
  try { dates.forEach(parseDate); } catch { return { reason: "invalid_date" }; }
  if (!Number.isInteger(entry.year)) return { reason: "invalid_entry_year" };
  const years = dates.map((d) => Number(d.split("-")[0]));
  if (years.some((y) => y < entry.year)) return { reason: "date_before_entry_year" };
  if (years[0] !== entry.year || years.some((y) => y > entry.year + 1)) return { reason: "date_year_mismatch" };
  const checked = entry.confirmation?.confirmedDate;
  try { parseDate(checked); } catch { return { reason: "confirmation_missing_or_invalid" }; }
  if (checked > asOf) return { reason: "confirmation_in_future" };
  const previousDates = (festival.yearlyInfo || []).filter((y) => y.year === entry.year - 1).flatMap((y) => y.dates || []).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
  const previousEnd = previousDates[previousDates.length - 1];
  const warning = previousEnd && checked <= previousEnd
    ? `::warning::${festival.id}: confirmedDate=${checked} が前年最終開催日=${previousEnd}以前（除外せず掲載）` : null;
  return { dates: [...dates].sort(), warning };
}
function buildModel(festivals, asOf, options = {}) {
  parseDate(asOf);
  const range = weekendRange(asOf), excluded = {}, warnings = [], valid = [];
  for (const festival of festivals) for (const yearlyInfo of festival.yearlyInfo || []) {
    const result = confirmedEntry(festival, yearlyInfo, asOf, options);
    if (result.reason) { excluded[result.reason] = (excluded[result.reason] || 0) + 1; continue; }
    if (result.warning) warnings.push(result.warning);
    if (!options.includeEnded && result.dates[result.dates.length - 1] < asOf) { excluded.already_past = (excluded.already_past || 0) + 1; continue; }
    valid.push({ festival, yearlyInfo, dates: result.dates, end: result.dates[result.dates.length - 1] });
  }
  const nextDate = (item) => item.dates.find((d) => d >= asOf) || item.end;
  valid.sort((a, b) => nextDate(a).localeCompare(nextDate(b)));
  const used = new Set();
  function take(items, limit = Infinity) {
    return items.filter((item) => { if (used.has(item.festival.id) || limit <= 0) return false; used.add(item.festival.id); limit--; return true; });
  }
  const inWindow = (item, start, end) => item.dates.some((d) => d >= start && d <= end);
  const weekend = take(valid.filter((item) => inWindow(item, range.start, range.end)));
  const upcoming = take(valid.filter((item) => inWindow(item, asOf, addDays(asOf, 13))));
  const nextWeekendDates = valid.filter((item) => !used.has(item.festival.id)).flatMap((item) => item.dates).filter((d) => d > range.end && [0, 6].includes(parseDate(d).getUTCDay())).sort();
  const nextRange = nextWeekendDates.length ? weekendRange(nextWeekendDates[0]) : null;
  const nextWeekend = nextRange ? take(valid.filter((item) => inWindow(item, nextRange.start, nextRange.end))) : [];
  const photo = (item) => Boolean(item.festival.constantInfo?.backgroundImage || item.festival.constantInfo?.atmosphereMedia?.length);
  const recommendations = take([...valid].sort((a, b) => nextDate(a).localeCompare(nextDate(b)) || Number(photo(b)) - Number(photo(a))), 6);
  const referenceMonths = monthWindows(asOf).filter(({ year, month }) => !valid.some((item) => item.dates.some((d) => Number(d.slice(0, 4)) === year && Number(d.slice(5, 7)) === month)));
  const references = [];
  for (const { month } of referenceMonths) {
    for (const festival of festivals) {
      if (references.length >= 6) break;
      if (used.has(festival.id)) continue;
      const yearlyInfo = (festival.yearlyInfo || []).find((y) => y.year === 2026 && ["confirmed", "ended"].includes(y.eventStatus) && y.dates?.some((d) => /^2026-\d{2}-\d{2}$/.test(d) && Number(d.slice(5, 7)) === month));
      if (!yearlyInfo) continue;
      used.add(festival.id);
      references.push({ festival, yearlyInfo, month });
    }
  }
  return { asOf, range, weekend, upcoming, nextRange, nextWeekend, recommendations, references, excluded, warnings };
}

// カード・head・ヘッダー・フッターの基礎は既存の月ハブテンプレートを再利用。
function renderPage(model, experienceTags, cssVersion, updatedDate) {
  const base = renderMonthPage(MONTHS[0], [], experienceTags, cssVersion, {});
  function card(item, reference = false) {
    const rendered = renderMonthPage(MONTHS[0], [item], experienceTags, cssVersion, {});
    const match = rendered.match(/<div class="festival-list">\s*([\s\S]*?)\s*<\/div>\s*<p class="disclaimer">/);
    if (!match) throw new Error("既存カードテンプレートを取得できません");
    let html = match[1].replace('href="../../festivals/', 'href="../festivals/').replaceAll('../../shared/', '../shared/');
    const dateText = reference ? `例年は${item.month}月ごろ・次回の日程は未発表` : formatCardDates(item.dates, model.asOf);
    html = html.replace(/<p class="item-date">[\s\S]*?<\/p>/, `<p class="item-date">${escape(dateText)}</p>`);
    html = html.replace(/<span class="status-badge[^>]*>[\s\S]*?<\/span>/, reference ? '<span class="source-meta">参考情報</span>' : '<span class="status-badge status-confirmed">開催確認済み</span>');
    html = html.replace(/data-event-status="[^"]*"/, `data-event-status="${reference ? "reference" : "confirmed"}"`);
    if (!reference) html = html.replace('<a class=', `<a data-end="${item.end}" class=`).replace('</div>\n      </a>', `<p class="source-meta">確認日：${escape(item.yearlyInfo.confirmation.confirmedDate)}</p></div>\n      </a>`);
    return html;
  }
  function section(id, title, items, reference = false) {
    return items.length ? `<section id="${id}"${reference ? '' : ' data-weekend-block'}><h2>${escape(title)}</h2><div class="festival-list">${items.map((item) => card(item, reference)).join("\n")}</div></section>` : "";
  }
  const groups = {};
  for (const item of model.weekend) {
    const area = Object.entries(REGIONS).find(([, r]) => r.prefectures.includes(item.festival.areaTag))?.[1]?.label || "その他";
    (groups[area] ||= []).push(item);
  }
  const weekendBlock = model.weekend.length ? `<section id="this-weekend-section" data-weekend-block><h2>今週末の開催確認済み</h2>${Object.entries(groups).map(([area, items]) => `<section data-weekend-block><h3>${escape(area)}</h3><div class="festival-list">${items.map((item) => card(item)).join("\n")}</div></section>`).join("\n")}</section>` : "";
  const lead = model.weekend.length ? `今週末は全国で${model.weekend.length}件、開催を確認済みです。` : `今週末（${shortDate(model.range.start)}〜${shortDate(model.range.end)}）に開催が確認できた祭りはありません。`;
  const monthLinks = monthWindows(model.asOf).map(({ month }) => `<a href="../months/${MONTHS[month - 1].slug}/">${month}月の祭り</a>`).join(" ／ ");
  const regionLinks = ["kanto", "tohoku", "chubu", "kinki", "chugoku", "shikoku", "kyushu"].map((slug) => `<a href="../regions/${slug}/">${REGIONS[slug].label}</a>`).join(" ／ ");
  const featureLinks = [["dashi", "山車"], ["mikoshi", "神輿"], ["odori", "踊り"], ["hikimawashi", "曳き回し"], ["night", "夜が見どころ"]].map(([slug, label]) => `<a href="../features/${slug}/">${label}</a>`).join(" ／ ");
  const main = `<main class="page-shell" data-weekend-start="${model.range.start}" data-weekend-end="${model.range.end}">
<!-- 自動生成: matsuri/scripts/generate-weekend-page.js（手動編集せず生成元を更新） -->
<header class="list-header"><nav class="breadcrumb" aria-label="パンくずリスト"><a href="../">MATSURI</a> &gt; <span>今週末の祭り</span></nav><h1>今週末の祭り（${shortDate(model.range.start)}(土)〜${shortDate(model.range.end)}(日)）</h1><p id="weekend-lead" class="header-description">${lead}</p></header>
<p id="weekend-stale-banner" role="status" hidden>この情報は更新待ちです。最新の祭りは月別・地域別からご覧ください。</p>
${weekendBlock}
${section("upcoming-section", "開催中・もうすぐ開催", model.upcoming)}
${section("next-weekend-section", model.nextRange ? `次に祭りがある週末（${shortDate(model.nextRange.start)}〜${shortDate(model.nextRange.end)}）` : "次に祭りがある週末", model.nextWeekend)}
${section("recommendations-section", "今後のおすすめ", model.recommendations)}
<nav class="month-switch" aria-label="月別に探す">${monthLinks}</nav>
${section("seasonal-reference-section", "例年この時期（参考）", model.references, true)}
<section id="find-festivals"><h2>探し方</h2><nav class="month-switch" aria-label="地域から探す">${regionLinks}</nav><nav class="month-switch" aria-label="特徴から探す">${featureLinks}</nav><p><a class="search-link-button" href="../#festival-list">祭りを検索する →</a></p></section>
<section id="publication-policy"><h2>掲載基準と更新日</h2><p>公式で日付を確認できた祭りのみ掲載しています。「例年この時期」は参考情報です。当日は公式で最新の開催状況をご確認ください。</p><p data-content-updated>掲載内容の更新日：<time datetime="${updatedDate}">${updatedDate}</time>（日本時間）</p></section>
</main>`;
  let html = base.replace(/<main[\s\S]*?<\/main>/, main).replace(/<title>.*?<\/title>/, `<title>${TITLE}</title>`)
    .replace(/<link rel="canonical"[^>]+>/, `<link rel="canonical" href="${CANONICAL}">`)
    .replace(/<meta name="description"[^>]+>/, `<meta name="description" content="${DESCRIPTION}">\n    <meta name="robots" content="${ROBOTS_CONTENT}">`)
    .replace(/<meta property="og:title"[^>]+>/, `<meta property="og:title" content="${TITLE}">`)
    .replace(/<meta property="og:description"[^>]+>/, `<meta property="og:description" content="${DESCRIPTION}">`)
    .replace(/<meta property="og:url"[^>]+>/, `<meta property="og:url" content="${CANONICAL}">`)
    .replace(/<meta name="twitter:title"[^>]+>/, `<meta name="twitter:title" content="${TITLE}">`)
    .replace(/<meta name="twitter:description"[^>]+>/, `<meta name="twitter:description" content="${DESCRIPTION}">`)
    .replace(/<link rel="alternate"[^>]+>\n/g, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
    .replace(/\s*<script src="\.\.\/\.\.\/shared\/hub-filter\.js[^>]+><\/script>/, "")
    .replaceAll('../../shared/', '../shared/');
  const visible = [...new Map([...model.weekend, ...model.upcoming, ...model.nextWeekend, ...model.recommendations, ...model.references].map((item) => [item.festival.id, item])).values()];
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", dateModified: updatedDate, numberOfItems: visible.length, itemListElement: visible.map((item) => `https://vigorlab.net/matsuri/festivals/${item.festival.id}/`) };
  const breadcrumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "MATSURI", item: "https://vigorlab.net/matsuri/" }, { "@type": "ListItem", position: 2, name: "今週末の祭り", item: CANONICAL }] };
  html = html.replace('</head>', `<style>[hidden]{display:none!important}#seasonal-reference-section{font-size:.9em;color:var(--muted)}#weekend-stale-banner{padding:12px;border:1px solid var(--line)}</style>\n<script type="application/ld+json">${JSON.stringify(breadcrumbs)}</script>\n<script type="application/ld+json">${JSON.stringify(itemList)}</script>\n</head>`)
    .replace('</body>', '<script src="../shared/weekend-page.js?v=1"></script>\n</body>');
  return html.replace(/[ \t]+$/gm, "");
}
function normalizeUpdated(html) {
  return html.replace(/<p data-content-updated>[\s\S]*?<\/p>/g, "").replace(/"dateModified":"\d{4}-\d{2}-\d{2}"/g, '"dateModified":""');
}
function generate({ festivals, experienceTags, cssVersion, asOf = todayJst(), existing = "", includeEnded = false }) {
  const model = buildModel(festivals, asOf, { includeEnded });
  const html = renderPage(model, experienceTags, cssVersion, asOf);
  const changed = normalizeUpdated(html) !== normalizeUpdated(existing);
  return { model, changed, html: changed ? html : existing };
}
function releaseGate(html, topHtml, sitemap, robots = ROBOTS_CONTENT) {
  return [
    ["a: index,follow と生成HTMLの一致", robots === "index,follow" && html.includes(`<meta name="robots" content="${robots}">`)],
    ["b: トップへのリンク追加", /href=["'](?:https:\/\/vigorlab\.net)?\/matsuri\/this-weekend\/["']/.test(topHtml)],
    ["c: sitemap登録", /<loc>\s*https:\/\/vigorlab\.net\/matsuri\/this-weekend\/\s*<\/loc>/.test(sitemap)]
  ];
}
function atomicWrite(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.tmp`;
  try { fs.writeFileSync(temp, html, { flag: "wx" }); fs.renameSync(temp, file); }
  finally { if (fs.existsSync(temp)) fs.unlinkSync(temp); }
}
function main(args = process.argv.slice(2)) {
  const allowed = new Set(["--as-of", "--include-ended", "--check", "--summary"]);
  let asOf = todayJst(), overridden = false;
  for (let i = 0; i < args.length; i++) {
    if (!allowed.has(args[i])) throw new Error(`不明な引数: ${args[i]}`);
    if (args[i] === "--as-of") { asOf = args[++i]; parseDate(asOf); overridden = true; }
  }
  // 検証用オプションでは本番生成物へ書き込まない。検証はメモリ上のみ。
  const sandbox = overridden || args.includes("--include-ended");
  const { items, experienceTags, cssVersion } = loadHubData();
  const festivals = items.map((item) => item.festival);
  const existing = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, "utf8") : "";
  const result = generate({ festivals, experienceTags, cssVersion, asOf, existing, includeEnded: args.includes("--include-ended") });
  for (const [reason, count] of Object.entries(result.model.excluded)) console.log(`除外 ${reason}: ${count}件（年度エントリ）`);
  result.model.warnings.forEach((warning) => console.log(warning));
  if (args.includes("--check")) {
    const actual = sandbox ? result.html : existing;
    if (normalizeUpdated(actual) !== normalizeUpdated(result.html) || !actual.includes(`<meta name="robots" content="${ROBOTS_CONTENT}">`)) throw new Error("CHECK FAIL: 日付・内容・robotsが現在の生成結果と一致しません");
    console.log(`CHECK PASS${sandbox ? "（--as-of/検証専用・メモリ上）" : "（本番生成物・当日JST）"}`);
  } else if (!sandbox && result.changed) atomicWrite(OUTPUT, result.html);
  if (sandbox) console.log("検証専用：メモリ上で生成。本番index.htmlは変更していません。");
  console.log(JSON.stringify({ weekend: result.model.weekend.map((i) => i.festival.id), upcoming: result.model.upcoming.length, nextWeekend: result.model.nextWeekend.length, recommendations: result.model.recommendations.length, references: result.model.references.length }));
  if (args.includes("--summary")) console.log(`SUMMARY date=${asOf} changed=${!sandbox && !args.includes("--check") && result.changed} weekend=${shortDate(result.model.range.start)}-${shortDate(result.model.range.end)} confirmed_weekend=${result.model.weekend.length} upcoming=${result.model.upcoming.length} warnings=${result.model.warnings.length}`);
  return result;
}
module.exports = { ROBOTS_CONTENT, OUTPUT, todayJst, parseDate, addDays, weekendRange, formatCardDates, confirmedEntry, buildModel, renderPage, generate, normalizeUpdated, releaseGate, atomicWrite, main };
if (require.main === module) { try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; } }
