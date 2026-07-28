(function () {
  const festival = FESTIVAL;
  const currentYear = festival.yearlyInfo[0];
  const features = festival.constantInfo.features;

  const eventStatusLabels = {
    confirmed: "開催確認済み",
    scheduled_pending_official: "開催予定・公式詳細待ち",
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

  function createFeatureBadge(label, value) {
    const item = document.createElement("div");
    item.className = "feature-badge";

    const labelEl = document.createElement("strong");
    labelEl.textContent = label;

    const valueEl = document.createElement("span");
    const state = availabilityState(value);

    item.classList.add(state.className);
    valueEl.textContent = state.label;

    item.append(labelEl, valueEl);
    return item;
  }

  function createNeutralFeatureBadge(label, value) {
    const item = document.createElement("div");
    item.className = "feature-badge is-neutral";

    const labelEl = document.createElement("strong");
    labelEl.textContent = label;

    const valueEl = document.createElement("span");
    valueEl.textContent = value;

    item.append(labelEl, valueEl);
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

    setText("highlight-comment-text", comment);
    section.hidden = false;
  }

  function renderEventStatusDateText() {
    const text = eventStatusDateText[currentYear.eventStatus] || eventStatusDateText.unconfirmed;
    const noteEl = byId("event-status-note");

    setText("dates-heading", text.heading(currentYear.year));

    if (!text.note) {
      noteEl.hidden = true;
      return;
    }

    noteEl.textContent = text.note;
    noteEl.hidden = false;
  }

  setText("festival-name", festival.name);
  setText("festival-prefecture", festival.prefecture);
  renderEventStatusDateText();
  setText("festival-dates", currentYear.dates.map(formatDate).join(" / "));
  setText("event-status", eventStatusLabels[currentYear.eventStatus] || "未確認");
  setText("hayashi-note", features.hayashiNote);

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
  renderAtmosphereMedia(festival.constantInfo.atmosphereMedia);
  renderMapReference(festival.constantInfo.mapReference);

  byId("constant-sources").append(
    createSourceBlock("恒常情報", festival.constantInfo.confirmation)
  );
  byId("yearly-sources").append(
    createSourceBlock(`${currentYear.year}年情報`, currentYear.confirmation)
  );
})();
