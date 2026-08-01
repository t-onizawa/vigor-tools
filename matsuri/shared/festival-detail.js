(function () {
  const festival = FESTIVAL;
  const currentYear = festival.yearlyInfo[0];
  const features = festival.constantInfo.features;

  const eventStatusLabels = {
    confirmed: "開催確認済み",
    scheduled_pending_official: "開催予定・公式詳細待ち",
    off_year: "陰祭年（本祭なし）",
    unconfirmed: "未確認",
    cancelled: "中止",
    postponed: "延期",
    ended: "終了"
  };

  const eventStatusDateText = {
    confirmed: {
      heading: (year) => `${year}年の開催日`
    },
    scheduled_pending_official: {
      heading: (year) => `${year}年の開催予定`,
      note: "公式の詳細発表を確認中です"
    },
    off_year: {
      heading: (year) => `${year}年の開催について`,
      note: "本祭りは実施されない陰祭年です"
    },
    unconfirmed: {
      heading: (year) => `${year}年の開催情報`,
      note: "日程は未確認です"
    },
    cancelled: {
      heading: (year) => `${year}年の開催予定`,
      note: "この開催は中止になりました"
    },
    postponed: {
      heading: (year) => `${year}年の開催予定`,
      note: "この開催は延期になりました"
    },
    ended: {
      heading: (year) => `${year}年の開催実績`,
      note: "この開催は終了しました"
    }
  };

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

  const effectiveEventStatus = getEffectiveEventStatus(currentYear);

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

  const iconCache = new Map();

  const featureItems = [
    ["山車", features.hasDashi],
    ["神輿", features.hasMikoshi],
    ["踊り", features.hasDanceOnDashi],
    ["曳き回し", features.hasParade]
  ];

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, text) {
    byId(id).textContent = text;
  }

  async function loadExperienceTags() {
    try {
      const res = await fetch("../../shared/experience-tags.js");
      if (!res.ok) return null;
      const src = await res.text();
      const factory = new Function(`${src}\nreturn EXPERIENCE_TAGS;`);
      return factory();
    } catch (err) {
      console.warn("[festival-detail] experience-tags.jsの読み込みに失敗", err);
      return null;
    }
  }

  async function renderExperienceTag(festivalId) {
    const tags = await loadExperienceTags();
    const label = tags && tags[festivalId];
    if (!label) {
      return;
    }
    const prefectureEl = byId("festival-prefecture");
    if (!prefectureEl || !prefectureEl.parentElement) {
      return;
    }
    const chip = document.createElement("p");
    chip.className = "experience-tag-chip";
    chip.textContent = label;
    prefectureEl.insertAdjacentElement("afterend", chip);
  }

  async function loadIconSvg(label) {
    const file = FEATURE_ICON_FILES[label];
    if (!file) return null;
    if (iconCache.has(file)) return iconCache.get(file);
    const promise = fetch(`../../shared/icons/${file}.svg`)
      .then((res) => (res.ok ? res.text() : null))
      .catch(() => null);
    iconCache.set(file, promise);
    return promise;
  }

  async function attachFeatureIcon(item, label) {
    const svgText = await loadIconSvg(label);
    if (!svgText) return;
    const wrap = document.createElement("span");
    wrap.className = "feature-icon";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = svgText;
    item.prepend(wrap);
  }

  function formatDate(dateText) {
    const date = new Date(`${dateText}T00:00:00+09:00`);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short"
    }).format(date);
  }

  function formatDateList(dates) {
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

    return runs
      .map((run) =>
        run.length >= 2 ? `${formatDate(run[0])}〜${formatDate(run[run.length - 1])}` : formatDate(run[0])
      )
      .join(" / ");
  }

  function createFeatureBadge(label, value) {
    const item = document.createElement("div");
    const state = availabilityState(value);
    item.className = "feature-badge";
    item.classList.add(state.className);

    const text = document.createElement("div");
    text.className = "feature-badge-text";

    const labelEl = document.createElement("strong");
    labelEl.textContent = label;

    const valueEl = document.createElement("span");
    valueEl.textContent = state.label;

    text.append(labelEl, valueEl);
    item.append(text);
    return item;
  }

  function createNeutralFeatureBadge(label, value) {
    const item = document.createElement("div");
    item.className = "feature-badge is-neutral";

    const text = document.createElement("div");
    text.className = "feature-badge-text";

    const labelEl = document.createElement("strong");
    labelEl.textContent = label;

    const valueEl = document.createElement("span");
    valueEl.textContent = value;

    text.append(labelEl, valueEl);
    item.append(text);
    return item;
  }

  function createDetailItem(term, value, note) {
    const item = document.createElement("div");
    item.className = "detail-item";

    const termEl = document.createElement("span");
    termEl.className = "detail-term";
    termEl.textContent = term;

    const valueEl = document.createElement("span");
    valueEl.className = "detail-value";
    valueEl.textContent = value;

    item.append(termEl, valueEl);

    if (note) {
      const noteEl = document.createElement("p");
      noteEl.className = "detail-note";
      noteEl.textContent = note;
      item.append(noteEl);
    }

    return item;
  }

  function parkingLabel(value) {
    return availabilityState(value).label;
  }

  function availabilityState(value) {
    if (value === true) {
      return { label: "あり", className: "is-yes" };
    }
    if (value === false) {
      return { label: "なし", className: "is-no" };
    }
    if (value === "n/a") {
      return { label: "該当なし", className: "is-na" };
    }
    return { label: "未確認", className: "is-unknown" };
  }

  function createSourceBlock(title, confirmation) {
    const fragment = document.createDocumentFragment();

    const titleEl = document.createElement("p");
    titleEl.className = "source-title";
    titleEl.textContent = title;

    const metaEl = document.createElement("p");
    metaEl.className = "source-meta";
    metaEl.textContent = `確認日：${confirmation.confirmedDate}`;

    const listEl = document.createElement("ul");
    listEl.className = "source-list";

    confirmation.sources.forEach((source) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = source;
      link.textContent = source;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      item.append(link);
      listEl.append(item);
    });

    fragment.append(titleEl, metaEl, listEl);

    if (confirmation.note) {
      const noteEl = document.createElement("p");
      noteEl.className = "source-note";
      noteEl.textContent = confirmation.note;
      fragment.append(noteEl);
    }

    return fragment;
  }

  function renderAtmosphereMedia(mediaItems) {
    const section = byId("atmosphere-media-section");
    const galleryItems = mediaItems ? mediaItems.slice(0, 3) : [];
    const media = galleryItems[0];

    if (!section) {
      return;
    }

    if (!media) {
      section.remove();
      return;
    }

    try {
      setText("atmosphere-media-notice", `過去開催時の様子（${media.publishedYear}年）`);
      setText(
        "atmosphere-media-meta",
        `公開元：${media.publisher} ／ 確認日：${media.checkedDate}`
      );

      const mediaLink = byId("atmosphere-media-link");
      mediaLink.href = media.url;

      if (media.type === "youtube") {
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${media.contentId}`;
        iframe.title = media.title;
        iframe.loading = "lazy";
        iframe.allow =
          "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;

        byId("atmosphere-media-frame").append(iframe);
        renderAtmosphereMediaGallery(galleryItems.slice(1));
        section.hidden = false;
      } else {
        section.remove();
      }
    } catch (err) {
      console.warn("[festival-detail] atmosphereMediaの描画に失敗", err);
      section.remove();
    }
  }

  function injectBrandMark() {
    const header = document.querySelector(".festival-header");
    const backLink = header ? header.querySelector(".back-link") : null;
    if (!header || !backLink) {
      return;
    }

    const mark = document.createElement("p");
    mark.className = "brand-mark";

    const link = document.createElement("a");
    link.href = "../../index.html";
    link.textContent = "MATSURI";

    mark.append(link);
    header.insertBefore(mark, backLink);
  }

  function applyHeroHeader(backgroundImage) {
    const header = document.querySelector(".festival-header");
    if (!header) {
      return;
    }

    const media = backgroundImage;
    header.classList.add("has-hero");

    const background = document.createElement("div");
    if (media && media.type === "youtube") {
      background.className = "hero-background";
      background.style.backgroundImage = `url(https://i.ytimg.com/vi/${media.contentId}/hqdefault.jpg)`;
    } else {
      background.className = "hero-background hero-background--fallback";
    }
    header.prepend(background);
  }

  function createAtmosphereMediaGalleryItem(media) {
    const item = document.createElement("div");
    item.className = "media-gallery-item";

    const thumb = document.createElement("button");
    thumb.className = "media-gallery-thumb";
    thumb.type = "button";
    thumb.setAttribute("aria-label", `動画を再生：${media.title}`);

    const image = document.createElement("img");
    image.src = `https://i.ytimg.com/vi/${media.contentId}/hqdefault.jpg`;
    image.alt = "";
    image.loading = "lazy";

    const playIcon = document.createElement("span");
    playIcon.className = "media-gallery-play-icon";
    playIcon.setAttribute("aria-hidden", "true");

    thumb.append(image, playIcon);

    thumb.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.className = "media-gallery-embed";
      iframe.src = `https://www.youtube.com/embed/${media.contentId}`;
      iframe.title = media.title;
      iframe.allow =
        "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      thumb.replaceWith(iframe);
    });

    const caption = document.createElement("p");
    caption.className = "media-gallery-caption";
    caption.textContent = `過去開催時の様子（${media.publishedYear}年）`;

    const meta = document.createElement("p");
    meta.className = "media-gallery-meta";
    meta.textContent = `${media.publisher} ／ 確認日：${media.checkedDate}`;

    const link = document.createElement("a");
    link.className = "media-gallery-link";
    link.href = media.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "YouTubeで見る →";

    item.append(thumb, caption, meta, link);
    return item;
  }

  function renderAtmosphereMediaGallery(mediaItems) {
    const gallery = byId("atmosphere-media-gallery");

    if (!gallery) {
      return;
    }

    const galleryItems = mediaItems.filter((media) => media.type === "youtube");

    if (!galleryItems.length) {
      gallery.hidden = true;
      gallery.replaceChildren();
      return;
    }

    gallery.replaceChildren();
    galleryItems.forEach((media) => {
      gallery.append(createAtmosphereMediaGalleryItem(media));
    });
    gallery.hidden = false;
  }

  function renderMapReference(mapReference) {
    const section = byId("map-section");

    if (!section) {
      return;
    }

    if (!mapReference) {
      section.remove();
      return;
    }

    try {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(mapReference.query)}&output=embed`;
      iframe.title = mapReference.label;
      iframe.loading = "lazy";

      byId("map-frame").append(iframe);
      setText("map-note", mapReference.note);
      byId("map-external-link").href = mapReference.mapUrl;
      section.hidden = false;
    } catch (err) {
      console.warn("[festival-detail] mapReferenceの描画に失敗", err);
      section.remove();
    }
  }

  function renderHighlightComment(comment) {
    const section = byId("highlight-comment-section");

    if (!comment) {
      section.remove();
      return;
    }

    setText("highlight-comment-heading", "この祭りの見どころ");
    setText("highlight-comment-text", comment);
    section.hidden = false;
  }

  function relocateHighlightComment() {
    const section = byId("highlight-comment-section");
    const primaryInfo = document.querySelector(".primary-info");
    if (!section || !primaryInfo || !primaryInfo.parentElement) {
      return;
    }
    const nextSibling = primaryInfo.nextElementSibling;
    primaryInfo.parentElement.insertBefore(section, nextSibling);
  }

  function renderHayashiNote(note) {
    const section = byId("hayashi-section");

    if (!section) {
      return;
    }

    if (!note) {
      section.remove();
      return;
    }

    setText("hayashi-note", note);
    section.hidden = false;
  }

  function renderEventStatusDateText() {
    const text = eventStatusDateText[effectiveEventStatus] || eventStatusDateText.unconfirmed;
    const noteEl = byId("event-status-note");

    setText("dates-heading", text.heading(currentYear.year));

    if (!text.note) {
      noteEl.hidden = true;
      return;
    }

    noteEl.textContent = text.note;
    noteEl.hidden = false;
  }

  injectBrandMark();
  setText("festival-name", festival.name);
  setText("festival-prefecture", festival.prefecture);
  renderExperienceTag(festival.id);
  renderEventStatusDateText();
  setText("festival-dates", formatDateList(currentYear.dates));
  setText("event-status", eventStatusLabels[effectiveEventStatus] || "未確認");
  byId("event-status").className = `status-badge status-${effectiveEventStatus || "unknown"}`;
  renderHayashiNote(features.hayashiNote);

  const featureGrid = byId("feature-grid");
  featureItems.forEach(([label, value]) => {
    const badge = createFeatureBadge(label, value);
    featureGrid.append(badge);
    attachFeatureIcon(badge, label);
  });
  const highlightBadge = createNeutralFeatureBadge(
    "見どころ",
    highlightTimeLabels[features.highlightTime] || "未確認"
  );
  featureGrid.append(highlightBadge);
  attachFeatureIcon(highlightBadge, "見どころ");

  const accessList = byId("access-list");
  accessList.append(
    createDetailItem("開催地", festival.city),
    createDetailItem("最寄駅", festival.constantInfo.access.nearestStation),
    createDetailItem(
      "駐車場",
      parkingLabel(currentYear.access.hasParking),
      currentYear.access.parkingNote
    )
  );

  renderHighlightComment(festival.constantInfo.highlightComment);
  relocateHighlightComment();
  renderAtmosphereMedia(festival.constantInfo.atmosphereMedia);
  applyHeroHeader(festival.constantInfo.backgroundImage);
  renderMapReference(festival.constantInfo.mapReference);

  byId("constant-sources").append(
    createSourceBlock("恒常情報", festival.constantInfo.confirmation)
  );
  byId("yearly-sources").append(
    createSourceBlock(`${currentYear.year}年情報`, currentYear.confirmation)
  );

  const schemaEventStatus = {
    confirmed: "https://schema.org/EventScheduled",
    scheduled_pending_official: "https://schema.org/EventScheduled",
    off_year: "https://schema.org/EventScheduled",
    unconfirmed: "https://schema.org/EventScheduled",
    postponed: "https://schema.org/EventPostponed",
    cancelled: "https://schema.org/EventCancelled",
    ended: "https://schema.org/EventScheduled"
  };

  const SEARCH_LINK_ICONS = {
    youtube:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="10,8.5 10,15.5 16,12"/></svg>',
    instagram:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="5"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>'
  };

  function normalizeForHashtag(text) {
    return text
      .replace(/[\s　]/g, "")
      .replace(/[()（）]/g, "")
      .replace(/[・･]/g, "")
      .replace(/[「」『』]/g, "")
      .replace(/[!！?？]/g, "");
  }

  function buildSearchLinkServices(festival) {
    const query = festival.constantInfo.searchQuery || festival.name;
    const hashtag = normalizeForHashtag(query);

    return [
      {
        key: "youtube",
        label: "YouTube",
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
      },
      {
        key: "instagram",
        label: "Instagram",
        url: `https://www.instagram.com/explore/tags/${encodeURIComponent(hashtag)}/`
      }
    ];
  }

  function renderSearchLinks(festival) {
    const featuresHeading = byId("features-heading");
    const anchor = featuresHeading ? featuresHeading.closest("section") : null;
    const pageShell = document.querySelector(".page-shell");
    if (!pageShell) return;

    const section = document.createElement("section");
    section.className = "info-section search-links-section";
    section.setAttribute("aria-labelledby", "search-links-heading");

    const hasAtmosphereMedia =
      Array.isArray(festival.constantInfo.atmosphereMedia) &&
      festival.constantInfo.atmosphereMedia.length > 0;

    const heading = document.createElement("h2");
    heading.id = "search-links-heading";
    heading.textContent = hasAtmosphereMedia ? "もっと雰囲気を感じる" : "雰囲気を感じる";

    const row = document.createElement("div");
    row.className = "search-link-row";

    buildSearchLinkServices(festival).forEach((service) => {
      const link = document.createElement("a");
      link.className = `search-link-button search-link-${service.key}`;
      link.href = service.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const icon = document.createElement("span");
      icon.className = "search-link-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = SEARCH_LINK_ICONS[service.key];

      const label = document.createElement("span");
      label.className = "search-link-label";
      label.textContent = service.label;

      link.append(icon, label);
      row.append(link);
    });

    const disclaimer = document.createElement("p");
    disclaimer.className = "search-link-disclaimer";
    disclaimer.textContent = "外部サイトの検索結果が開きます";

    section.append(heading, row, disclaimer);

    if (anchor && anchor.parentElement) {
      anchor.parentElement.insertBefore(section, anchor);
    } else {
      pageShell.append(section);
    }
  }

  function buildEventLocation(festival) {
    const mapReference = festival.constantInfo.mapReference;
    const address = `${festival.prefecture}${festival.city}`;

    if (mapReference) {
      const location = {
        "@type": "Place",
        name: mapReference.label,
        address
      };
      if (typeof mapReference.lat === "number" && typeof mapReference.lng === "number") {
        location.geo = {
          "@type": "GeoCoordinates",
          latitude: mapReference.lat,
          longitude: mapReference.lng
        };
      }
      return location;
    }

    return {
      "@type": "Place",
      name: festival.city,
      address
    };
  }

  function buildEventDescription(festival) {
    const highlight = festival.constantInfo.highlightComment;
    const baseDescription = highlight ||
      `${festival.prefecture}${festival.city}で開催される${festival.name}。${festival.constantInfo.schedulePattern}`;
    if (currentYear.eventStatus === "off_year") {
      return `${baseDescription} ${currentYear.year}年は陰祭年で、本祭りは隔年開催です。`;
    }
    return baseDescription;
  }

  function buildEventJsonLd(festival, yearlyInfo) {
    const dates = Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
    if (dates.length === 0) {
      return null;
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    const url = canonical ? canonical.href : undefined;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: festival.name,
      startDate: dates[0],
      endDate: dates[dates.length - 1],
      eventStatus: schemaEventStatus[yearlyInfo.eventStatus] || "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: buildEventLocation(festival),
      description: buildEventDescription(festival)
    };

    if (url) {
      jsonLd.url = url;
    }

    return jsonLd;
  }

  function injectEventJsonLd(festival, yearlyInfo) {
    try {
      const jsonLd = buildEventJsonLd(festival, yearlyInfo);
      if (!jsonLd) return;

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    } catch (err) {
      console.warn("[festival-detail] schema.org/Event JSON-LDの生成に失敗", err);
    }
  }

  injectEventJsonLd(festival, currentYear);
  renderSearchLinks(festival);
})();
