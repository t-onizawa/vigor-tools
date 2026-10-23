#!/usr/bin/env node
/*
 * 静的ページ整合性チェック（読み取り専用・警告レポートのみ）
 *
 * data.js（唯一の正）と、生成済みの静的HTML（title・description・OG・JSON-LD・本文）、
 * ハブ（都道府県・月別）のカード、検索インデックスの食い違いを検出する。
 * 何も書き換えない。既存のcheck-data-integrity.jsが見ない「data.js ↔ 生成物」の比較が目的。
 *
 * 使い方:
 *   node matsuri/scripts/check-static-consistency.js            全件・人間向けレポート
 *   node matsuri/scripts/check-static-consistency.js --json     JSON出力
 *   node matsuri/scripts/check-static-consistency.js --slug a,b 対象を絞る
 *   node matsuri/scripts/check-static-consistency.js --root DIR  別のmatsuri/を検査（テスト用）
 *   node matsuri/scripts/check-static-consistency.js --strict   ERRORがあれば終了コード1
 *   node matsuri/scripts/check-static-consistency.js --save-baseline FILE  現在の結果を基準値として保存
 *   node matsuri/scripts/check-static-consistency.js --baseline FILE       基準値との増減（新規・解消）を表示
 *
 * 重大度: ERROR=事実の食い違いの可能性が高い / WARN=要確認 / INFO=形式差・設計上の差
 */
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const ROOT = path.resolve(opt("--root") || path.join(__dirname, ".."));
const ONLY = opt("--slug") ? new Set(opt("--slug").split(",")) : null;
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const BASE = "https://vigorlab.net/matsuri/";
const EVENT_STATUS_URL = {
  confirmed: "EventScheduled", scheduled_pending_official: "EventScheduled", off_year: "EventScheduled",
  unconfirmed: "EventScheduled", ended: "EventScheduled", postponed: "EventPostponed", cancelled: "EventCancelled"
};
const STATUS_BADGE = {
  confirmed: "開催確認済み", scheduled_pending_official: "開催予定・公式詳細待ち", off_year: "陰祭年（本祭なし）",
  unconfirmed: "未確認", cancelled: "中止", postponed: "延期", ended: "終了"
};

const findings = [];
const add = (slug, severity, check, message, detail) => findings.push({ slug, severity, check, message, detail: detail || null });

function readFestival(slug) {
  const f = path.join(ROOT, "festivals", slug, "data.js");
  if (!fs.existsSync(f)) return null;
  return new Function(fs.readFileSync(f, "utf8") + "\nreturn FESTIVAL;")();
}
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
const decode = (s) => String(s).replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const meta = (html, re) => { const m = html.match(re); return m ? decode(m[1]) : null; };
const pad = (n) => String(n).padStart(2, "0");
const iso = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;

// テキスト中の日付を抽出する。「10月9日〜11日」「10月3日・4日」「2026年10月30日(金)〜3日(火)」等に対応。
function extractDates(text, defaultYear) {
  const out = new Set();
  const re = /(?:(\d{4})年)?(\d{1,2})月(\d{1,2})日(?:[（(][^）)]*[）)])?|([〜～~・])(?:(\d{1,2})月)?(\d{1,2})日(?:[（(][^）)]*[）)])?/g;
  let m, prev = null, prevEnd = -1;
  const expand = (a, b) => {
    const d1 = new Date(a + "T00:00:00Z"), d2 = new Date(b + "T00:00:00Z");
    for (let t = d1.getTime(); t <= d2.getTime() && t - d1.getTime() < 40 * 864e5; t += 864e5) out.add(new Date(t).toISOString().slice(0, 10));
  };
  while ((m = re.exec(text))) {
    let y, mo, d, sep = null;
    if (m[2]) { y = m[1] ? +m[1] : (prev ? prev.y : defaultYear); mo = +m[2]; d = +m[3]; }
    else if (m[5]) { y = prev ? prev.y : defaultYear; mo = +m[5]; d = +m[6]; sep = m[4]; }
    else {
      // 「〜11日」「・4日」のように直前の日付に隣接する日だけを続きとして扱う（文中の「12日は」等は無視）
      if (!prev || m.index !== prevEnd) continue;
      sep = m[4]; y = prev.y; mo = prev.mo; d = +m[6];
      if (d < prev.d) { mo += 1; if (mo > 12) { mo = 1; y += 1; } }
    }
    const cur = iso(y, mo, d);
    out.add(cur);
    if (prev && m.index === prevEnd && (sep === "〜" || sep === "～" || sep === "~")) expand(iso(prev.y, prev.mo, prev.d), cur);
    prev = { y, mo, d };
    prevEnd = m.index + m[0].length;
  }
  return out;
}
const nonPast = (s) => [...s].sort();

function checkDatesInText(slug, where, text, dates, year, severityMismatch) {
  if (!dates.length) return;
  const found = extractDates(text, year);
  if (!found.size) { add(slug, "INFO", `${where}.date-missing`, `${where}に日付表記がない`, text.slice(0, 80)); return; }
  const first = dates[0], last = dates[dates.length - 1];
  const outside = nonPast(found).filter((d) => d < first || d > last);
  if (outside.length) add(slug, severityMismatch, `${where}.date-mismatch`, `${where}の日付がdata.jsの範囲(${first}〜${last})外`, `表記=${outside.join(",")} / ${text.slice(0, 80)}`);
  else if (!found.has(first)) add(slug, dates.length > 5 ? "INFO" : "WARN", `${where}.first-date`, `${where}にdata.jsの首日(${first})が含まれない`, text.slice(0, 80));
}

function checkFestival(slug, hubs, searchIndex) {
  const F = readFestival(slug);
  const html = read(path.join(ROOT, "festivals", slug, "index.html"));
  if (!F) { add(slug, "ERROR", "data.missing", "data.jsがない"); return; }
  if (!html) { add(slug, "ERROR", "html.missing", "静的HTML(index.html)がない"); return; }
  const Y = [...F.yearlyInfo].sort((a, b) => b.year - a.year)[0];
  if (!Y) { add(slug, "ERROR", "data.noYear", "yearlyInfoがない"); return; }
  const status = Y.eventStatus, dates = Array.isArray(Y.dates) ? [...Y.dates].sort() : [];
  const title = meta(html, /<title>([^<]*)<\/title>/);
  const desc = meta(html, /name="description" content="([^"]*)"/);
  const og = { title: meta(html, /property="og:title" content="([^"]*)"/), desc: meta(html, /property="og:description" content="([^"]*)"/) };
  const tw = { title: meta(html, /name="twitter:title" content="([^"]*)"/), desc: meta(html, /name="twitter:description" content="([^"]*)"/) };
  const canonical = meta(html, /<link rel="canonical" href="([^"]*)"/);
  const h1 = meta(html, /<h1[^>]*>([^<]*)<\/h1>/);

  // 基本
  if (canonical !== `${BASE}festivals/${slug}/`) add(slug, "ERROR", "canonical", "canonicalがslugと一致しない", canonical);
  if (h1 !== F.name) add(slug, "WARN", "h1", "H1が祭り名と一致しない", `${h1} / ${F.name}`);

  // title / description の日付
  if (title) checkDatesInText(slug, "title", title, dates, Y.year, "ERROR");
  if (desc) checkDatesInText(slug, "description", desc.replace(/例年[^。]*。?/g, ""), dates, Y.year, "ERROR");

  // OG/Twitterの複製が同期しているか
  if (title && og.title !== null && og.title !== title) add(slug, "ERROR", "og.title", "og:titleがtitleと異なる", og.title);
  if (desc && og.desc !== null && og.desc !== desc) add(slug, "WARN", "og.description", "og:descriptionがdescriptionと異なる（意図的な別文面の可能性。事実情報は要確認）");
  if (title && tw.title !== null && tw.title !== title) add(slug, "ERROR", "twitter.title", "twitter:titleがtitleと異なる", tw.title);
  if (desc && tw.desc !== null && tw.desc !== desc) add(slug, "WARN", "twitter.description", "twitter:descriptionがdescriptionと異なる（意図的な別文面の可能性。事実情報は要確認）");

  // 状態表現と eventStatus
  const head = [title, desc].filter(Boolean).join(" ／ ");
  const pendingWords = /開催予定|詳細発表待ち|日程未発表|開催時期は未定/;
  if (pendingWords.test(head)) {
    if (status === "ended") add(slug, "ERROR", "status.stale-pending", "終了済みなのにtitle/descriptionに「開催予定・発表待ち・未発表」が残っている", head.match(pendingWords)[0]);
    else if (status === "confirmed") add(slug, /日程未発表/.test(head) && dates.length ? "ERROR" : "WARN", "status.pending-while-confirmed", "confirmedなのに「開催予定・発表待ち・未発表」が残っている（詳細未公開による意図的な表記なら要確認）", head.match(pendingWords)[0]);
  }
  if (status === "cancelled" && !/中止/.test(head)) add(slug, "WARN", "status.cancelled-wording", "cancelledだがtitle/descriptionに「中止」がない");
  if (status === "postponed" && !/延期/.test(head)) add(slug, "WARN", "status.postponed-wording", "postponedだがtitle/descriptionに「延期」がない");
  if (["scheduled_pending_official", "unconfirmed"].includes(status) && !/予定|未発表|発表待ち|未定|未確認/.test(head)) add(slug, "WARN", "status.uncertain-wording", `${status}だがtitle/descriptionに未確定を示す表現がない`, title);

  // JSON-LD
  const lds = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch (e) { return { __parseError: true }; } });
  if (lds.some((x) => x.__parseError)) add(slug, "ERROR", "jsonld.parse", "JSON-LDがJSONとして壊れている");
  const ev = lds.find((x) => x["@type"] === "Event");
  if (dates.length && !ev) add(slug, "ERROR", "jsonld.event-missing", "日付があるのにEvent JSON-LDがない");
  if (!dates.length && ev) add(slug, "ERROR", "jsonld.event-without-dates", "日付がないのにEvent JSON-LDがある");
  if (ev && dates.length) {
    if (ev.startDate !== dates[0] || (ev.endDate || ev.startDate) !== dates[dates.length - 1]) add(slug, "ERROR", "jsonld.dates", "JSON-LDの開催日がdata.jsと一致しない", `${ev.startDate}〜${ev.endDate} / data=${dates[0]}〜${dates[dates.length - 1]}`);
    const want = EVENT_STATUS_URL[status];
    if (want && !String(ev.eventStatus || "").endsWith(want)) add(slug, "ERROR", "jsonld.status", "JSON-LDのeventStatusがdata.jsの状態と合わない", `${ev.eventStatus} / ${status}`);
    if (["unconfirmed", "scheduled_pending_official"].includes(status)) add(slug, "WARN", "jsonld.uncertain-emitted", `${status}（日程が確定でない可能性）のページでEvent JSON-LDが日付付きで出力されている`);
    if (ev.name !== F.name) add(slug, "INFO", "jsonld.name", "JSON-LDのnameが祭り名と異なる", ev.name);
    for (const s of ev.subEvent || []) {
      const d = String(s.startDate || "").slice(0, 10);
      if (!dates.includes(d)) add(slug, "ERROR", "jsonld.subevent-date", "subEventの日付がdata.jsのdatesに含まれない", s.startDate);
      if (/頃|ごろ|予定|目安|終了|開始予定/.test(s.name || "")) add(slug, "WARN", "jsonld.subevent-approx", "目安・予定・終了を示すsubEventが確定時刻として出力されている（8-3：目安時刻は「頃」「〜」付きで非出力にする）", `${s.name} ${s.startDate}`);
    }
  }

  const pk = Y.access ? Y.access.hasParking : undefined;
  // 駐車場の表記
  const pkLabel = pk === true ? "あり" : pk === false ? "なし" : pk === "n/a" ? "該当なし" : "未確認";
  const dm = desc && (desc.match(/駐車場(?:情報)?は(あり|なし|未確認|要確認)/) || desc.match(/\d{4}年は駐車場(あり|なし)/));
  if (dm && dm[1] !== pkLabel && !(pkLabel === "未確認" && dm[1] === "要確認")) add(slug, "ERROR", "parking.description", "descriptionの駐車場表記がdata.jsと異なる", `${dm[1]} / data=${pkLabel}`);
  const body = (html.match(/<span class="detail-term">駐車場<\/span><span class="detail-value">([^<]*)</) || [])[1];
  if (body && body !== pkLabel) add(slug, "ERROR", "parking.body", "本文の駐車場表記がdata.jsと異なる", `${body} / data=${pkLabel}`);
  const tp = title && title.match(/駐車場(あり|なし|要確認|未確認)/);
  if (tp && tp[1] !== pkLabel && !(["要確認", "未確認"].includes(tp[1]) && pkLabel === "未確認")) add(slug, "WARN", "parking.title", "titleの駐車場表記がdata.jsと異なる", `${tp[1]} / data=${pkLabel}`);

  // 検索インデックス
  const si = searchIndex.get(slug);
  if (!si) add(slug, "ERROR", "searchIndex.missing", "検索インデックスに未登録");
  else {
    if (dates.length && si.firstDate !== dates[0]) add(slug, "ERROR", "searchIndex.firstDate", "検索インデックスのfirstDateがdata.jsと異なる", `${si.firstDate} / ${dates[0]}`);
    if (si.name !== F.name) add(slug, "WARN", "searchIndex.name", "検索インデックスの名称が異なる", `${si.name} / ${F.name}`);
  }

  // ハブ（都道府県・月別）のカード
  const cardChecks = (hubName, html2, expectPresent) => {
    if (!html2) { add(slug, "WARN", "hub.page-missing", `${hubName}のページがない`); return; }
    const card = extractCard(html2, slug);
    if (!card) { if (expectPresent) add(slug, "ERROR", "hub.missing", `${hubName}にカードがない`); return; }
    if (card.status && card.status !== status) add(slug, "ERROR", "hub.status", `${hubName}のカードのdata-event-statusが異なる`, `${card.status} / ${status}`);
    if (card.badge && STATUS_BADGE[status] && !card.badge.includes(STATUS_BADGE[status])) add(slug, "ERROR", "hub.badge", `${hubName}のカードの状態バッジが異なる`, `${card.badge} / ${status}`);
    if (card.parking && card.parking !== pkLabel) add(slug, "ERROR", "hub.parking", `${hubName}のカードの駐車場表記が異なる`, `${card.parking} / data=${pkLabel}`);
    if (card.dateText && dates.length) {
      const found = extractDates(card.dateText, Y.year);
      const first = dates[0], last = dates[dates.length - 1];
      if (found.size && (!found.has(first) || nonPast(found).some((d) => d < first || d > last))) add(slug, "ERROR", "hub.dates", `${hubName}のカードの日付が異なる`, `${card.dateText} / data=${first}〜${last}`);
    }
  };
  cardChecks(`都道府県ハブ(${F.areaTag})`, hubs.pref.get(F.areaTag), true);
  const months = [...new Set(dates.map((d) => +d.slice(5, 7)))];
  for (const mo of months) cardChecks(`月別ハブ(${MONTHS[mo - 1]})`, hubs.month.get(MONTHS[mo - 1]), true);
}

function extractCard(hubHtml, slug) {
  const re = new RegExp(`<a class="festival-item[^"]*"[^>]*href="[^"]*festivals/${slug}/"[^>]*>([\\s\\S]*?)</a>`);
  const m = hubHtml.match(re);
  if (!m) return null;
  const tag = m[0].slice(0, m[0].indexOf(">") + 1);
  return {
    status: (tag.match(/data-event-status="([^"]*)"/) || [])[1] || null,
    badge: (m[1].match(/class="status-badge[^"]*">([^<]*)</) || [])[1] || null,
    parking: (m[1].match(/<span class="meta-label">駐車場<\/span><span class="meta-value">([^<]*)</) || [])[1] || null,
    dateText: (m[1].match(/\d{4}年\d{1,2}月\d{1,2}日[^<]*/) || [])[0] || null
  };
}

function main() {
  const slugs = fs.readdirSync(path.join(ROOT, "festivals")).filter((d) => fs.existsSync(path.join(ROOT, "festivals", d, "data.js")));
  const si = read(path.join(ROOT, "shared", "search-index.js")) || "";
  const searchIndex = new Map();
  try { const arr = new Function(si + "\nreturn SEARCH_INDEX;")(); arr.forEach((e) => searchIndex.set(e.slug, e)); } catch (e) { add("(全体)", "ERROR", "searchIndex.parse", "search-index.jsを読めない"); }
  const hubs = { pref: new Map(), month: new Map() };
  const prefDir = path.join(ROOT, "prefectures");
  if (fs.existsSync(prefDir)) fs.readdirSync(prefDir).forEach((d) => { const h = read(path.join(prefDir, d, "index.html")); if (h) hubs.pref.set(d, h); });
  MONTHS.forEach((m) => { const h = read(path.join(ROOT, "months", m, "index.html")); if (h) hubs.month.set(m, h); });
  const targets = slugs.filter((s) => !ONLY || ONLY.has(s));
  targets.forEach((s) => { try { checkFestival(s, hubs, searchIndex); } catch (e) { add(s, "ERROR", "script.exception", String(e.message)); } });

  const by = (sev) => findings.filter((f) => f.severity === sev);
  if (flag("--json")) { console.log(JSON.stringify({ scanned: targets.length, findings }, null, 2)); }
  else {
    console.log("=== VIGOR MATSURI 静的ページ整合性チェック（読み取り専用・警告のみ） ===");
    console.log(`対象: ${targets.length}件 / ERROR ${by("ERROR").length} / WARN ${by("WARN").length} / INFO ${by("INFO").length}`);
    const checks = {};
    findings.forEach((f) => { checks[f.check] = (checks[f.check] || 0) + 1; });
    console.log("\n[検査項目別の件数]");
    Object.entries(checks).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
    for (const sev of ["ERROR", "WARN", "INFO"]) {
      const list = by(sev); if (!list.length) continue;
      console.log(`\n[${sev}] ${list.length}件`);
      list.forEach((f) => console.log(`  ${f.slug} | ${f.check} | ${f.message}${f.detail ? " | " + f.detail : ""}`));
    }
  }
  const keyOf = (f) => `${f.severity}|${f.slug}|${f.check}`;
  const counts = { ERROR: by("ERROR").length, WARN: by("WARN").length, INFO: by("INFO").length };
  const byCheck = {};
  findings.forEach((f) => { byCheck[f.check] = (byCheck[f.check] || 0) + 1; });
  if (opt("--save-baseline")) {
    const out = { savedAt: new Date().toISOString().slice(0, 10), scanned: targets.length, counts, byCheck, keys: findings.map(keyOf).sort() };
    fs.writeFileSync(path.resolve(opt("--save-baseline")), JSON.stringify(out, null, 2) + "\n");
    console.log(`\n基準値を保存しました: ${opt("--save-baseline")}（ERROR ${counts.ERROR} / WARN ${counts.WARN} / INFO ${counts.INFO}）`);
  }
  if (opt("--baseline")) {
    const base = JSON.parse(fs.readFileSync(path.resolve(opt("--baseline")), "utf8"));
    const cur = new Set(findings.map(keyOf)), old = new Set(base.keys);
    const added = [...cur].filter((k) => !old.has(k)).sort(), resolved = [...old].filter((k) => !cur.has(k)).sort();
    console.log(`\n=== 基準値(${base.savedAt})との比較 ===`);
    for (const sev of ["ERROR", "WARN", "INFO"]) console.log(`  ${sev}: ${base.counts[sev]} → ${counts[sev]}（${counts[sev] - base.counts[sev] >= 0 ? "+" : ""}${counts[sev] - base.counts[sev]}）`);
    console.log(`  新規 ${added.length}件 / 解消 ${resolved.length}件`);
    added.forEach((k) => console.log(`    + ${k}`));
    resolved.forEach((k) => console.log(`    - ${k}`));
  }
  if (flag("--strict") && by("ERROR").length) process.exit(1);
}
main();
