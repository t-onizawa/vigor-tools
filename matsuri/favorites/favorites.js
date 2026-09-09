(function () {
  const FAVORITES_STORAGE_KEY = "matsuri-favorites";

  function getFavorites() {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  async function renderFavorites() {
    const list = document.getElementById("favorites-list");
    const count = document.getElementById("favorites-count");
    const empty = document.getElementById("favorites-empty");
    const api = window.__festivalList;
    if (!list || !count || !empty || !api) return;

    const slugs = getFavorites();
    if (slugs.length === 0) {
      list.replaceChildren();
      count.textContent = "0件";
      empty.hidden = false;
      return;
    }

    const festivals = await Promise.all(slugs.map((slug) => api.loadFestival(slug, "../festivals")));
    const items = festivals.filter(Boolean).map((festival) => ({
      festival,
      yearlyInfo: api.getPrimaryYearlyInfo(festival)
    })).filter((item) => item.yearlyInfo);
    list.replaceChildren(...items.map((item) => api.renderFestivalCard(item, "favorites")));
    count.textContent = `${items.length}件`;
    empty.hidden = items.length !== 0;
  }

  document.addEventListener("matsuri:favorites-changed", (event) => {
    if (!event.detail || event.detail.isFavorite !== false) return;
    const card = document.querySelector(`.favorite-heart[data-favorite-slug="${event.detail.slug}"]`)?.closest(".festival-item");
    if (card) card.remove();
    const remaining = document.querySelectorAll("#favorites-list .festival-item").length;
    const count = document.getElementById("favorites-count");
    const empty = document.getElementById("favorites-empty");
    if (count) count.textContent = `${remaining}件`;
    if (empty) empty.hidden = remaining !== 0;
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderFavorites);
  } else {
    renderFavorites();
  }
})();
