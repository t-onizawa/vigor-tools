(function () {
const FESTIVAL_SLUGS = ["ishioka-omatsuri", "sawara-natsu-matsuri", "sawara-aki-matsuri", "chichibu-yomatsuri", "chichibu-ryusei-matsuri", "itako-gion", "hitachi-furyumono", "ryugasaki-tsukumai", "shimodate-gion", "tsuchiura-gion", "makabe-gion", "yuki-natsumatsuri", "hokota-summer-festival", "oarai-hassaku-matsuri", "mito-koumon-matsuri", "kashima-jingu-saitousai", "kisarazu-gion", "kururi-natsumatsuri", "sakura-aki-matsuri", "ohara-hadaka-matsuri", "yokaichiba-gion", "narita-gion", "matsudo-jinja-reitaisai", "awa-yawatanmachi", "fukaya-matsuri", "fukiage-natsumatsuri", "kasukabe-natsumatsuri", "kawagoe-matsuri", "kumagaya-uchiwa-matsuri", "omiya-nakasendo-matsuri", "hanno-matsuri", "honjo-matsuri", "fuchu-kurayami-matsuri", "hachioji-matsuri", "ome-taisai", "hamura-haru-matsuri", "ninomiya-shrine-shogamatsuri", "fukagawa-hachiman-matsuri", "sanja-matsuri", "nikko-toshogu-shunki-reitaisai", "honmoku-ouma-nagashi", "kawasaki-sannosai", "kanda-matsuri", "kamakura-matsuri-yabusame", "manazuru-kibune-matsuri", "oiso-sagicho", "hamaori-sai", "yokosuka-mikoshi-parade", "sagami-odako-matsuri", "enoshima-tennosai", "odawara-hojo-godai-matsuri", "kanuma-imamiya-matsuri", "nasukarasuyama-yamaage-matsuri", "tochigi-aki-matsuri", "oyama-gion-matsuri", "mashiko-gion-matsuri", "moka-natsu-matsuri", "mamada-jagamaita", "ikiko-jinja-nakizumo", "kinugawa-ryuo-matsuri", "nikko-yayoi-matsuri", "utsunomiya-miya-matsuri", "kiryu-yagibushi-matsuri", "numata-matsuri", "maebashi-matsuri", "annaka-matsuri", "shimonita-aki-matsuri", "nakanojo-torioi-matsuri", "tatebayashi-matsuri", "kuki-chochin-matsuri", "funabashi-daijingu-reitaisai", "ikegami-honmonji-oeshiki", "tachikawa-suwa-reitaisai", "jindaiji-daruma-ichi", "takasaki-matsuri", "ojima-neputa-matsuri", "shibukawa-heso-matsuri", "nagatoro-funadama-matsuri", "minamiboso-shirahama-ama-matsuri", "yugawara-yukake-matsuri", "tokyo-koenji-awaodori", "shonan-hiratsuka-tanabata-matsuri", "isesaki-matsuri", "tokorozawa-matsuri", "minami-koshigaya-awaodori", "fujioka-matsuri", "abiko-kappa-matsuri", "ohtawara-yoichi-matsuri", "ohtawara-yatai-matsuri", "kitamoto-yoi-matsuri", "katsuura-tairyo-matsuri", "asakusa-samba-carnival", "shinjuku-eisa-matsuri", "omama-gion-matsuri", "sakado-yosakoi", "obari-matsushita-ryu-tsunabi", "hanazono-no-sasara", "hadano-tabako-matsuri", "aomori-nebuta-matsuri", "akita-kanto-matsuri", "morioka-sansa-odori", "sendai-tanabata-matsuri", "yamagata-hanagasa-matsuri", "fukushima-waraji-matsuri", "hirosaki-neputa-matsuri", "goshogawara-tachineputa", "nishimonai-bon-odori", "morioka-funekko-nagashi", "shiogama-minato-matsuri", "shinjo-matsuri", "soma-nomaoi", "tsuchizaki-minato-hikiyama", "chagu-chagu-umakko", "sendai-aoba-matsuri", "yonezawa-uesugi-matsuri", "aizutajima-gion-matsuri", "nagaoka-matsuri", "owara-kaze-no-bon", "seihakusai-dekayama", "mikuni-matsuri", "yoshida-himatsuri", "matsumoto-bonbon", "gujo-odori", "hamamatsu-matsuri", "owari-tsushima-tenno-matsuri", "murakami-taisai"];
  const UPCOMING_STATUSES = new Set(["confirmed", "scheduled_pending_official"]);

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

  function sendGaEvent(name, params) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, params);
      }
    } catch (err) {
      // 計測失敗はUIに影響させないため握りつぶす
    }
  }

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

    const isFullyConsecutive = dates.every((date, i) => {
      if (i === 0) return true;
      return (
        new Date(`${date}T00:00:00+09:00`) - new Date(`${dates[i - 1]}T00:00:00+09:00`) === 86400000
      );
    });

    if (!isFullyConsecutive) {
      return dates
        .map((date) => {
          const d = new Date(`${date}T00:00:00+09:00`);
          return `${yearlyInfo.year}年${d.getMonth() + 1}月${d.getDate()}日(${weekday(d)})`;
        })
        .join(" / ");
    }

    const start = new Date(`${dates[0]}T00:00:00+09:00`);
    const end = new Date(`${dates[dates.length - 1]}T00:00:00+09:00`);

    if (dates.length === 1) {
      return `${yearlyInfo.year}年${start.getMonth() + 1}月${start.getDate()}日(${weekday(start)})`;
    }

    return `${yearlyInfo.year}年${start.getMonth() + 1}月${start.getDate()}日(${weekday(start)})〜${end.getDate()}日(${weekday(end)})`;
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
    const promise = fetch(`shared/icons/${file}.svg`)
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
    card.href = `festivals/${festival.id}/`;
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
      sendGaEvent("festival_card_click", {
        festival_slug: festival.id,
        festival_name: festival.name,
        prefecture: festival.prefecture,
        event_status: effectiveStatus,
        has_background_image: hasPhoto,
        has_atmosphere_media: atmosphereMedia.length > 0,
        experience_tag: experienceTag || "none",
        link_url: card.href,
        section
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

    const visibleItems = items.filter((item) => {
      const passesUpcoming =
        !toggle.checked || UPCOMING_STATUSES.has(getEffectiveEventStatus(item.yearlyInfo));
      const passesArea = !areaFilter.value || item.festival.areaTag === areaFilter.value;
      return passesUpcoming && passesArea;
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

  function syncAreaFilterState(areaFilter) {
    areaFilter.classList.toggle("is-filtering", areaFilter.value !== "");
  }

  async function init() {
    const loaded = await Promise.all(FESTIVAL_SLUGS.map(loadFestival));
    const items = sortFestivalItems(loaded.filter(Boolean).map(normalizeFestival).filter(Boolean));
    const toggle = document.getElementById("upcoming-only-toggle");
    const areaFilter = document.getElementById("area-filter");

    toggle.addEventListener("change", () => {
      const visibleFestivalCount = render(items);
      sendGaEvent("upcoming_filter_change", {
        enabled: toggle.checked,
        visible_festival_count: visibleFestivalCount
      });
    });
    areaFilter.addEventListener("change", () => {
      syncAreaFilterState(areaFilter);
      const visibleFestivalCount = render(items);
      sendGaEvent("prefecture_filter_change", {
        selected_prefecture: areaFilter.value || "all",
        visible_festival_count: visibleFestivalCount
      });
    });
    syncAreaFilterState(areaFilter);
    render(items);
    renderUpcomingSoonSection(items);
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
