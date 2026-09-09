(function () {
  const festival = FESTIVAL;
  const currentYear = festival.yearlyInfo[0];
  const features = festival.constantInfo.features;
  const LOCALE = document.documentElement.lang === "en" ? "en" : "ja";
  const EN = LOCALE === "en" && typeof UI_STRINGS_EN !== "undefined" ? UI_STRINGS_EN : null;
  const translation = LOCALE === "en" && typeof FESTIVAL_TRANSLATION_EN !== "undefined"
    ? FESTIVAL_TRANSLATION_EN
    : null;
  const festivalName = translation?.name || festival.name;
  const festivalOfficialName = translation?.officialName || festival.officialName;
  const festivalPrefecture = translation?.location?.prefecture || festival.prefecture;
  const festivalCity = translation?.location?.city || festival.city;
  const festivalHighlightComment = translation?.highlightComment || festival.constantInfo.highlightComment;
  const festivalHayashiNote = translation && Object.prototype.hasOwnProperty.call(translation, "hayashiNote")
    ? translation.hayashiNote
    : features.hayashiNote;
  const festivalNearestStation = translation?.access?.nearestStation || festival.constantInfo.access.nearestStation;
  const festivalParkingNote = translation?.access?.parkingNote || currentYear.access.parkingNote;
  const festivalMapReference = festival.constantInfo.mapReference
    ? {
        ...festival.constantInfo.mapReference,
        label: translation?.mapReference?.label || festival.constantInfo.mapReference.label,
        note: translation?.mapReference?.note || festival.constantInfo.mapReference.note
      }
    : null;
  const festivalSchedule = translation?.schedule || currentYear.schedule;
  const sharedBasePath = LOCALE === "en" ? "../../../shared" : "../../shared";

  const eventStatusLabels = {
    confirmed: "開催確認済み",
    scheduled_pending_official: "開催予定・公式詳細待ち",
    off_year: "陰祭年（本祭なし）",
    unconfirmed: "未確認",
    cancelled: "中止",
    postponed: "延期",
    ended: "終了"
  };
  Object.assign(eventStatusLabels, EN?.eventStatusLabels || {});

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
  Object.assign(eventStatusDateText, EN?.eventStatusDateText || {});

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
  Object.assign(highlightTimeLabels, EN?.highlightTimeLabels || {});

  const FEATURE_ICON_FILES = {
    dashi: "dashi",
    mikoshi: "mikoshi",
    odori: "odori",
    hikimawashi: "hikimawashi",
    highlights: "midokoro"
  };

  const iconCache = new Map();

  const FEATURE_DEFS = [
    { key: "dashi", ja: "山車", value: features.hasDashi },
    { key: "mikoshi", ja: "神輿", value: features.hasMikoshi },
    { key: "odori", ja: "踊り", value: features.hasDanceOnDashi },
    { key: "hikimawashi", ja: "曳き回し", value: features.hasParade }
  ];

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, text) {
    byId(id).textContent = text;
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

  async function loadExperienceTags() {
    try {
      const res = await fetch(`${sharedBasePath}/experience-tags.js`);
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
    chip.textContent = EN?.experienceTags?.[label] || label;
    prefectureEl.insertAdjacentElement("afterend", chip);
  }

  async function loadPrefectureHubSlugs() {
    try {
      const res = await fetch(`${sharedBasePath}/prefecture-hub-slugs.js`);
      if (!res.ok) return [];
      const src = await res.text();
      const factory = new Function(`${src}\nreturn PREFECTURE_HUB_SLUGS;`);
      return factory();
    } catch (err) {
      console.warn("[festival-detail] prefecture-hub-slugs.jsの読み込みに失敗", err);
      return [];
    }
  }

  async function loadIconSvg(key) {
    const file = FEATURE_ICON_FILES[key];
    if (!file) return null;
    if (iconCache.has(file)) return iconCache.get(file);
    const promise = fetch(`${sharedBasePath}/icons/${file}.svg`)
      .then((res) => (res.ok ? res.text() : null))
      .catch(() => null);
    iconCache.set(file, promise);
    return promise;
  }

  async function attachFeatureIcon(item, key) {
    const svgText = await loadIconSvg(key);
    if (!svgText) return;
    const wrap = document.createElement("span");
    wrap.className = "feature-icon";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = svgText;
    item.prepend(wrap);
  }

  function formatDate(dateText) {
    const date = new Date(`${dateText}T00:00:00+09:00`);
    return new Intl.DateTimeFormat(
      LOCALE === "en" ? "en-US" : "ja-JP",
      LOCALE === "en"
        ? { year: "numeric", month: "short", day: "numeric", weekday: "short" }
        : { year: "numeric", month: "numeric", day: "numeric", weekday: "short" }
    ).format(date);
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

    if (runs.length > 4) {
      if (LOCALE === "en") {
        return `${formatDate(dates[0])}${EN.labels.dateRangeSeparator}${formatDate(dates[dates.length - 1])} (${EN.labels.multipleDateCount(dates.length)})`;
      }
      return `${formatDate(dates[0])}〜${formatDate(dates[dates.length - 1])}（全${dates.length}回）`;
    }

    return runs
      .map((run) => {
        if (run.length < 2) return formatDate(run[0]);
        const separator = LOCALE === "en" ? EN.labels.dateRangeSeparator : "〜";
        return `${formatDate(run[0])}${separator}${formatDate(run[run.length - 1])}`;
      })
      .join(LOCALE === "en" ? EN.labels.dateListSeparator : " / ");
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
      return { label: EN?.availability?.yes || "あり", className: "is-yes" };
    }
    if (value === false) {
      return { label: EN?.availability?.no || "なし", className: "is-no" };
    }
    if (value === "n/a") {
      return { label: EN?.availability?.na || "該当なし", className: "is-na" };
    }
    return { label: EN?.availability?.unknown || "未確認", className: "is-unknown" };
  }

  function createSourceBlock(title, confirmation, category) {
    const fragment = document.createDocumentFragment();

    const titleEl = document.createElement("p");
    titleEl.className = "source-title";
    titleEl.textContent = title;

    const metaEl = document.createElement("p");
    metaEl.className = "source-meta";
    metaEl.textContent = EN?.labels?.confirmedDate
      ? EN.labels.confirmedDate(confirmation.confirmedDate)
      : `確認日：${confirmation.confirmedDate}`;

    const listEl = document.createElement("ul");
    listEl.className = "source-list";

    confirmation.sources.forEach((source) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = source;
      link.textContent = source;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.addEventListener("click", () => {
        // 暫定名称：official_site_clickは出典・情報源リンク全般が対象で、公式サイト専用ではない。
        // 出典種別はデータに構造化フィールドがないため、推測せずunknownを送る。
        sendGaEvent("official_site_click", {
          festival_slug: festival.id,
          festival_name: festivalName,
          source_type: "unknown",
          source_label: category,
          link_url: link.href
        });
      });
      item.append(link);
      listEl.append(item);
    });

    fragment.append(titleEl, metaEl, listEl);

    if (confirmation.note && LOCALE !== "en") {
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
      setText(
        "atmosphere-media-notice",
        EN?.labels?.pastAtmosphere
          ? EN.labels.pastAtmosphere(media.publishedYear)
          : `過去開催時の様子（${media.publishedYear}年）`
      );
      setText(
        "atmosphere-media-meta",
        EN?.labels?.mediaMeta
          ? EN.labels.mediaMeta(media.publisher, media.checkedDate)
          : `公開元：${media.publisher} ／ 確認日：${media.checkedDate}`
      );

      const mediaLink = byId("atmosphere-media-link");
      mediaLink.href = media.url;

      if (media.type === "youtube") {
        mediaLink.addEventListener("click", () => {
          sendGaEvent("atmosphere_youtube_click", {
            festival_slug: festival.id,
            festival_name: festivalName,
            content_id: media.contentId,
            link_url: mediaLink.href
          });
        });

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

    const backLinkAnchor = backLink.querySelector("a");
    if (backLinkAnchor) {
      backLinkAnchor.href = LOCALE === "en" ? "../../../" : "../../";
    }

    const mark = document.createElement("p");
    mark.className = "brand-mark";

    const link = document.createElement("a");
    link.href = LOCALE === "en" ? "../../../" : "../../";
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
    if (!media || media.type !== "youtube") {
      return;
    }

    header.classList.add("has-hero");

    const background = document.createElement("div");
    background.className = "hero-background";
    background.style.backgroundImage = `url(https://i.ytimg.com/vi/${media.contentId}/hqdefault.jpg)`;
    header.prepend(background);
  }

  function createAtmosphereMediaGalleryItem(media) {
    const item = document.createElement("div");
    item.className = "media-gallery-item";

    const thumb = document.createElement("button");
    thumb.className = "media-gallery-thumb";
    thumb.type = "button";
    thumb.setAttribute(
      "aria-label",
      EN?.labels?.playVideo ? EN.labels.playVideo(media.title) : `動画を再生：${media.title}`
    );

    const image = document.createElement("img");
    image.src = `https://i.ytimg.com/vi/${media.contentId}/hqdefault.jpg`;
    image.alt = "";
    image.loading = "lazy";

    const playIcon = document.createElement("span");
    playIcon.className = "media-gallery-play-icon";
    playIcon.setAttribute("aria-hidden", "true");

    thumb.append(image, playIcon);

    thumb.addEventListener("click", () => {
      sendGaEvent("atmosphere_youtube_click", {
        festival_slug: festival.id,
        festival_name: festivalName,
        content_id: media.contentId,
        link_url: `https://www.youtube.com/watch?v=${media.contentId}`
      });

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
    caption.textContent = EN?.labels?.pastAtmosphere
      ? EN.labels.pastAtmosphere(media.publishedYear)
      : `過去開催時の様子（${media.publishedYear}年）`;

    const meta = document.createElement("p");
    meta.className = "media-gallery-meta";
    meta.textContent = EN?.labels?.mediaMeta
      ? EN.labels.mediaMeta(media.publisher, media.checkedDate)
      : `${media.publisher} ／ 確認日：${media.checkedDate}`;

    const link = document.createElement("a");
    link.className = "media-gallery-link";
    link.href = media.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = EN?.labels?.youtubeLink || "YouTubeで見る →";
    link.addEventListener("click", () => {
      sendGaEvent("atmosphere_youtube_click", {
        festival_slug: festival.id,
        festival_name: festivalName,
        content_id: media.contentId,
        link_url: link.href
      });
    });

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

  function buildOsmEmbedUrl(lat, lng) {
    const delta = 0.006;
    const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(",");
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;
  }

  function renderMapReference(mapReference, festivalName) {
    const section = byId("map-section");

    if (!section) {
      return;
    }

    if (!mapReference) {
      section.remove();
      return;
    }

    try {
      const mapFrame = byId("map-frame");
      mapFrame.replaceChildren();
      const hasCoordinates = typeof mapReference.lat === "number" && typeof mapReference.lng === "number";
      mapFrame.hidden = !hasCoordinates;
      if (hasCoordinates) {
        const iframe = document.createElement("iframe");
        iframe.className = "map-preview";
        iframe.src = buildOsmEmbedUrl(mapReference.lat, mapReference.lng);
        iframe.title = `${festivalName}の地図`;
        iframe.loading = "lazy";
        mapFrame.append(iframe);
      }
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

    setText(
      "highlight-comment-heading",
      EN?.labels?.highlightCommentHeading || "この祭りの見どころ"
    );
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

  function renderSchedule(schedule) {
    const section = byId("schedule-section");
    if (!section) return;

    if (!Array.isArray(schedule) || schedule.length === 0) {
      section.remove();
      return;
    }

    const container = byId("schedule-list-container");
    if (!container) {
      section.remove();
      return;
    }

    schedule.forEach((day) => {
      const dayBlock = document.createElement("div");
      dayBlock.className = "schedule-day";

      const heading = document.createElement("h3");
      heading.textContent = day.dayLabel
        ? `${formatDate(day.date)}${EN?.labels?.scheduleHeadingSeparator || "　"}${day.dayLabel}`
        : formatDate(day.date);
      dayBlock.append(heading);

      const list = document.createElement("ul");
      list.className = "schedule-list";
      (day.items || []).forEach((item) => {
        const li = document.createElement("li");
        const time = document.createElement("span");
        time.className = "schedule-time";
        time.textContent = item.time;
        const label = document.createElement("span");
        label.className = "schedule-label";
        label.textContent = item.label;
        li.append(time, label);
        list.append(li);
      });
      dayBlock.append(list);
      container.append(dayBlock);
    });

    section.hidden = false;
  }

  function buildDateFaqAnswer(yearlyInfo) {
    const year = yearlyInfo.year;
    const dates = Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
    const dateText = dates.length > 0 ? formatDateList(dates) : null;

    if (yearlyInfo.eventStatus === "off_year") {
      if (EN?.faq?.offYearAnswer) return EN.faq.offYearAnswer(year);
      return `${year}年は陰祭り（本祭なし）です。`;
    }
    if (!dateText) {
      if (EN?.faq?.dateUnannouncedAnswer) return EN.faq.dateUnannouncedAnswer(year);
      return `${year}年の日程はまだ発表されていません。`;
    }
    if (yearlyInfo.eventStatus === "ended") {
      if (EN?.faq?.endedAnswer) return EN.faq.endedAnswer(dateText);
      return `${dateText}に開催されました。`;
    }
    if (yearlyInfo.eventStatus === "cancelled") {
      if (EN?.faq?.cancelledAnswer) return EN.faq.cancelledAnswer(dateText);
      return `${dateText}に開催予定でしたが、中止となりました。`;
    }
    if (yearlyInfo.eventStatus === "postponed") {
      if (EN?.faq?.postponedAnswer) return EN.faq.postponedAnswer(dateText);
      return `${dateText}に開催予定でしたが、延期となりました。新しい日程は公式情報をご確認ください。`;
    }
    if (yearlyInfo.eventStatus === "confirmed") {
      if (EN?.faq?.confirmedAnswer) return EN.faq.confirmedAnswer(dateText);
      return `${dateText}に開催されます。`;
    }
    if (EN?.faq?.scheduledAnswer) return EN.faq.scheduledAnswer(dateText);
    return `${dateText}に開催予定です。公式の詳細発表をお待ちください。`;
  }

  function buildParkingFaqAnswer(yearlyInfo) {
    const year = yearlyInfo.year;
    const access = yearlyInfo.access || {};
    let answer;
    if (access.hasParking === true) {
      answer = EN?.faq?.parkingYesAnswer
        ? EN.faq.parkingYesAnswer(year)
        : `${year}年は駐車場があります。`;
    } else if (access.hasParking === false) {
      answer = EN?.faq?.parkingNoAnswer
        ? EN.faq.parkingNoAnswer(year)
        : `${year}年は駐車場はありません。`;
    } else {
      answer = EN?.faq?.parkingUnknownAnswer
        ? EN.faq.parkingUnknownAnswer(year)
        : `${year}年の駐車場情報は未確認です。`;
    }
    const parkingNote = LOCALE === "en" ? festivalParkingNote : access.parkingNote;
    if (!parkingNote) return answer;
    return LOCALE === "en" ? `${answer} ${parkingNote}` : `${answer}${parkingNote}`;
  }

  function buildFaqItems(currentFestival, yearlyInfo) {
    const station = currentFestival.constantInfo.access.nearestStation;
    return [
      {
        question: EN?.faq?.dateQuestion
          ? EN.faq.dateQuestion(festivalName, yearlyInfo.year)
          : `${currentFestival.name}は${yearlyInfo.year}年いつ開催されますか？`,
        answer: buildDateFaqAnswer(yearlyInfo)
      },
      {
        question: EN?.faq?.parkingQuestion
          ? EN.faq.parkingQuestion(festivalName)
          : `${currentFestival.name}に駐車場はありますか？`,
        answer: buildParkingFaqAnswer(yearlyInfo)
      },
      {
        question: EN?.faq?.stationQuestion
          ? EN.faq.stationQuestion(festivalName)
          : `${currentFestival.name}の最寄り駅はどこですか？`,
        answer: station
          ? (EN?.faq?.stationAnswer
              ? EN.faq.stationAnswer(festivalNearestStation)
              : `最寄り駅・アクセス拠点は${station}です。`)
          : (EN?.labels?.nearestStationUnknown || "最寄り駅・アクセス拠点は未確認です。")
      }
    ];
  }

  function renderFaq(currentFestival, yearlyInfo) {
    const section = byId("faq-section");
    if (!section) return;
    const container = byId("faq-list");
    if (!container) return;

    buildFaqItems(currentFestival, yearlyInfo).forEach((item) => {
      const block = document.createElement("div");
      block.className = "faq-item";
      const question = document.createElement("h3");
      question.textContent = item.question;
      const answer = document.createElement("p");
      answer.textContent = item.answer;
      block.append(question, answer);
      container.append(block);
    });
  }

  function renderMonthHubLink(currentFestival, yearlyInfo) {
    if (LOCALE === "en") return;
    const MONTH_HUB_SLUGS = { 7: "july", 8: "august", 9: "september" };
    const MONTH_HUB_LABELS = { 7: "7月", 8: "8月", 9: "9月" };
    const dates = Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
    if (dates.length === 0) return;
    const month = Number(dates[0].slice(5, 7));
    const slug = MONTH_HUB_SLUGS[month];
    if (!slug) return;

    const anchor = byId("faq-section");
    if (!anchor) return;

    const p = document.createElement("p");
    p.className = "month-hub-link";
    const a = document.createElement("a");
    a.href = `../../months/${slug}/`;
    a.textContent = `${MONTH_HUB_LABELS[month]}の祭りをもっと見る`;
    p.append(a);
    anchor.insertAdjacentElement("afterend", p);
  }

  async function renderPrefectureHubLink(currentFestival) {
    if (LOCALE === "en") return;
    const areaTag = currentFestival.areaTag;
    if (!areaTag) return;
    const hubSlugs = new Set(await loadPrefectureHubSlugs());
    if (!hubSlugs.has(areaTag)) return;

    const prefectureLabel = currentFestival.prefecture || "";
    const anchor = document.querySelector(".month-hub-link") || byId("faq-section");
    if (!anchor) return;

    const p = document.createElement("p");
    p.className = "prefecture-hub-link";
    const a = document.createElement("a");
    a.href = `../../prefectures/${areaTag}/`;
    a.textContent = `${prefectureLabel}の祭りをもっと見る`;
    p.append(a);
    anchor.insertAdjacentElement("afterend", p);
  }

  function buildLodgingUrl(currentFestival) {
    const config = typeof LODGING_CTA_CONFIG !== "undefined"
      ? LODGING_CTA_CONFIG
      : { mode: "plain", affiliateUrls: {} };

    const affiliateUrl = config.affiliateUrls && config.affiliateUrls[currentFestival.id];
    if (config.mode === "affiliate" && affiliateUrl) {
      return { url: affiliateUrl, linkType: "affiliate" };
    }

    const query = encodeURIComponent(`${currentFestival.prefecture}${currentFestival.city}`);
    const url = `https://kw.travel.rakuten.co.jp/keyword/Search.do?charset=utf-8&f_max=30&l-id=topC_search_keyword&f_query=${query}`;
    return { url, linkType: "plain" };
  }

  function renderLodgingCta(currentFestival) {
    const section = byId("lodging-section");
    if (!section) return;

    const link = byId("lodging-link");
    if (!link) return;

    const { url, linkType } = buildLodgingUrl(currentFestival);

    link.href = url;
    link.addEventListener("click", () => {
      sendGaEvent("lodging_cta_click", {
        festival_slug: currentFestival.id,
        festival_name: festivalName,
        link_url: url,
        link_type: linkType
      });
    });

    section.hidden = false;
  }

  async function loadRelatedFestival(slug) {
    try {
      const response = await fetch(`../${slug}/data.js`);
      if (!response.ok) return null;
      const source = await response.text();
      const factory = new Function(`${source}\nreturn FESTIVAL;`);
      const relatedFestival = factory();
      return {
        festival: relatedFestival,
        yearlyInfo: relatedFestival.yearlyInfo[0]
      };
    } catch (err) {
      console.warn(`[festival-detail] 関連祭りの読み込みに失敗: ${slug}`, err);
      return null;
    }
  }

  function getEventMonth(yearlyInfo) {
    const dates = yearlyInfo && Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
    const match = dates[0] && dates[0].match(/^\d{4}-(\d{2})-/);
    return match ? Number(match[1]) : null;
  }

  function selectRelatedFestivals(items, currentFestival, currentYearlyInfo) {
    const candidates = items.filter((item) => {
      return item && item.festival.id !== currentFestival.id;
    });
    const sameArea = candidates.filter((item) => {
      return item.festival.areaTag === currentFestival.areaTag;
    });
    if (sameArea.length > 0) {
      return {
        items: sameArea.slice(0, 3),
        reason: { type: "area", label: `${currentFestival.prefecture}の祭り` }
      };
    }

    const currentMonth = getEventMonth(currentYearlyInfo);
    if (!currentMonth) return { items: [], reason: null };
    const sameMonth = candidates.filter((item) => getEventMonth(item.yearlyInfo) === currentMonth);
    return {
      items: sameMonth.slice(0, 3),
      reason: { type: "month", label: `${currentMonth}月開催の祭り` }
    };
  }

  function formatStartDate(dates) {
    if (!dates || dates.length === 0) return "日程未確認";
    return dates.length > 1 ? `${formatDate(dates[0])}〜` : formatDate(dates[0]);
  }

  async function renderRelatedFestivals(currentFestival, currentYearlyInfo) {
    const section = byId("related-festivals-section");
    const list = byId("related-festivals-list");
    if (LOCALE === "en") return;
    if (!section || !list || typeof FESTIVAL_SLUGS === "undefined") return;

    const loaded = await Promise.all(FESTIVAL_SLUGS.map(loadRelatedFestival));
    const { items: relatedItems, reason } = selectRelatedFestivals(loaded, currentFestival, currentYearlyInfo);
    if (relatedItems.length === 0) return;

    relatedItems.forEach((item) => {
      const link = document.createElement("a");
      link.className = "feature-badge related-festival-link";
      link.href = `../${item.festival.id}/`;

      const text = document.createElement("span");
      text.className = "feature-badge-text";

      const reasonLabel = document.createElement("strong");
      reasonLabel.textContent = reason.label;

      const name = document.createElement("span");
      name.textContent = item.festival.name;

      const dateLabel = document.createElement("span");
      dateLabel.className = "related-festival-date";
      const dates = Array.isArray(item.yearlyInfo.dates) ? item.yearlyInfo.dates : [];
      dateLabel.textContent = formatStartDate(dates);

      text.append(reasonLabel, name, dateLabel);
      link.append(text);
      list.append(link);
    });
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
  setText("festival-name", festivalName);
  setText(
    "festival-prefecture",
    LOCALE === "en"
      ? `${festivalCity}, ${festivalPrefecture}`
      : `${festival.prefecture}${festival.city || ""}`
  );
  renderExperienceTag(festival.id);
  renderEventStatusDateText();
  setText("festival-dates", formatDateList(currentYear.dates));
  setText(
    "event-status",
    eventStatusLabels[effectiveEventStatus] || EN?.availability?.unknown || "未確認"
  );
  byId("event-status").className = `status-badge status-${effectiveEventStatus || "unknown"}`;
  renderHayashiNote(festivalHayashiNote);
  renderSchedule(festivalSchedule);

  const featureGrid = byId("feature-grid");
  FEATURE_DEFS.forEach((def) => {
    const label = EN?.featureLabels?.[def.key] || def.ja;
    const badge = createFeatureBadge(label, def.value);
    featureGrid.append(badge);
    attachFeatureIcon(badge, def.key);
  });
  const highlightBadge = createNeutralFeatureBadge(
    EN?.featureLabels?.highlights || "見どころ",
    highlightTimeLabels[features.highlightTime] || EN?.availability?.unknown || "未確認"
  );
  featureGrid.append(highlightBadge);
  attachFeatureIcon(highlightBadge, "highlights");

  const accessList = byId("access-list");
  accessList.append(
    createDetailItem(EN?.labels?.venue || "開催地", festivalCity),
    createDetailItem(EN?.labels?.nearestStation || "最寄駅", festivalNearestStation),
    createDetailItem(
      EN?.labels?.parking || "駐車場",
      parkingLabel(currentYear.access.hasParking),
      festivalParkingNote
    )
  );

  renderHighlightComment(festivalHighlightComment);
  relocateHighlightComment();
  renderAtmosphereMedia(festival.constantInfo.atmosphereMedia);
  applyHeroHeader(festival.constantInfo.backgroundImage);
  renderMapReference(festivalMapReference, festivalName);
  renderRelatedFestivals(festival, currentYear);
  renderFaq(festival, currentYear);
  renderMonthHubLink(festival, currentYear);
  renderPrefectureHubLink(festival);
  renderLodgingCta(festival);

  byId("constant-sources").append(
    createSourceBlock(
      EN?.labels?.constantSourceTitle || "恒常情報",
      festival.constantInfo.confirmation,
      "constant"
    )
  );
  byId("yearly-sources").append(
    createSourceBlock(
      EN?.labels?.yearlySourceTitle
        ? EN.labels.yearlySourceTitle(currentYear.year)
        : `${currentYear.year}年情報`,
      currentYear.confirmation,
      `yearly_${currentYear.year}`
    )
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
    const query = festival.constantInfo.searchQuery || festival.name;

    const heading = document.createElement("h2");
    heading.id = "search-links-heading";
    heading.textContent = hasAtmosphereMedia
      ? (EN?.labels?.atmosphereHeadingWith || "もっと雰囲気を感じる")
      : (EN?.labels?.atmosphereHeadingWithout || "雰囲気を感じる");

    const row = document.createElement("div");
    row.className = "search-link-row";

    buildSearchLinkServices(festival).forEach((service) => {
      const link = document.createElement("a");
      link.className = `search-link-button search-link-${service.key}`;
      link.href = service.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.addEventListener("click", () => {
        if (service.key === "youtube") {
          sendGaEvent("atmosphere_youtube_click", {
            festival_slug: festival.id,
            festival_name: festivalName,
            content_id: "",
            link_url: link.href
          });
        } else if (service.key === "instagram") {
          sendGaEvent("atmosphere_instagram_click", {
            festival_slug: festival.id,
            festival_name: festivalName,
            search_query: query,
            link_url: link.href
          });
        }
      });

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
    disclaimer.textContent = EN?.labels?.externalSearchDisclaimer || "外部サイトの検索結果が開きます";

    section.append(heading, row, disclaimer);

    if (anchor && anchor.parentElement) {
      anchor.parentElement.insertBefore(section, anchor);
    } else {
      pageShell.append(section);
    }
  }

  function buildEventLocation(festival) {
    const mapReference = festival.constantInfo.mapReference;
    const address = LOCALE === "en"
      ? `${festivalCity}, ${festivalPrefecture}`
      : `${festival.prefecture}${festival.city}`;

    if (mapReference) {
      const location = {
        "@type": "Place",
        name: festivalMapReference?.label || mapReference.label,
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
      name: festivalCity,
      address
    };
  }

  function buildEventDescription(festival) {
    const highlight = festivalHighlightComment;
    const baseDescription = highlight ||
      (EN?.jsonLd?.fallbackDescription
        ? EN.jsonLd.fallbackDescription(
            festivalPrefecture,
            festivalCity,
            festivalName,
            festival.constantInfo.schedulePattern
          )
        : `${festival.prefecture}${festival.city}で開催される${festival.name}。${festival.constantInfo.schedulePattern}`);
    if (currentYear.eventStatus === "off_year") {
      if (EN?.jsonLd?.offYearDescription) {
        return EN.jsonLd.offYearDescription(baseDescription, currentYear.year);
      }
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

  function getLatestConfirmedDate(currentFestival, yearlyInfo) {
    const dates = [
      currentFestival.constantInfo.confirmation?.confirmedDate,
      yearlyInfo.confirmation?.confirmedDate
    ].filter((date) => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date));
    dates.sort();
    return dates[dates.length - 1] || null;
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
      name: festivalName,
      startDate: dates[0],
      endDate: dates[dates.length - 1],
      eventStatus: schemaEventStatus[yearlyInfo.eventStatus] || "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: buildEventLocation(festival),
      description: buildEventDescription(festival)
    };

    if (LOCALE === "en") {
      jsonLd.inLanguage = "en";
    }

    if (url) {
      jsonLd.url = url;
    }

    const backgroundImage = festival.constantInfo.backgroundImage;
    if (backgroundImage?.type === "youtube" && backgroundImage.contentId) {
      jsonLd.image = `https://i.ytimg.com/vi/${backgroundImage.contentId}/hqdefault.jpg`;
    }

    const dateModified = getLatestConfirmedDate(festival, yearlyInfo);
    if (dateModified) {
      jsonLd.dateModified = dateModified;
    }

    const schedule = LOCALE === "en" ? festivalSchedule : yearlyInfo.schedule;
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

  function injectFaqJsonLd(currentFestival, yearlyInfo) {
    try {
      const faqItems = buildFaqItems(currentFestival, yearlyInfo);
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      };

      if (LOCALE === "en") {
        jsonLd.inLanguage = "en";
      }

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    } catch (err) {
      console.warn("[festival-detail] FAQPage JSON-LDの生成に失敗", err);
    }
  }

  injectEventJsonLd(festival, currentYear);
  injectFaqJsonLd(festival, currentYear);
  renderSearchLinks(festival);
})();
