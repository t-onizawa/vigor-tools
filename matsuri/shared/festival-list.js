(function () {
  const UPCOMING_STATUSES = new Set(["confirmed", "scheduled_pending_official"]);

  const FEATURE_GRID_ITEMS = [
    { key: "hasDashi", label: "山車", icon: "dashi", hubUrl: "features/dashi/" },
    { key: "hasMikoshi", label: "神輿", icon: "mikoshi", hubUrl: "features/mikoshi/" },
    { key: "hasDanceOnDashi", label: "踊り", icon: "odori", hubUrl: "features/odori/" },
    { key: "hasParade", label: "曳き回し", icon: "hikimawashi", hubUrl: "features/hikimawashi/" },
    { key: "highlightTime:night", label: "夜が見どころ", icon: "midokoro", hubUrl: "features/night/" }
  ];

  const MONTH_HUB_URLS = {
    7: "months/july/",
    8: "months/august/",
    9: "months/september/"
  };

  const REGION_PREFECTURES = {
    kanto: ["ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa"],
    tohoku: ["aomori", "iwate", "akita", "miyagi", "yamagata", "fukushima"],
    chubu: ["niigata", "toyama", "ishikawa", "fukui", "yamanashi", "nagano", "gifu", "shizuoka", "aichi"],
    kinki: ["mie", "shiga", "kyoto", "osaka", "hyogo", "nara", "wakayama"],
    chugoku: ["tottori", "shimane", "okayama", "hiroshima", "yamaguchi"],
    shikoku: ["tokushima", "kagawa", "ehime", "kochi"],
    kyushu: ["fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima"],
    hokkaido: ["hokkaido"],
    okinawa: ["okinawa"]
  };

  const REGION_LABELS = {
    kanto: "関東",
    tohoku: "東北",
    chubu: "中部",
    kinki: "近畿",
    chugoku: "中国",
    shikoku: "四国",
    kyushu: "九州",
    hokkaido: "北海道",
    okinawa: "沖縄"
  };
  const REGION_STORAGE_KEY = "matsuri-region-pref";
  let regionModalFirstVisit = false;
  let currentFestivalItems = [];

  const eventStatusLabels = {
    confirmed: "開催確認済み",
    scheduled_pending_official: "開催予定・公式詳細待ち",
    off_year: "陰祭年（本祭なし）",
    unconfirmed: "未確認",
    cancelled: "中止",
    postponed: "延期",
    ended: "終了"
  };

  const eventStatusGroups = {
    confirmed: 0,
    scheduled_pending_official: 0,
    off_year: 1,
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

  const FEATURE_ICON_FILES = {
    "山車": "dashi",
    "神輿": "mikoshi",
    "踊り": "odori",
    "曳き回し": "hikimawashi",
    "見どころ": "midokoro"
  };

  const UPCOMING_ICON_PRIORITY = [
    ["神輿", "hasMikoshi"],
    ["山車", "hasDashi"],
    ["踊り", "hasDanceOnDashi"],
    ["曳き回し", "hasParade"]
  ];

  const iconCache = new Map();

  const cardFeatureItems = [
    ["山車", "hasDashi"],
    ["神輿", "hasMikoshi"],
    ["踊り", "hasDanceOnDashi"],
    ["曳き回し", "hasParade"]
  ];

  function getListBasePath() {
    return document.getElementById("favorites-list") ? "../" : "";
  }

  function sendGaEvent(name, params) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, params);
      }
    } catch (err) {
      // 計測失敗はUIに影響させないため握りつぶす
    }
  }

  async function loadFestival(slug, basePath = "festivals") {
    try {
      const resolvedBasePath = typeof basePath === "string" ? basePath : "festivals";
      const res = await fetch(`${resolvedBasePath}/${slug}/data.js`);
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

  function isEventStatusPastDue(yearlyInfo) {
    const dates = yearlyInfo && Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
    if (dates.length === 0) {
      return false;
    }
    const lastDate = dates[dates.length - 1];
    const lastDateEnd = new Date(`${lastDate}T23:59:59+09:00`).getTime();
    return Number.isFinite(lastDateEnd) && lastDateEnd < Date.now();
  }

  function getEffectiveEventStatus(yearlyInfo) {
    const status = yearlyInfo && yearlyInfo.eventStatus;
    if (
      (status === "confirmed" || status === "scheduled_pending_official") &&
      isEventStatusPastDue(yearlyInfo)
    ) {
      return "ended";
    }
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

  function getTodayJstDateString() {
    return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date());
  }

  function getUpcomingWeekendRange() {
    const todayStr = getTodayJstDateString();
    const today = new Date(`${todayStr}T00:00:00+09:00`);
    const dow = today.getDay();
    const satTime = dow === 0
      ? today.getTime() - 86400000
      : today.getTime() + ((6 - dow + 7) % 7) * 86400000;
    const sunTime = satTime + 86400000;
    return { start: satTime, end: sunTime + 86400000 - 1, satTime, sunTime };
  }

  function getWeekendFestivals(items) {
    const window = getUpcomingWeekendRange();
    return items.filter((item) => {
      return UPCOMING_STATUSES.has(getEffectiveEventStatus(item.yearlyInfo)) &&
        matchingDatesInWindow(item.yearlyInfo, window).length > 0;
    });
  }

  function getUpcomingWindow() {
    const start = new Date(`${getTodayJstDateString()}T00:00:00+09:00`).getTime();
    return { start, end: start + 14 * 86400000 - 1 };
  }

  function matchingDatesInWindow(yearlyInfo, window) {
    const dates = yearlyInfo && Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
    return dates
      .map((date) => new Date(`${date}T00:00:00+09:00`).getTime())
      .filter((time) => Number.isFinite(time) && time >= window.start && time <= window.end);
  }

  function getUpcomingSoonItems(items) {
    const window = getUpcomingWindow();
    const slugIndex = new Map(FESTIVAL_SLUGS.map((slug, index) => [slug, index]));

    const matched = items
      .map((item) => ({ item, matchingTimes: matchingDatesInWindow(item.yearlyInfo, window) }))
      .filter(
        ({ item, matchingTimes }) =>
          UPCOMING_STATUSES.has(getEffectiveEventStatus(item.yearlyInfo)) &&
          matchingTimes.length > 0
      );

    matched.sort((a, b) => {
      const earliestA = Math.min(...a.matchingTimes);
      const earliestB = Math.min(...b.matchingTimes);
      if (earliestA !== earliestB) return earliestA - earliestB;
      return (slugIndex.get(a.item.festival.id) ?? 0) - (slugIndex.get(b.item.festival.id) ?? 0);
    });

    return matched.slice(0, 3).map(({ item }) => item);
  }

  function isOngoingToday(yearlyInfo) {
    const dates = yearlyInfo && Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
    return dates.includes(getTodayJstDateString());
  }

  function weekday(date) {
    return new Intl.DateTimeFormat("ja-JP", { weekday: "short" }).format(date);
  }

  function formatDateRange(yearlyInfo) {
    const dates = Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
    if (dates.length === 0) {
      return `${yearlyInfo.year}年 日程未確認`;
    }

    const fmt = (dateText) => {
      const d = new Date(`${dateText}T00:00:00+09:00`);
      return `${yearlyInfo.year}年${d.getMonth() + 1}月${d.getDate()}日(${weekday(d)})`;
    };
    const fmtShort = (dateText) => {
      const d = new Date(`${dateText}T00:00:00+09:00`);
      return `${d.getDate()}日(${weekday(d)})`;
    };

    if (dates.length === 1) {
      return fmt(dates[0]);
    }

    const runs = [];
    let runStart = 0;
    for (let i = 1; i <= dates.length; i++) {
      const isLast = i === dates.length;
      const isConsecutive =
        !isLast &&
        new Date(`${dates[i]}T00:00:00+09:00`) - new Date(`${dates[i - 1]}T00:00:00+09:00`) === 86400000;
      if (!isConsecutive) {
        runs.push(dates.slice(runStart, i));
        runStart = i;
      }
    }

    if (runs.length > 4) {
      return `${fmt(dates[0])}〜${fmt(dates[dates.length - 1])}（全${dates.length}回）`;
    }

    return runs
      .map((run) => (run.length >= 2 ? `${fmt(run[0])}〜${fmtShort(run[run.length - 1])}` : fmt(run[0])))
      .join(" / ");
  }

  function availabilityState(value) {
    if (value === true) {
      return { className: "is-yes", label: "あり" };
    }
    if (value === false) {
      return { className: "is-no", label: "なし" };
    }
    if (value === "n/a") {
      return { className: "is-na", label: "該当なし" };
    }
    return { className: "is-unknown", label: "未確認" };
  }

  async function loadIconSvg(label) {
    const file = FEATURE_ICON_FILES[label];
    if (!file) return null;
    if (iconCache.has(file)) return iconCache.get(file);
    const promise = fetch(`${getListBasePath()}shared/icons/${file}.svg`)
      .then((res) => (res.ok ? res.text() : null))
      .catch(() => null);
    iconCache.set(file, promise);
    return promise;
  }

  async function attachFeatureIcon(item, label) {
    const svgText = await loadIconSvg(label);
    if (!svgText) return;
    const wrap = document.createElement("span");
    wrap.className = "card-feature-icon";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = svgText;
    item.prepend(wrap);
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

  function createFeatureChip(label, value) {
    const item = document.createElement("span");
    const state = availabilityState(value);
    item.className = `card-feature-chip ${state.className}`;
    item.title = `${label}: ${state.label}`;

    const labelEl = document.createElement("span");
    labelEl.className = "card-feature-label";
    labelEl.textContent = label;

    item.append(labelEl);
    attachFeatureIcon(item, label);
    return item;
  }

  function createExperienceTagChip(label) {
    const chip = document.createElement("span");
    chip.className = "experience-tag-chip";
    chip.textContent = label;
    return chip;
  }

  function createMetaItem(label, value, className) {
    const item = document.createElement("span");
    item.className = "meta-item";
    if (className) {
      item.classList.add(className);
    }

    const labelEl = document.createElement("span");
    labelEl.className = "meta-label";
    labelEl.textContent = label;

    const valueEl = document.createElement("span");
    valueEl.className = "meta-value";
    valueEl.textContent = value;

    item.append(labelEl, valueEl);
    return item;
  }

  function renderFestivalCard(item, section = "list_grid") {
    const { festival, yearlyInfo } = item;
    const constantInfo = festival.constantInfo || {};
    const features = constantInfo.features || {};
    const access = yearlyInfo.access || {};
    const atmosphereMedia = Array.isArray(constantInfo.atmosphereMedia)
      ? constantInfo.atmosphereMedia
      : [];

    const hasPhoto = Boolean(
      constantInfo.backgroundImage && constantInfo.backgroundImage.type === "youtube"
    );
    const effectiveStatus = getEffectiveEventStatus(yearlyInfo);
    const experienceTag =
      typeof EXPERIENCE_TAGS !== "undefined" ? EXPERIENCE_TAGS[festival.id] : undefined;

    const card = document.createElement("a");
    card.className = hasPhoto ? "festival-item" : "festival-item festival-item--text";
    card.href = `${getListBasePath()}festivals/${festival.id}/`;
    card.dataset.area = festival.areaTag || "";
    card.dataset.highlightTime = features.highlightTime || "";
    card.dataset.hasDanceOnDashi = String(features.hasDanceOnDashi);
    card.dataset.eventStatus = effectiveStatus || "";

    if (hasPhoto) {
      card.append(createItemMedia(constantInfo.backgroundImage));
    } else {
      card.append(createDummyMedia(features));
    }

    const topLine = document.createElement("div");
    topLine.className = "item-topline";

    const prefecture = document.createElement("span");
    prefecture.className = "prefecture";
    prefecture.textContent = festival.prefecture
      ? `${festival.prefecture}${festival.city || ""}`
      : "都道府県未確認";

    const status = document.createElement("span");
    status.className = `status-badge status-${effectiveStatus || "unknown"}`;
    status.textContent = eventStatusLabels[effectiveStatus] || "未確認";

    topLine.append(prefecture, status);

    const title = document.createElement("h2");
    title.className = "item-name";
    title.textContent = festival.name || "名称未確認";

    const date = document.createElement("p");
    date.className = "item-date";
    date.textContent = formatDateRange(yearlyInfo);

    const featureChips = document.createElement("div");
    featureChips.className = "card-feature-chips";
    featureChips.append(
      ...cardFeatureItems.map(([label, key]) => createFeatureChip(label, features[key]))
    );

    if (experienceTag) {
      featureChips.append(createExperienceTagChip(experienceTag));
    }

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.append(
      createMetaItem(
        "見どころ",
        highlightTimeLabels[features.highlightTime] || "未確認",
        "meta-item--highlight-time"
      ),
      createMetaItem("駐車場", parkingText(access.hasParking))
    );

    if (atmosphereMedia.length > 0) {
      meta.append(createVideoBadge());
    }

    const body = document.createElement("div");
    body.className = "item-body";
    body.append(topLine, title, date, featureChips, meta);

    if (constantInfo.highlightComment) {
      const highlight = document.createElement("p");
      highlight.className = "highlight-comment";
      highlight.textContent = constantInfo.highlightComment;
      body.append(highlight);
    }

    card.append(body);
    card.addEventListener("click", () => {
      const featureFilterEl = document.getElementById("feature-filter");
      const monthFilterEl = document.getElementById("month-filter");
      sendGaEvent("festival_card_click", {
        festival_slug: festival.id,
        festival_name: festival.name,
        prefecture: festival.prefecture,
        event_status: effectiveStatus,
        has_background_image: hasPhoto,
        has_atmosphere_media: atmosphereMedia.length > 0,
        experience_tag: experienceTag || "none",
        link_url: card.href,
        section,
        feature_filter: featureFilterEl ? (featureFilterEl.value || "all") : "n/a",
        month_filter: monthFilterEl ? (monthFilterEl.value || "all") : "n/a"
      });
    });

    return card;
  }

  function createVideoBadge() {
    const badge = document.createElement("span");
    badge.className = "meta-item meta-item--video";
    badge.setAttribute("role", "img");
    badge.setAttribute("aria-label", "動画あり");
    badge.title = "動画あり";
    badge.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="10,8.5 10,15.5 16,12" fill="currentColor"/></svg>';
    return badge;
  }

  function createItemMedia(backgroundImage) {
    const media = document.createElement("div");
    media.className = "item-media";

    const img = document.createElement("img");
    img.className = "item-media-img";
    img.src = `https://i.ytimg.com/vi/${backgroundImage.contentId}/hqdefault.jpg`;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    media.append(img);

    return media;
  }

  function pickDummyIconLabels(features) {
    const found = cardFeatureItems
      .filter(([, key]) => features[key] === true)
      .map(([label]) => label);
    return found.length > 0 ? found.slice(0, 2) : ["見どころ"];
  }

  function pickUpcomingIconLabel(features) {
    const found = UPCOMING_ICON_PRIORITY.find(([, key]) => features[key] === true);
    return found ? found[0] : "見どころ";
  }

  function createDummyMedia(features) {
    const media = document.createElement("div");
    media.className = "item-media item-media--icon";
    media.setAttribute("aria-hidden", "true");

    const group = document.createElement("div");
    group.className = "item-media-icon-group";
    media.append(group);

    pickDummyIconLabels(features).forEach((label) => {
      const plate = document.createElement("span");
      plate.className = "item-media-icon-plate";
      group.append(plate);
      attachDummyIcon(plate, label);
    });

    return media;
  }

  async function attachDummyIcon(container, label) {
    const svgText = await loadIconSvg(label);
    if (svgText) {
      container.innerHTML = svgText;
    }
  }

  function renderUpcomingSoonCard(item) {
    const { festival, yearlyInfo } = item;
    const constantInfo = festival.constantInfo || {};
    const features = constantInfo.features || {};
    const atmosphereMedia = Array.isArray(constantInfo.atmosphereMedia)
      ? constantInfo.atmosphereMedia
      : [];
    const hasPhoto = Boolean(
      constantInfo.backgroundImage && constantInfo.backgroundImage.type === "youtube"
    );
    const experienceTag =
      typeof EXPERIENCE_TAGS !== "undefined" ? EXPERIENCE_TAGS[festival.id] : undefined;

    const card = document.createElement("a");
    card.className = "upcoming-mini-card";
    card.href = `festivals/${festival.id}/`;

    const media = document.createElement("div");
    media.className = "upcoming-mini-media";

    if (hasPhoto) {
      const img = document.createElement("img");
      img.className = "upcoming-mini-thumb";
      img.src = `https://i.ytimg.com/vi/${constantInfo.backgroundImage.contentId}/hqdefault.jpg`;
      img.alt = "";
      img.loading = "lazy";
      media.append(img);
    } else {
      media.classList.add("upcoming-mini-media--icon");
      attachDummyIcon(media, pickUpcomingIconLabel(features));
    }

    const body = document.createElement("div");
    body.className = "upcoming-mini-body";

    const prefecture = document.createElement("span");
    prefecture.className = "upcoming-mini-prefecture";
    prefecture.textContent = festival.prefecture
      ? `${festival.prefecture}${festival.city || ""}`
      : "";

    const name = document.createElement("span");
    name.className = "upcoming-mini-name";
    name.textContent = festival.name || "";

    const date = document.createElement("span");
    date.className = "upcoming-mini-date";
    date.textContent = formatDateRange(yearlyInfo);

    body.append(prefecture, name, date);
    card.append(media, body);

    card.addEventListener("click", () => {
      sendGaEvent("festival_card_click", {
        festival_slug: festival.id,
        festival_name: festival.name,
        prefecture: festival.prefecture,
        event_status: getEffectiveEventStatus(yearlyInfo),
        has_background_image: hasPhoto,
        has_atmosphere_media: atmosphereMedia.length > 0,
        experience_tag: experienceTag || "none",
        link_url: card.href,
        section: "upcoming_soon"
      });
    });

    return card;
  }

  function render(items) {
    const list = document.getElementById("festival-list");
    const count = document.getElementById("festival-count");
    const toggle = document.getElementById("upcoming-only-toggle");
    const areaFilter = document.getElementById("area-filter");
    const featureFilter = document.getElementById("feature-filter");
    const monthFilter = document.getElementById("month-filter");

    const visibleItems = items.filter((item) => {
      const passesUpcoming =
        !toggle.checked || UPCOMING_STATUSES.has(getEffectiveEventStatus(item.yearlyInfo));
      const passesArea = !areaFilter.value || (
        areaFilter.value.startsWith("region:")
          ? (REGION_PREFECTURES[areaFilter.value.slice(7)] || []).includes(item.festival.areaTag)
          : item.festival.areaTag === areaFilter.value
      );
      const features = (item.festival.constantInfo && item.festival.constantInfo.features) || {};
      const passesFeature = !featureFilter.value || features[featureFilter.value] === true;
      const passesMonth = !monthFilter.value || (
        Array.isArray(item.yearlyInfo.dates) &&
        item.yearlyInfo.dates.some((d) => Number(d.slice(5, 7)) === Number(monthFilter.value))
      );
      return passesUpcoming && passesArea && passesFeature && passesMonth;
    });

    list.replaceChildren(...visibleItems.map(renderFestivalCard));
    count.textContent = (items.length === visibleItems.length)
      ? `${items.length}件を掲載中`
      : `${items.length}件中${visibleItems.length}件を表示`;

    return visibleItems.length;
  }

  function renderUpcomingSoonSection(items) {
    const section = document.getElementById("upcoming-soon-section");
    const list = document.getElementById("upcoming-soon-list");
    if (!section || !list) return;

    const upcomingItems = getUpcomingSoonItems(items);

    const ongoingItems = upcomingItems.filter((item) => isOngoingToday(item.yearlyInfo));
    const upcomingOnlyItems = upcomingItems.filter((item) => !isOngoingToday(item.yearlyInfo));

    if (ongoingItems.length === 0 && upcomingOnlyItems.length === 0) {
      section.hidden = true;
      list.replaceChildren();
      return;
    }

    const groups = [
      ["開催中", ongoingItems],
      ["まもなく開催", upcomingOnlyItems]
    ];
    const groupElements = groups
      .filter(([, groupItems]) => groupItems.length > 0)
      .map(([headingText, groupItems]) => {
        const group = document.createElement("div");
        group.className = "upcoming-soon-group";

        const heading = document.createElement("h3");
        heading.className = "upcoming-soon-group-heading";
        heading.textContent = headingText;

        group.append(heading, ...groupItems.map(renderUpcomingSoonCard));
        return group;
      });

    list.replaceChildren(...groupElements);
    section.hidden = false;
  }

  function formatWeekendDate(time) {
    const date = new Date(time);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  function renderWeekendSections(items) {
    const bannerSection = document.getElementById("weekend-banner-section");
    const picksSection = document.getElementById("weekend-picks-section");
    const picksList = document.getElementById("weekend-picks-list");
    if (!bannerSection || !picksSection || !picksList) return;

    const weekendItems = getWeekendFestivals(items);
    const selectedRegion = getStoredRegion();
    const selectedPrefectures = REGION_PREFECTURES[selectedRegion];
    const regionalWeekendItems = selectedPrefectures
      ? weekendItems.filter((item) => selectedPrefectures.includes(item.festival.areaTag))
      : weekendItems;
    const regionEntry = document.getElementById("weekend-banner-region-entry");

    if (regionEntry) {
      regionEntry.textContent = selectedPrefectures
        ? `${REGION_LABELS[selectedRegion]}を変更`
        : "地域を選ぶ";
    }

    if (weekendItems.length === 0) {
      bannerSection.hidden = true;
      picksSection.hidden = true;
      picksList.replaceChildren();
      return;
    }

    const range = getUpcomingWeekendRange();
    const dates = document.getElementById("weekend-banner-dates");
    const count = document.getElementById("weekend-banner-count");
    const thumb = document.getElementById("weekend-banner-thumb");
    if (dates) dates.textContent = `${formatWeekendDate(range.satTime)}–${formatWeekendDate(range.sunTime)}`;
    if (count) {
      count.textContent = selectedPrefectures && regionalWeekendItems.length === 0
        ? `${REGION_LABELS[selectedRegion]}では今週末開催の祭りはありません`
        : `${selectedPrefectures ? REGION_LABELS[selectedRegion] : "全国"}で${regionalWeekendItems.length}件`;
    }

    const firstRegionalItem = regionalWeekendItems[0];
    const firstBackground = firstRegionalItem && firstRegionalItem.festival.constantInfo &&
      firstRegionalItem.festival.constantInfo.backgroundImage;
    if (thumb) {
      const hasThumb = Boolean(
        firstBackground && firstBackground.type === "youtube" && firstBackground.contentId
      );
      thumb.hidden = !hasThumb;
      thumb.style.backgroundImage = hasThumb
        ? `url("https://i.ytimg.com/vi/${firstBackground.contentId}/hqdefault.jpg")`
        : "";
    }

    picksList.replaceChildren(...weekendItems.slice(0, 4).map((item) => renderFestivalCard(item, "weekend_picks")));
    bannerSection.hidden = false;
    picksSection.hidden = false;
  }

  function getStoredRegion() {
    try {
      const value = localStorage.getItem(REGION_STORAGE_KEY);
      return value === "national" || Object.prototype.hasOwnProperty.call(REGION_PREFECTURES, value)
        ? value
        : null;
    } catch (err) {
      return null;
    }
  }

  function storeRegion(value) {
    try {
      localStorage.setItem(REGION_STORAGE_KEY, value);
    } catch (err) {
      // 保存不可の場合も、その場の表示操作は止めない
    }
  }

  function openRegionModal(isFirstVisit) {
    const overlay = document.getElementById("region-modal-overlay");
    const title = document.getElementById("region-modal-title");
    const description = document.getElementById("region-modal-description");
    if (!overlay || !title || !description) return;

    regionModalFirstVisit = isFirstVisit;
    title.textContent = isFirstVisit ? "あなたの地方は？" : "表示する地域を選択";
    description.textContent = isFirstVisit
      ? "今週末の祭りを、あなたの地域で表示します。"
      : "今週末の祭りを表示する地域を変更できます。";

    const storedRegion = getStoredRegion();
    const selectedValue = storedRegion || "";
    document.querySelectorAll('input[name="region-modal-choice"]').forEach((radio) => {
      radio.checked = radio.value === selectedValue;
    });
    overlay.hidden = false;
    const selected = document.querySelector('input[name="region-modal-choice"]:checked');
    (selected || document.querySelector('input[name="region-modal-choice"]'))?.focus();
  }

  function closeRegionModal() {
    const overlay = document.getElementById("region-modal-overlay");
    if (overlay) overlay.hidden = true;
  }

  function dismissRegionModal() {
    if (regionModalFirstVisit) {
      storeRegion("national");
      renderWeekendSections(currentFestivalItems);
    }
    closeRegionModal();
  }

  function setupRegionModal(items) {
    currentFestivalItems = items;
    const overlay = document.getElementById("region-modal-overlay");
    const options = document.getElementById("region-modal-options");
    const closeButton = document.getElementById("region-modal-close");
    const confirmButton = document.getElementById("region-modal-confirm");
    const regionEntry = document.getElementById("weekend-banner-region-entry");
    if (!overlay || !options || !closeButton || !confirmButton || !regionEntry) return;

    const regionOptions = Object.entries(REGION_LABELS).map(([value, label]) => {
      const option = document.createElement("label");
      option.className = "region-modal-option";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "region-modal-choice";
      radio.value = value;
      const text = document.createElement("span");
      text.textContent = label;
      option.append(radio, text);
      return option;
    });
    options.replaceChildren(...regionOptions);

    closeButton.addEventListener("click", dismissRegionModal);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) dismissRegionModal();
    });
    confirmButton.addEventListener("click", () => {
      const selected = document.querySelector('input[name="region-modal-choice"]:checked');
      if (!selected) return;
      storeRegion(selected.value);
      renderWeekendSections(currentFestivalItems);
      closeRegionModal();
    });
    regionEntry.addEventListener("click", () => openRegionModal(false));

    if (getStoredRegion() === null) {
      openRegionModal(true);
    }
  }

  function featureGridMatches(item, key) {
    const features = (item.festival.constantInfo && item.festival.constantInfo.features) || {};
    if (key === "highlightTime:night") {
      return features.highlightTime === "night" || features.highlightTime === "both";
    }
    return features[key] === true;
  }

  function renderFeatureGrid(items) {
    const grid = document.getElementById("feature-grid");
    if (!grid) return;

    const links = FEATURE_GRID_ITEMS.map((entry) => {
      const link = document.createElement("a");
      link.className = "feature-grid-item";
      link.href = entry.hubUrl;

      const icon = document.createElement("span");
      icon.className = `feature-grid-icon feature-grid-icon--${entry.icon}`;
      icon.setAttribute("aria-hidden", "true");
      loadIconSvg(entry.label === "夜が見どころ" ? "見どころ" : entry.label).then((svg) => {
        if (svg) icon.innerHTML = svg;
      });

      const label = document.createElement("span");
      label.className = "feature-grid-label";
      label.textContent = entry.label;

      const count = document.createElement("span");
      count.className = "feature-grid-count";
      count.textContent = `${items.filter((item) => featureGridMatches(item, entry.key)).length}件`;
      link.append(icon, label, count);
      return link;
    });
    grid.replaceChildren(...links);
  }

  function renderMonthGrid() {
    const grid = document.getElementById("month-grid");
    const monthFilter = document.getElementById("month-filter");
    const festivalList = document.getElementById("festival-list");
    if (!grid || !monthFilter || !festivalList) return;
    const currentMonth = Number(getTodayJstDateString().slice(5, 7));

    const controls = Array.from({ length: 12 }, (_, index) => index + 1).map((month) => {
      const hubUrl = MONTH_HUB_URLS[month];
      const control = document.createElement(hubUrl ? "a" : "button");
      control.className = "month-grid-item";
      control.textContent = `${month}月`;
      if (month === currentMonth) {
        control.classList.add("is-current");
        control.setAttribute("aria-current", "date");
      }
      if (hubUrl) {
        control.href = hubUrl;
      } else {
        control.type = "button";
        control.addEventListener("click", () => {
          monthFilter.value = String(month);
          monthFilter.dispatchEvent(new Event("change", { bubbles: true }));
          festivalList.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return control;
    });
    grid.replaceChildren(...controls);
  }

  function renderAreaEntries() {
    const areaFilter = document.getElementById("area-filter");
    const festivalList = document.getElementById("festival-list");
    if (!areaFilter || !festivalList) return;
    ["area-entry-prefecture", "area-entry-region"].forEach((id) => {
      const button = document.getElementById(id);
      if (!button) return;
      button.addEventListener("click", () => {
        festivalList.scrollIntoView({ behavior: "smooth", block: "start" });
        areaFilter.focus({ preventScroll: true });
      });
    });
  }

  function setupWeekendBannerLink() {
    const bannerLink = document.getElementById("weekend-banner-link");
    const picksSection = document.getElementById("weekend-picks-section");
    if (!bannerLink || !picksSection) return;

    bannerLink.addEventListener("click", (event) => {
      if (picksSection.hidden) return;
      event.preventDefault();
      picksSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderDiscoverySections(items) {
    renderWeekendSections(items);
    renderFeatureGrid(items);
    renderMonthGrid();
    renderAreaEntries();
    setupWeekendBannerLink();
    setupRegionModal(items);
  }

  function syncFilterState(filterEl) {
    filterEl.classList.toggle("is-filtering", filterEl.value !== "");
  }

  async function init() {
    const loaded = await Promise.all(FESTIVAL_SLUGS.map(loadFestival));
    const items = sortFestivalItems(loaded.filter(Boolean).map(normalizeFestival).filter(Boolean));
    const toggle = document.getElementById("upcoming-only-toggle");
    const areaFilter = document.getElementById("area-filter");
    const featureFilter = document.getElementById("feature-filter");
    const monthFilter = document.getElementById("month-filter");

    toggle.addEventListener("change", () => {
      const visibleFestivalCount = render(items);
      sendGaEvent("upcoming_filter_change", {
        enabled: toggle.checked,
        visible_festival_count: visibleFestivalCount
      });
    });
    areaFilter.addEventListener("change", () => {
      syncFilterState(areaFilter);
      const visibleFestivalCount = render(items);
      sendGaEvent("prefecture_filter_change", {
        selected_prefecture: areaFilter.value || "all",
        visible_festival_count: visibleFestivalCount
      });
    });
    featureFilter.addEventListener("change", () => {
      syncFilterState(featureFilter);
      const visibleFestivalCount = render(items);
      sendGaEvent("feature_filter_change", {
        selected_feature: featureFilter.value || "all",
        visible_festival_count: visibleFestivalCount
      });
    });
    monthFilter.addEventListener("change", () => {
      syncFilterState(monthFilter);
      const visibleFestivalCount = render(items);
      sendGaEvent("month_filter_change", {
        selected_month: monthFilter.value || "all",
        visible_festival_count: visibleFestivalCount
      });
    });
    syncFilterState(areaFilter);
    syncFilterState(featureFilter);
    syncFilterState(monthFilter);
    render(items);
    renderUpcomingSoonSection(items);
    renderDiscoverySections(items);
  }

  window.__festivalList = {
    getPrimaryYearlyInfo,
    loadFestival,
    renderFestivalCard
  };

  if (document.getElementById("festival-list")) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})();
