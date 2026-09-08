const fs = require("fs");
const path = require("path");

const MATSURI_ROOT = path.resolve(__dirname, "..");
const FESTIVALS_ROOT = path.join(MATSURI_ROOT, "festivals");
const SHARED_ROOT = path.join(MATSURI_ROOT, "shared");
const MONTHS = [
  { number: 7, slug: "july", label: "7月" },
  { number: 8, slug: "august", label: "8月" },
  { number: 9, slug: "september", label: "9月" }
];

const EVENT_STATUS_LABELS = {
  confirmed: "開催確認済み",
  scheduled_pending_official: "開催予定・公式詳細待ち",
  off_year: "陰祭年（本祭なし）",
  unconfirmed: "未確認",
  cancelled: "中止",
  postponed: "延期",
  ended: "終了"
};
const EVENT_STATUS_GROUPS = {
  confirmed: 0,
  scheduled_pending_official: 0,
  off_year: 1,
  unconfirmed: 1,
  postponed: 2,
  cancelled: 3,
  ended: 4
};
const HIGHLIGHT_TIME_LABELS = {
  morning: "朝",
  daytime: "昼",
  day: "昼",
  evening: "夕方",
  night: "夜",
  both: "昼・夜"
};
const CARD_FEATURE_ITEMS = [
  ["山車", "hasDashi", "dashi"],
  ["神輿", "hasMikoshi", "mikoshi"],
  ["踊り", "hasDanceOnDashi", "odori"],
  ["曳き回し", "hasParade", "hikimawashi"]
];
const ICON_FILES = ["dashi", "mikoshi", "odori", "hikimawashi", "midokoro"];
const ICONS = Object.fromEntries(
  ICON_FILES.map((name) => [name, fs.readFileSync(path.join(SHARED_ROOT, "icons", `${name}.svg`), "utf8").trim()])
);

function evaluateConstant(filePath, constantName) {
  const source = fs.readFileSync(filePath, "utf8");
  return new Function(`${source}\nreturn ${constantName};`)();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getPrimaryYearlyInfo(festival) {
  if (!festival || !Array.isArray(festival.yearlyInfo) || festival.yearlyInfo.length === 0) return null;
  const currentYear = new Date().getFullYear();
  const validEntries = festival.yearlyInfo.filter((entry) => entry && typeof entry.year === "number" && Number.isFinite(entry.year));
  if (validEntries.length === 0) return null;
  const currentEntry = validEntries.find((entry) => entry.year === currentYear);
  if (currentEntry) return currentEntry;
  const futureEntries = validEntries.filter((entry) => entry.year > currentYear);
  if (futureEntries.length > 0) {
    return futureEntries.reduce((nearest, entry) => entry.year < nearest.year ? entry : nearest);
  }
  const pastEntries = validEntries.filter((entry) => entry.year < currentYear);
  if (pastEntries.length > 0) {
    return pastEntries.reduce((latest, entry) => entry.year > latest.year ? entry : latest);
  }
  return null;
}

function getEventStatusGroup(status) {
  return Object.prototype.hasOwnProperty.call(EVENT_STATUS_GROUPS, status) ? EVENT_STATUS_GROUPS[status] : 1;
}

function isEventStatusPastDue(yearlyInfo) {
  const dates = yearlyInfo && Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
  if (dates.length === 0) return false;
  const lastDateEnd = new Date(`${dates[dates.length - 1]}T23:59:59+09:00`).getTime();
  return Number.isFinite(lastDateEnd) && lastDateEnd < Date.now();
}

function getEffectiveEventStatus(yearlyInfo) {
  const status = yearlyInfo && yearlyInfo.eventStatus;
  if ((status === "confirmed" || status === "scheduled_pending_official") && isEventStatusPastDue(yearlyInfo)) return "ended";
  return status;
}

function dateValue(yearlyInfo) {
  const firstDate = yearlyInfo && Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates[0] : null;
  const time = firstDate ? new Date(`${firstDate}T00:00:00+09:00`).getTime() : NaN;
  return Number.isFinite(time) ? time : Number.POSITIVE_INFINITY;
}

function sortFestivalItems(items) {
  return [...items].sort((a, b) => {
    const groupA = getEventStatusGroup(getEffectiveEventStatus(a.yearlyInfo));
    const groupB = getEventStatusGroup(getEffectiveEventStatus(b.yearlyInfo));
    if (groupA !== groupB) return groupA - groupB;
    const dateA = dateValue(a.yearlyInfo);
    const dateB = dateValue(b.yearlyInfo);
    return groupA === 4 ? dateB - dateA : dateA - dateB;
  });
}

function weekday(date) {
  return new Intl.DateTimeFormat("ja-JP", { weekday: "short" }).format(date);
}

function formatDateRange(yearlyInfo) {
  const dates = Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
  if (dates.length === 0) return `${yearlyInfo.year}年 日程未確認`;
  const fmt = (text) => {
    const date = new Date(`${text}T00:00:00+09:00`);
    return `${yearlyInfo.year}年${date.getMonth() + 1}月${date.getDate()}日(${weekday(date)})`;
  };
  const fmtShort = (text) => {
    const date = new Date(`${text}T00:00:00+09:00`);
    return `${date.getDate()}日(${weekday(date)})`;
  };
  if (dates.length === 1) return fmt(dates[0]);
  const runs = [];
  let runStart = 0;
  for (let index = 1; index <= dates.length; index += 1) {
    const isLast = index === dates.length;
    const isConsecutive = !isLast && new Date(`${dates[index]}T00:00:00+09:00`) - new Date(`${dates[index - 1]}T00:00:00+09:00`) === 86400000;
    if (!isConsecutive) {
      runs.push(dates.slice(runStart, index));
      runStart = index;
    }
  }
  if (runs.length > 4) return `${fmt(dates[0])}〜${fmt(dates[dates.length - 1])}（全${dates.length}回）`;
  return runs.map((run) => run.length >= 2 ? `${fmt(run[0])}〜${fmtShort(run[run.length - 1])}` : fmt(run[0])).join(" / ");
}

function availabilityState(value) {
  if (value === true) return { className: "is-yes", label: "あり" };
  if (value === false) return { className: "is-no", label: "なし" };
  if (value === "n/a") return { className: "is-na", label: "該当なし" };
  return { className: "is-unknown", label: "未確認" };
}

function parkingText(value) {
  if (value === true) return "あり";
  if (value === false) return "なし";
  return "未確認";
}

function renderFeatureChip(label, value, iconName) {
  const state = availabilityState(value);
  return `<span class="card-feature-chip ${state.className}" title="${escapeHtml(label)}: ${state.label}"><span class="card-feature-icon" aria-hidden="true">${ICONS[iconName]}</span><span class="card-feature-label">${escapeHtml(label)}</span></span>`;
}

function renderDummyMedia(features) {
  const found = CARD_FEATURE_ITEMS.filter(([, key]) => features[key] === true).slice(0, 2);
  const selected = found.length > 0 ? found : [["見どころ", null, "midokoro"]];
  const plates = selected.map(([, , iconName]) => `<span class="item-media-icon-plate">${ICONS[iconName]}</span>`).join("");
  return `<div class="item-media item-media--icon" aria-hidden="true"><div class="item-media-icon-group">${plates}</div></div>`;
}

function renderMetaItem(label, value, extraClass = "") {
  return `<span class="meta-item${extraClass ? ` ${extraClass}` : ""}"><span class="meta-label">${escapeHtml(label)}</span><span class="meta-value">${escapeHtml(value)}</span></span>`;
}

function renderVideoBadge() {
  return '<span class="meta-item meta-item--video" role="img" aria-label="動画あり" title="動画あり"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="10,8.5 10,15.5 16,12" fill="currentColor"/></svg></span>';
}

function renderFestivalCard(item, experienceTags) {
  const { festival, yearlyInfo } = item;
  const constantInfo = festival.constantInfo || {};
  const features = constantInfo.features || {};
  const access = yearlyInfo.access || {};
  const media = Array.isArray(constantInfo.atmosphereMedia) ? constantInfo.atmosphereMedia : [];
  const background = constantInfo.backgroundImage;
  const hasPhoto = Boolean(background && background.type === "youtube" && background.contentId);
  const status = getEffectiveEventStatus(yearlyInfo);
  const experienceTag = experienceTags[festival.id];
  const visual = hasPhoto
    ? `<div class="item-media"><img class="item-media-img" src="https://i.ytimg.com/vi/${encodeURIComponent(background.contentId)}/hqdefault.jpg" alt="" loading="lazy" decoding="async"></div>`
    : renderDummyMedia(features);
  const chips = CARD_FEATURE_ITEMS.map(([label, key, icon]) => renderFeatureChip(label, features[key], icon)).join("") +
    (experienceTag ? `<span class="experience-tag-chip">${escapeHtml(experienceTag)}</span>` : "");
  const video = media.length > 0 ? renderVideoBadge() : "";
  const highlight = constantInfo.highlightComment ? `          <p class="highlight-comment">${escapeHtml(constantInfo.highlightComment)}</p>\n` : "";
  return `      <a class="festival-item${hasPhoto ? "" : " festival-item--text"}" href="../../festivals/${encodeURIComponent(festival.id)}/" data-area="${escapeHtml(festival.areaTag || "")}" data-highlight-time="${escapeHtml(features.highlightTime || "")}" data-has-dance-on-dashi="${escapeHtml(String(features.hasDanceOnDashi))}" data-event-status="${escapeHtml(status || "")}">
        ${visual}
        <div class="item-body">
          <div class="item-topline"><span class="prefecture">${escapeHtml(festival.prefecture ? `${festival.prefecture}${festival.city || ""}` : "都道府県未確認")}</span><span class="status-badge status-${escapeHtml(status || "unknown")}">${escapeHtml(EVENT_STATUS_LABELS[status] || "未確認")}</span></div>
          <h2 class="item-name">${escapeHtml(festival.name || "名称未確認")}</h2>
          <p class="item-date">${escapeHtml(formatDateRange(yearlyInfo))}</p>
          <div class="card-feature-chips">${chips}</div>
          <div class="card-meta">${renderMetaItem("見どころ", HIGHLIGHT_TIME_LABELS[features.highlightTime] || "未確認", "meta-item--highlight-time")}${renderMetaItem("駐車場", parkingText(access.hasParking))}${video}</div>
${highlight}        </div>
      </a>`;
}

function getFestivalListCssVersion() {
  const indexHtml = fs.readFileSync(path.join(MATSURI_ROOT, "index.html"), "utf8");
  const match = indexHtml.match(/shared\/festival-list\.css\?v=([^"']+)/);
  if (!match) throw new Error("matsuri/index.htmlからfestival-list.cssの版数を取得できません");
  return match[1];
}

function renderPage(month, items, experienceTags, cssVersion) {
  const count = items.length;
  const canonical = `https://vigorlab.net/matsuri/months/${month.slug}/`;
  const name = `${month.label}の祭り一覧`;
  const description = `${month.label}に開催される祭り${count}件をまとめました。開催地・アクセス・山車や神輿などの見どころを比較できます。`;
  const itemList = items.map(({ festival }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://vigorlab.net/matsuri/festivals/${festival.id}/`,
    name: festival.name
  }));
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description: `${month.label}に開催される祭り${count}件をまとめました。`,
    url: canonical,
    mainEntity: { "@type": "ItemList", numberOfItems: count, itemListElement: itemList }
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "MATSURI", item: "https://vigorlab.net/matsuri/" },
      { "@type": "ListItem", position: 2, name: `${month.label}の祭り`, item: canonical }
    ]
  };
  const monthSwitch = MONTHS.map((entry) => entry.slug === month.slug
    ? `<strong aria-current="page">${entry.label}</strong>`
    : `<a href="../${entry.slug}/">${entry.label}</a>`).join("\n        ");
  const cards = items.map((item) => renderFestivalCard(item, experienceTags)).join("\n");

  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${month.label}の祭り一覧｜${count}件掲載 | MATSURI</title>
    <link rel="canonical" href="${canonical}">
    <meta name="description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="MATSURI">
    <meta property="og:title" content="${month.label}の祭り一覧｜${count}件掲載 | MATSURI">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="https://vigorlab.net/assets/brand/og-image.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${month.label}の祭り一覧｜${count}件掲載 | MATSURI">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="https://vigorlab.net/assets/brand/og-image.png">
    <meta property="og:locale" content="ja_JP">
    <link rel="alternate" hreflang="ja" href="${canonical}">
    <link rel="alternate" hreflang="x-default" href="${canonical}">
    <link rel="icon" href="/matsuri/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/matsuri/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" href="/matsuri/favicon-32x32.png" sizes="32x32">
    <link rel="apple-touch-icon" href="/matsuri/apple-touch-icon.png">
    <link rel="stylesheet" href="../../shared/festival-list.css?v=${cssVersion}">
    <link rel="stylesheet" href="../../shared/month-hub.css?v=1">
    <script src="/assets/analytics.js" defer></script>
    <script type="application/ld+json">${JSON.stringify(collectionJsonLd)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}</script>
  </head>
  <body>
    <main class="page-shell">
      <header class="list-header">
        <p class="brand-row"><a href="../../index.html">MATSURI</a></p>
        <nav class="breadcrumb" aria-label="パンくずリスト"><a href="../../index.html">MATSURI</a> &gt; <span>${month.label}の祭り</span></nav>
        <h1>${name}</h1>
        <p class="header-description">${month.label}に開催される祭り${count}件を日程順にまとめました。</p>
      </header>
      <nav class="month-switch" aria-label="他の月を見る">
        ${monthSwitch}
      </nav>
      <p class="count-text">${count}件を掲載中</p>
      <div class="festival-list">
${cards}
      </div>
      <p class="disclaimer">掲載内容は各祭りの詳細ページに記載の出典・確認日に基づきます。最新の開催情報は公式サイトでご確認ください。</p>
      <p class="back-to-list"><a href="../../index.html">すべての祭りを都道府県・特徴で絞り込む →</a></p>
    </main>
  </body>
</html>
`;
}

function validatePage(html, expectedCount, monthLabel) {
  const cardCount = (html.match(/<a class="festival-item(?: |")/g) || []).length;
  const countText = html.includes(`<p class="count-text">${expectedCount}件を掲載中</p>`);
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const collection = jsonLdBlocks.find((block) => block["@type"] === "CollectionPage");
  const numberOfItems = collection && collection.mainEntity && collection.mainEntity.numberOfItems;
  const listLength = collection && collection.mainEntity && collection.mainEntity.itemListElement.length;
  if (cardCount !== expectedCount || !countText || numberOfItems !== expectedCount || listLength !== expectedCount) {
    throw new Error(`${monthLabel}: 件数不一致（cards=${cardCount}, text=${countText}, numberOfItems=${numberOfItems}, items=${listLength}, expected=${expectedCount}）`);
  }
}

function main() {
  const experienceTags = evaluateConstant(path.join(SHARED_ROOT, "experience-tags.js"), "EXPERIENCE_TAGS");
  const festivalSlugs = evaluateConstant(path.join(SHARED_ROOT, "festival-slugs.js"), "FESTIVAL_SLUGS");
  const cssVersion = getFestivalListCssVersion();
  const festivals = festivalSlugs.map((slug) => {
    const filePath = path.join(FESTIVALS_ROOT, slug, "data.js");
    if (!fs.existsSync(filePath)) throw new Error(`${slug}: data.jsが見つかりません`);
    return evaluateConstant(filePath, "FESTIVAL");
  });
  const items = festivals.map((festival) => ({ festival, yearlyInfo: getPrimaryYearlyInfo(festival) })).filter((item) => item.yearlyInfo);

  for (const month of MONTHS) {
    const monthItems = sortFestivalItems(items.filter(({ yearlyInfo }) => Array.isArray(yearlyInfo.dates) && yearlyInfo.dates.some((date) => Number(date.slice(5, 7)) === month.number)));
    const html = renderPage(month, monthItems, experienceTags, cssVersion);
    validatePage(html, monthItems.length, month.label);
    const outputDirectory = path.join(MATSURI_ROOT, "months", month.slug);
    fs.mkdirSync(outputDirectory, { recursive: true });
    fs.writeFileSync(path.join(outputDirectory, "index.html"), html);
    console.log(`${month.label}: ${monthItems.length}件`);
  }
}

main();
