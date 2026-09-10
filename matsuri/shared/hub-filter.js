(function () {
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

  function passesArea(item, value) {
    if (!value) return true;
    if (value.startsWith("region:")) {
      return (REGION_PREFECTURES[value.slice(7)] || []).includes(item.dataset.area);
    }
    return item.dataset.area === value;
  }

  function passesFeature(item, value) {
    if (!value) return true;
    return (item.dataset.featureKeys || "").split(",").includes(value);
  }

  function passesMonth(item, value) {
    if (!value) return true;
    return (item.dataset.months || "").split(",").includes(value);
  }

  function init() {
    const list = document.querySelector(".festival-list");
    if (!list) return;
    const areaFilter = document.getElementById("hub-area-filter");
    const featureFilter = document.getElementById("hub-feature-filter");
    const monthFilter = document.getElementById("hub-month-filter");
    if (!areaFilter && !featureFilter && !monthFilter) return;

    const items = Array.from(list.querySelectorAll(".festival-item"));
    const total = items.length;
    const countText = document.getElementById("hub-count-text");

    function apply() {
      let visibleCount = 0;
      items.forEach((item) => {
        const visible =
          passesArea(item, areaFilter ? areaFilter.value : "") &&
          passesFeature(item, featureFilter ? featureFilter.value : "") &&
          passesMonth(item, monthFilter ? monthFilter.value : "");
        item.style.display = visible ? "" : "none";
        if (visible) visibleCount += 1;
      });
      if (countText) {
        countText.textContent = visibleCount === total
          ? `${total}件を掲載中`
          : `${total}件中${visibleCount}件を表示`;
      }
      [areaFilter, featureFilter, monthFilter].forEach((el) => {
        if (el) el.classList.toggle("is-filtering", el.value !== "");
      });
    }

    [areaFilter, featureFilter, monthFilter].forEach((el) => {
      if (el) el.addEventListener("change", apply);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
