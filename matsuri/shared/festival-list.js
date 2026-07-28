(function () {
  const FESTIVAL_SLUGS = ["ishioka-omatsuri", "sawara-natsu-matsuri", "sawara-aki-matsuri"];
  const UPCOMING_STATUSES = new Set(["confirmed", "scheduled_pending_official"]);

  const eventStatusLabels = {
    confirmed: "開催確認済み",
    scheduled_pending_official: "開催予定・公式詳細待ち",
    unconfirmed: "未確認",
    cancelled: "中止",
    postponed: "延期",
    ended: "終了"
  };

  const eventStatusGroups = {
    confirmed: 0,
    scheduled_pending_official: 0,
    unconfirmed: 1,
    postponed: 2,
    cancelled: 3,
    ended: 4
  };

  const highlightTimeLabels = {
    morning: "朝",
    daytime: "昼",
    day: "昼",
    evening: "夕方",
    night: "夜",
    both: "昼・夜"
  };

  async function loadFestival(slug) {
    try {
      const res = await fetch(`festivals/${slug}/data.js`);
      if (!res.ok) {
        console.warn(`[festival-list] ${slug}: fetch失敗 (${res.status})`);
        return null;
      }

      const src = await res.text();
      const factory = new Function(`${src}\nreturn FESTIVAL;`);
      return factory();
    } catch (err) {
      console.warn(`[festival-list] ${slug}: 読み込み・評価に失敗`, err);
      return null;
    }
  }

  function getPrimaryYearlyInfo(festival) {
    if (!festival || !Array.isArray(festival.yearlyInfo) || festival.yearlyInfo.length === 0) {
      return null;
    }

    const currentYear = new Date().getFullYear();
    const validEntries = festival.yearlyInfo.filter((entry) => {
      return entry && typeof entry.year === "number" && Number.isFinite(entry.year);
    });

    if (validEntries.length === 0) {
      return null;
    }

    const currentEntry = validEntries.find((entry) => entry.year === currentYear);
    if (currentEntry) {
      return currentEntry;
    }

    const futureEntries = validEntries.filter((entry) => entry.year > currentYear);
    if (futureEntries.length > 0) {
      return futureEntries.reduce((nearest, entry) => {
        return entry.year < nearest.year ? entry : nearest;
      });
    }

    const pastEntries = validEntries.filter((entry) => entry.year < currentYear);
    if (pastEntries.length > 0) {
      return pastEntries.reduce((latest, entry) => {
        return entry.year > latest.year ? entry : latest;
      });
    }

    return null;
  }

  function normalizeFestival(festival) {
    const yearlyInfo = getPrimaryYearlyInfo(festival);
    if (!yearlyInfo) {
      const id = festival && festival.id ? festival.id : "unknown";
      console.warn(`[festival-list] ${id}: 有効なyearlyInfoがありません`);
      return null;
    }

    return { festival, yearlyInfo };
  }

  function getEventStatusGroup(status) {
    return Object.prototype.hasOwnProperty.call(eventStatusGroups, status)
      ? eventStatusGroups[status]
      : 1;
  }

  function dateValue(yearlyInfo) {
    const firstDate = yearlyInfo && Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates[0] : null;
    const time = firstDate ? new Date(`${firstDate}T00:00:00+09:00`).getTime() : NaN;
    return Number.isFinite(time) ? time : Number.POSITIVE_INFINITY;
  }

  function sortFestivalItems(items) {
    return [...items].sort((a, b) => {
      const groupA = getEventStatusGroup(a.yearlyInfo.eventStatus);
      const groupB = getEventStatusGroup(b.yearlyInfo.eventStatus);

      if (groupA !== groupB) {
        return groupA - groupB;
      }

      const dateA = dateValue(a.yearlyInfo);
      const dateB = dateValue(b.yearlyInfo);

      if (groupA === 4) {
        return dateB - dateA;
      }

      return dateA - dateB;
    });
  }

  function weekday(date) {
    return new Intl.DateTimeFormat("ja-JP", { weekday: "short" }).format(date);
  }

  function formatDateRange(yearlyInfo) {
    const dates = Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
    if (dates.length === 0) {
      return `${yearlyInfo.year}年 日程未確認`;
    }

    const start = new Date(`${dates[0]}T00:00:00+09:00`);
    const end = new Date(`${dates[dates.length - 1]}T00:00:00+09:00`);

    if (dates.length === 1) {
      return `${yearlyInfo.year}年${start.getMonth() + 1}月${start.getDate()}日(${weekday(start)})`;
    }

    return `${yearlyInfo.year}年${start.getMonth() + 1}月${start.getDate()}日(${weekday(start)})〜${end.getDate()}日(${weekday(end)})`;
  }

  function featureMark(value) {
    if (value === true) {
      return "○";
    }
    if (value === false) {
      return "×";
    }
    if (value === "n/a") {
      return "－";
    }
    return "？";
  }

  function parkingText(value) {
    if (value === true) {
      return "あり";
    }
    if (value === false) {
      return "なし";
    }
    return "未確認";
  }

  function pickCardMedia(features) {
    if (features.hasDashi === true) {
      return { file: "dashi", label: "山車" };
    }
    if (features.hasMikoshi === true) {
      return { file: "mikoshi", label: "神輿" };
    }
    return null;
  }

  function createMetaItem(label, value) {
    const item = document.createElement("span");
    item.className = "meta-item";

    const labelEl = document.createElement("span");
    labelEl.className = "meta-label";
    labelEl.textContent = label;

    const valueEl = document.createElement("span");
    valueEl.className = "meta-value";
    valueEl.textContent = value;

    item.append(labelEl, valueEl);
    return item;
  }

  function renderFestivalCard(item) {
    const { festival, yearlyInfo } = item;
    const constantInfo = festival.constantInfo || {};
    const features = constantInfo.features || {};
    const access = yearlyInfo.access || {};
    const atmosphereMedia = Array.isArray(constantInfo.atmosphereMedia)
      ? constantInfo.atmosphereMedia
      : [];
    const cardMedia = pickCardMedia(features);

    const card = document.createElement("a");
    card.className = "festival-card";
    card.href = `festivals/${festival.id}/index.html`;
    card.dataset.area = festival.areaTag || "";
    card.dataset.highlightTime = features.highlightTime || "";
    card.dataset.hasDanceOnDashi = String(features.hasDanceOnDashi);
    card.dataset.eventStatus = yearlyInfo.eventStatus || "";

    const topLine = document.createElement("div");
    topLine.className = "card-topline";

    const prefecture = document.createElement("span");
    prefecture.className = "prefecture";
    prefecture.textContent = festival.prefecture || "都道府県未確認";

    const status = document.createElement("span");
    status.className = `status-badge status-${yearlyInfo.eventStatus || "unknown"}`;
    status.textContent = eventStatusLabels[yearlyInfo.eventStatus] || "未確認";

    topLine.append(prefecture, status);

    const title = document.createElement("h2");
    title.className = "festival-name";
    title.textContent = festival.name || "名称未確認";

    const date = document.createElement("p");
    date.className = "date-range";
    date.textContent = formatDateRange(yearlyInfo);

    const allFeatureParts = [
      { key: "山車", text: `山車${featureMark(features.hasDashi)}` },
      { key: "神輿", text: `神輿${featureMark(features.hasMikoshi)}` },
      { key: "踊り", text: `踊り${featureMark(features.hasDanceOnDashi)}` },
      { key: "曳き回し", text: `曳き回し${featureMark(features.hasParade)}` }
    ];

    const featureLine = document.createElement("p");
    featureLine.className = "feature-line";
    featureLine.textContent = allFeatureParts
      .filter((part) => !cardMedia || part.key !== cardMedia.label)
      .map((part) => part.text)
      .join(" ");

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.append(
      createMetaItem("見どころ", highlightTimeLabels[features.highlightTime] || "未確認"),
      createMetaItem("駐車場", parkingText(access.hasParking))
    );

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    if (constantInfo.highlightComment) {
      const highlight = document.createElement("p");
      highlight.className = "highlight-comment";
      highlight.textContent = constantInfo.highlightComment;
      cardBody.append(topLine, title, date, featureLine, meta, highlight);
    } else {
      cardBody.append(topLine, title, date, featureLine, meta);
    }

    if (atmosphereMedia.length > 0) {
      const media = document.createElement("p");
      media.className = "media-label";
      media.textContent = "動画あり";
      cardBody.append(media);
    }

    const detail = document.createElement("span");
    detail.className = "detail-link-text";
    detail.textContent = "詳しく見る →";
    cardBody.append(detail);

    card.append(cardBody);

    if (cardMedia) {
      const mediaBox = document.createElement("div");
      mediaBox.className = "card-media";

      const img = document.createElement("img");
      img.src = `shared/illustrations/${cardMedia.file}.png`;
      img.alt = "";
      img.loading = "lazy";

      const tag = document.createElement("span");
      tag.className = "media-tag";
      tag.textContent = cardMedia.label;

      mediaBox.append(img, tag);
      card.append(mediaBox);
    }

    return card;
  }

  function render(items) {
    const list = document.getElementById("festival-list");
    const count = document.getElementById("festival-count");
    const toggle = document.getElementById("upcoming-only-toggle");

    const visibleItems = toggle.checked
      ? items.filter((item) => UPCOMING_STATUSES.has(item.yearlyInfo.eventStatus))
      : items;

    list.replaceChildren(...visibleItems.map(renderFestivalCard));
    count.textContent = `${items.length}件中${visibleItems.length}件を表示`;
  }

  async function init() {
    const loaded = await Promise.all(FESTIVAL_SLUGS.map(loadFestival));
    const items = sortFestivalItems(loaded.filter(Boolean).map(normalizeFestival).filter(Boolean));
    const toggle = document.getElementById("upcoming-only-toggle");

    toggle.addEventListener("change", () => render(items));
    render(items);
  }

  window.__festivalList = {
    getPrimaryYearlyInfo
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
