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

  const highlightTimeLabels = {
    morning: "朝",
    daytime: "昼",
    day: "昼",
    evening: "夕方",
    night: "夜",
    both: "昼・夜"
  };

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
    const media = mediaItems && mediaItems[0];

    if (!media) {
      section.remove();
      return;
    }

    setText(
      "atmosphere-media-notice",
      `参考：2026年の映像ではありません。掲載しているのは${media.publishedYear}年（${media.title}）の様子です。`
    );
    setText(
      "atmosphere-media-meta",
      `公開元：${media.publisher} ／ 確認日：${media.checkedDate}`
    );

    if (media.type === "youtube") {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${media.contentId}`;
      iframe.title = media.title;
      iframe.loading = "lazy";
      iframe.allow =
        "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      byId("atmosphere-media-frame").append(iframe);
      section.hidden = false;
    } else {
      section.remove();
    }
  }

  setText("festival-name", festival.name);
  setText("festival-prefecture", festival.prefecture);
  setText("festival-dates", currentYear.dates.map(formatDate).join(" / "));
  setText("event-status", eventStatusLabels[currentYear.eventStatus] || "未確認");
  setText("festival-city", festival.city);
  setText("highlight-time", highlightTimeLabels[features.highlightTime] || "未確認");
  setText("hayashi-note", features.hayashiNote);

  const featureGrid = byId("feature-grid");
  featureItems.forEach(([label, value]) => {
    featureGrid.append(createFeatureBadge(label, value));
  });

  const accessList = byId("access-list");
  accessList.append(
    createDetailItem("最寄駅", festival.constantInfo.access.nearestStation),
    createDetailItem(
      "駐車場",
      parkingLabel(currentYear.access.hasParking),
      currentYear.access.parkingNote
    )
  );

  renderAtmosphereMedia(festival.constantInfo.atmosphereMedia);

  byId("constant-sources").append(
    createSourceBlock("恒常情報", festival.constantInfo.confirmation)
  );
  byId("yearly-sources").append(
    createSourceBlock(`${currentYear.year}年情報`, currentYear.confirmation)
  );
})();
