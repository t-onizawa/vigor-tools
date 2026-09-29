// AEO静的化：祭り詳細ページに、festival-detail.jsが本来クライアント側で
// 描画する一部のDOM（特徴バッジ・アクセス情報・所在地・Event JSON-LD）を
// ビルド時に直接HTMLへ書き込む。
// festival-detail.js側は <body data-static-content> を検知して該当ブロックの
// 再描画をスキップするため、二重描画は発生しない（詳細はfestival-detail.js参照）。
//
// data.js変更後は何度でも安全に再実行できる（既に静的化済みのページは、
// 注入済みの内容をコメントマーカーで検出していったん元の空プレースホルダーに
// 戻してから、最新のdata.jsの内容で再度書き込む。スキップはしない）。
// これにより、週次品質改善タスク等が後からbackgroundImage・
// mapReference.lat/lng等を更新した場合も、本スクリプトを再実行するだけで
// Event JSON-LDの内容を追従させられる。
//
// 対象slugsを省略すると festivals/ 配下の全件が対象になる。個別指定する
// 場合は `node generate-static-content.js slug-a slug-b` のように引数で渡す。
const fs = require("fs");
const path = require("path");

const SITE_ORIGIN = "https://vigorlab.net";
const FESTIVALS_DIR = path.join(__dirname, "..", "festivals");

const HIGHLIGHT_TIME_PILLS = [
  { keys: ["morning"], ja: "朝" },
  { keys: ["daytime", "day"], ja: "昼" },
  { keys: ["evening"], ja: "夕方" },
  { keys: ["night"], ja: "夜" },
  { keys: ["both"], ja: "両方" }
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

const SCHEMA_EVENT_STATUS = {
  confirmed: "https://schema.org/EventScheduled",
  scheduled_pending_official: "https://schema.org/EventScheduled",
  off_year: "https://schema.org/EventScheduled",
  unconfirmed: "https://schema.org/EventScheduled",
  postponed: "https://schema.org/EventPostponed",
  cancelled: "https://schema.org/EventCancelled",
  ended: "https://schema.org/EventScheduled"
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readFestival(slug) {
  // data.jsはJSON互換とは限らない（例: `eventStatus: "confirmed"` のように
  // キーがクォートされていないファイルが大半）ため、実際にJSとして実行して
  // FESTIVAL変数を取り出す。festival-detail.js内の同種の読み込み処理
  // （loadExperienceTags等の `new Function(...)` パターン）に合わせている。
  const filePath = path.join(FESTIVALS_DIR, slug, "data.js");
  const src = fs.readFileSync(filePath, "utf8");
  const factory = new Function(`${src}\nreturn FESTIVAL;`);
  return factory();
}

function availabilityLabel(value) {
  if (value === true) return "あり";
  if (value === false) return "なし";
  if (value === "n/a") return "該当なし";
  return "未確認";
}

function isEventStatusPastDue(currentYear) {
  const dates = Array.isArray(currentYear.dates) ? currentYear.dates : [];
  if (dates.length === 0) return false;
  const lastDateEnd = new Date(`${dates[dates.length - 1]}T23:59:59+09:00`).getTime();
  return Number.isFinite(lastDateEnd) && lastDateEnd < Date.now();
}

function getEffectiveEventStatus(currentYear) {
  const status = currentYear.eventStatus;
  if (
    (status === "confirmed" || status === "scheduled_pending_official") &&
    isEventStatusPastDue(currentYear)
  ) {
    return "ended";
  }
  return status;
}

function buildEventStatusFragment(effectiveStatus) {
  const label = EVENT_STATUS_LABELS[effectiveStatus] || "未確認";
  const className = `status-badge status-${effectiveStatus || "unknown"}`;
  const checkmark =
    effectiveStatus === "confirmed"
      ? '<span class="status-badge-check" aria-hidden="true">✓</span>'
      : "";
  return { className, innerHtml: `${checkmark}${escapeHtml(label)}` };
}

function buildFeatureDefs(features) {
  return [
    { key: "dashi", ja: "山車", value: features.hasDashi },
    { key: "mikoshi", ja: "神輿", value: features.hasMikoshi },
    { key: "odori", ja: "踊り", value: features.hasDanceOnDashi },
    { key: "hikimawashi", ja: "曳き回し", value: features.hasParade }
  ];
}

function buildFeatureGridHtml(features) {
  return buildFeatureDefs(features)
    .map((def) => {
      if (def.value !== true) return "";
      return (
        '<div class="feature-badge-color">' +
        `<span class="feature-badge-color-icon"><img src="../../shared/icons/section-feature-${def.key}.png" alt=""></span>` +
        `<span class="feature-badge-color-label">${escapeHtml(def.ja)}</span>` +
        `<span class="feature-badge-color-value">${escapeHtml(availabilityLabel(true))}</span>` +
        "</div>"
      );
    })
    .join("");
}

function buildHighlightTimeRowHtml(highlightTime) {
  const pills = HIGHLIGHT_TIME_PILLS.map((def) => {
    const active = def.keys.includes(highlightTime) ? " is-active" : "";
    return `<span class="highlight-time-pill${active}">${escapeHtml(def.ja)}</span>`;
  }).join("");
  return (
    '<div class="highlight-time-row">' +
    '<span class="highlight-time-row-label">見どころの時間帯</span>' +
    `<div class="highlight-time-pills">${pills}</div>` +
    "</div>"
  );
}

function buildPrimaryInfoLocationHtml(festival) {
  const text = `${festival.prefecture}${festival.city || ""}`;
  return (
    '<p class="primary-info-location">' +
    '<span class="primary-info-location-icon" aria-hidden="true"></span>' +
    `<span>${escapeHtml(text)}</span>` +
    "</p>"
  );
}

function buildDetailItemHtml(term, value, note) {
  const noteHtml = note ? `<p class="detail-note">${escapeHtml(note)}</p>` : "";
  return (
    '<div class="detail-item">' +
    `<span class="detail-term">${escapeHtml(term)}</span>` +
    `<span class="detail-value">${escapeHtml(value)}</span>` +
    noteHtml +
    "</div>"
  );
}

function buildAccessListHtml(festival, currentYear) {
  return [
    buildDetailItemHtml("開催地", festival.city),
    buildDetailItemHtml("最寄駅", festival.constantInfo.access.nearestStation),
    buildDetailItemHtml(
      "駐車場",
      availabilityLabel(currentYear.access.hasParking),
      currentYear.access.parkingNote
    )
  ].join("");
}

function buildEventLocation(festival) {
  const mapReference = festival.constantInfo.mapReference;
  const address = `${festival.prefecture}${festival.city}`;
  if (mapReference) {
    const location = { "@type": "Place", name: mapReference.label, address };
    if (typeof mapReference.lat === "number" && typeof mapReference.lng === "number") {
      location.geo = {
        "@type": "GeoCoordinates",
        latitude: mapReference.lat,
        longitude: mapReference.lng
      };
    }
    return location;
  }
  return { "@type": "Place", name: festival.city, address };
}

function buildEventDescription(festival, currentYear) {
  const highlight = festival.constantInfo.highlightComment;
  const baseDescription =
    highlight ||
    `${festival.prefecture}${festival.city}で開催される${festival.name}。${festival.constantInfo.schedulePattern}`;
  if (currentYear.eventStatus === "off_year") {
    return `${baseDescription} ${currentYear.year}年は陰祭年で、本祭りは隔年開催です。`;
  }
  return baseDescription;
}

function normalizeTimeToIso(time) {
  const match = typeof time === "string" && time.match(/^(\d{1,2}):([0-5]\d)$/);
  if (!match) return null;
  const hour = Number(match[1]);
  if (hour > 23) return null;
  return `${String(hour).padStart(2, "0")}:${match[2]}:00`;
}

function getLatestConfirmedDate(festival, currentYear) {
  const dates = [
    festival.constantInfo.confirmation && festival.constantInfo.confirmation.confirmedDate,
    currentYear.confirmation && currentYear.confirmation.confirmedDate
  ].filter((date) => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date));
  dates.sort();
  return dates[dates.length - 1] || null;
}

function buildEventJsonLd(festival, currentYear, canonicalUrl) {
  const dates = Array.isArray(currentYear.dates) ? currentYear.dates : [];
  if (dates.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: festival.name,
    startDate: dates[0],
    endDate: dates[dates.length - 1],
    eventStatus: SCHEMA_EVENT_STATUS[currentYear.eventStatus] || "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: buildEventLocation(festival),
    description: buildEventDescription(festival, currentYear)
  };

  if (canonicalUrl) {
    jsonLd.url = canonicalUrl;
  }

  const backgroundImage = festival.constantInfo.backgroundImage;
  if (backgroundImage && backgroundImage.type === "youtube" && backgroundImage.contentId) {
    jsonLd.image = `https://i.ytimg.com/vi/${backgroundImage.contentId}/${backgroundImage.thumbnailVariant || "hqdefault"}.jpg`;
  }

  const dateModified = getLatestConfirmedDate(festival, currentYear);
  if (dateModified) {
    jsonLd.dateModified = dateModified;
  }

  const schedule = currentYear.schedule;
  if (Array.isArray(schedule) && schedule.length > 0) {
    const subEvents = [];
    schedule.forEach((day) => {
      (day.items || []).forEach((item) => {
        const isoTime = normalizeTimeToIso(item.time);
        if (!isoTime) return;
        subEvents.push({
          "@type": "Event",
          name: item.label,
          startDate: `${day.date}T${isoTime}+09:00`,
          location: jsonLd.location
        });
      });
    });
    if (subEvents.length > 0) {
      jsonLd.subEvent = subEvents;
    }
  }

  return jsonLd;
}

function replaceOnce(html, target, replacement, label) {
  const index = html.indexOf(target);
  if (index === -1) {
    throw new Error(`置換対象が見つかりません（${label}）: ${target}`);
  }
  if (html.indexOf(target, index + 1) !== -1) {
    throw new Error(`置換対象が複数見つかりました（${label}）: ${target}`);
  }
  return html.slice(0, index) + replacement + html.slice(index + target.length);
}

// 注入済みブロックはネストしたdiv/spanを含みうる（例：feature-gridの中に
// feature-badge-colorのdivが複数入る）ため、タグの対応関係を実際に数えて
// 閉じタグを特定する（非貪欲正規表現では最初の内側の閉じタグで止まって
// しまい誤動作する）。openTagEndIndexは開始タグの `>` の直後を指す。
function findMatchingClose(html, openTagEndIndex, tagName) {
  const openRe = new RegExp(`<${tagName}\\b`, "g");
  const closeRe = new RegExp(`</${tagName}>`, "g");
  let depth = 1;
  let pos = openTagEndIndex;
  while (depth > 0) {
    openRe.lastIndex = pos;
    closeRe.lastIndex = pos;
    const openMatch = openRe.exec(html);
    const closeMatch = closeRe.exec(html);
    if (!closeMatch) {
      throw new Error(`閉じタグが見つかりません: </${tagName}>`);
    }
    if (openMatch && openMatch.index < closeMatch.index) {
      depth += 1;
      pos = openMatch.index + openMatch[0].length;
    } else {
      depth -= 1;
      pos = closeMatch.index + closeMatch[0].length;
    }
  }
  return pos;
}

// idAttrを持つ要素をhtml内から探し、開始位置と（対応する閉じタグを含む）
// 終了位置を返す。無ければnull。新規ページ（プレースホルダーが空）・
// 既に静的化済みのページ（中身が入っている）のどちらでも同じロジックで
// 検出できる（クラス名やid自体は生成前後で変わらないため）。
function findElementById(html, idAttr, tagName) {
  const idMarker = ` id="${idAttr}"`;
  const idIndex = html.indexOf(idMarker);
  if (idIndex === -1) return null;
  const openStart = html.lastIndexOf(`<${tagName}`, idIndex);
  if (openStart === -1) {
    throw new Error(`id="${idAttr}"を含む<${tagName}>の開始タグが見つかりません`);
  }
  const openTagEnd = html.indexOf(">", idIndex) + 1;
  const end = findMatchingClose(html, openTagEnd, tagName);
  return { start: openStart, end };
}

// 開始タグ文字列（例：`<p class="primary-info-location">`）で要素を探す。
// idを持たない挿入要素（primary-info-location）用。
function findElementByOpenTag(html, openTagString, tagName) {
  const openStart = html.indexOf(openTagString);
  if (openStart === -1) return null;
  const openTagEnd = openStart + openTagString.length;
  const end = findMatchingClose(html, openTagEnd, tagName);
  return { start: openStart, end };
}

function removeIfFound(html, range) {
  if (!range) return html;
  return html.slice(0, range.start) + html.slice(range.end);
}

const PRISTINE = {
  eventStatus: '<span class="status-badge" id="event-status"></span>',
  featureGrid: '<div class="feature-grid" id="feature-grid"></div>',
  accessList: '<div class="detail-list" id="access-list"></div>'
};

// 旧バージョンのスクリプトで既に静的化済みのページ、および本バージョンで
// 生成したページの両方を、data-static-content属性の有無だけに頼らず、
// 実際の要素の中身から検出して元の空プレースホルダーへ戻す。これにより
// 「一度静的化したページはスキップする」のではなく「常に最新のdata.js
// から安全に再生成する」ことができる。
function revertStaticContent(html) {
  const eventStatusRange = findElementById(html, "event-status", "span");
  if (eventStatusRange) html = html.slice(0, eventStatusRange.start) + PRISTINE.eventStatus + html.slice(eventStatusRange.end);

  const featureGridRange = findElementById(html, "feature-grid", "div");
  if (featureGridRange) {
    let end = featureGridRange.end;
    const highlightPrefix = '<div class="highlight-time-row">';
    if (html.startsWith(highlightPrefix, end)) {
      end = findMatchingClose(html, end + highlightPrefix.length, "div");
    }
    html = html.slice(0, featureGridRange.start) + PRISTINE.featureGrid + html.slice(end);
  }

  const primaryInfoRange = findElementByOpenTag(html, '<p class="primary-info-location">', "p");
  html = removeIfFound(html, primaryInfoRange);

  const accessListRange = findElementById(html, "access-list", "div");
  if (accessListRange) html = html.slice(0, accessListRange.start) + PRISTINE.accessList + html.slice(accessListRange.end);

  const jsonLdStart = html.indexOf('<script type="application/ld+json"');
  if (jsonLdStart !== -1) {
    const jsonLdEnd = html.indexOf("</script>", jsonLdStart) + "</script>".length;
    const trailingNewline = html[jsonLdEnd] === "\n" ? 1 : 0;
    html = html.slice(0, jsonLdStart) + html.slice(jsonLdEnd + trailingNewline);
  }

  html = html.replace("<body data-static-content>", "<body>");
  return html;
}

function generateForSlug(slug) {
  const filePath = path.join(FESTIVALS_DIR, slug, "index.html");
  let html = fs.readFileSync(filePath, "utf8");
  html = revertStaticContent(html);

  const festival = readFestival(slug);
  const currentYear = festival.yearlyInfo[0];
  const features = festival.constantInfo.features;
  const effectiveStatus = getEffectiveEventStatus(currentYear);
  const canonicalUrl = `${SITE_ORIGIN}/matsuri/festivals/${slug}/`;

  const eventStatus = buildEventStatusFragment(effectiveStatus);
  const featureGridHtml = buildFeatureGridHtml(features);
  const highlightTimeRowHtml = buildHighlightTimeRowHtml(features.highlightTime);
  const primaryInfoLocationHtml = buildPrimaryInfoLocationHtml(festival);
  const accessListHtml = buildAccessListHtml(festival, currentYear);
  const jsonLd = buildEventJsonLd(festival, currentYear, canonicalUrl);

  html = replaceOnce(
    html,
    PRISTINE.eventStatus,
    `<span class="${eventStatus.className}" id="event-status">${eventStatus.innerHtml}</span>`,
    "event-status"
  );

  html = replaceOnce(
    html,
    PRISTINE.featureGrid,
    `<div class="feature-grid feature-grid-color" id="feature-grid">${featureGridHtml}</div>${highlightTimeRowHtml}`,
    "feature-grid"
  );

  html = replaceOnce(
    html,
    '<p class="section-label" id="dates-heading"></p>',
    `${primaryInfoLocationHtml}<p class="section-label" id="dates-heading"></p>`,
    "primary-info-location"
  );

  html = replaceOnce(
    html,
    PRISTINE.accessList,
    `<div class="detail-list" id="access-list">${accessListHtml}</div>`,
    "access-list"
  );

  html = replaceOnce(html, "<body>", "<body data-static-content>", "body-attribute");

  if (jsonLd) {
    const script = `<script type="application/ld+json" data-generated="static-content">${JSON.stringify(jsonLd)}</script>`;
    html = replaceOnce(html, "</head>", `${script}\n</head>`, "event-jsonld");
  }

  fs.writeFileSync(filePath, html);
  console.log(`[generate-static-content] 更新: festivals/${slug}/index.html`);
}

function listAllSlugs() {
  return fs
    .readdirSync(FESTIVALS_DIR)
    .filter((name) => fs.existsSync(path.join(FESTIVALS_DIR, name, "data.js")))
    .filter((name) => fs.existsSync(path.join(FESTIVALS_DIR, name, "index.html")));
}

function main() {
  const argSlugs = process.argv.slice(2);
  const slugs = argSlugs.length > 0 ? argSlugs : listAllSlugs();
  let updated = 0;
  let skipped = 0;
  let failed = 0;
  slugs.forEach((slug) => {
    try {
      const before = fs.readFileSync(path.join(FESTIVALS_DIR, slug, "index.html"), "utf8");
      generateForSlug(slug);
      const after = fs.readFileSync(path.join(FESTIVALS_DIR, slug, "index.html"), "utf8");
      if (before === after) {
        skipped += 1;
      } else {
        updated += 1;
      }
    } catch (err) {
      failed += 1;
      console.error(`[generate-static-content] 失敗: ${slug} — ${err.message}`);
    }
  });
  console.log(`[generate-static-content] 完了: 更新${updated}件 / スキップ${skipped}件 / 失敗${failed}件`);
  if (failed > 0) {
    process.exitCode = 1;
  }
}

main();
