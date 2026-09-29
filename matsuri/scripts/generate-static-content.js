// AEO静的化パイロット：対象2件の祭り詳細ページに、festival-detail.jsが本来
// クライアント側で描画する一部のDOM（特徴バッジ・アクセス情報・所在地・
// Event JSON-LD）をビルド時に直接HTMLへ書き込む。
// festival-detail.js側は <body data-static-content> を検知して該当ブロックの
// 再描画をスキップするため、二重描画は発生しない（詳細はfestival-detail.js参照）。
const fs = require("fs");
const path = require("path");

const SITE_ORIGIN = "https://vigorlab.net";
const PILOT_SLUGS = ["niihama-taiko-matsuri", "naha-otsunahiki-matsuri"];

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
  const filePath = path.join(__dirname, "..", "festivals", slug, "data.js");
  const src = fs.readFileSync(filePath, "utf8");
  const match = src.match(/const FESTIVAL = ([\s\S]*);\s*$/);
  if (!match) {
    throw new Error(`FESTIVAL object not found in ${filePath}`);
  }
  return JSON.parse(match[1]);
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

function generateForSlug(slug) {
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

  const filePath = path.join(__dirname, "..", "festivals", slug, "index.html");
  let html = fs.readFileSync(filePath, "utf8");

  html = replaceOnce(
    html,
    '<span class="status-badge" id="event-status"></span>',
    `<span class="${eventStatus.className}" id="event-status">${eventStatus.innerHtml}</span>`,
    "event-status"
  );

  html = replaceOnce(
    html,
    '<div class="feature-grid" id="feature-grid"></div>',
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
    '<div class="detail-list" id="access-list"></div>',
    `<div class="detail-list" id="access-list">${accessListHtml}</div>`,
    "access-list"
  );

  html = replaceOnce(html, "<body>", "<body data-static-content>", "body-attribute");

  if (jsonLd) {
    const script = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
    html = replaceOnce(html, "</head>", `${script}\n</head>`, "event-jsonld");
  }

  fs.writeFileSync(filePath, html);
  console.log(`[generate-static-content] 更新: festivals/${slug}/index.html`);
}

function main() {
  PILOT_SLUGS.forEach(generateForSlug);
}

main();
