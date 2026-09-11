(function () {
  const MATSURI_MARKER = "matsuri";
  const FAVORITES_STORAGE_KEY = "matsuri-favorites";

  const FOOTER_REGIONS = [
    { slug: "kanto", ja: "関東", en: "Kanto" },
    { slug: "tohoku", ja: "東北", en: "Tohoku" },
    { slug: "chubu", ja: "中部", en: "Chubu" },
    { slug: "kinki", ja: "近畿", en: "Kinki" },
    { slug: "chugoku", ja: "中国", en: "Chugoku" },
    { slug: "shikoku", ja: "四国", en: "Shikoku" },
    { slug: "kyushu", ja: "九州", en: "Kyushu" }
  ];

  const FOOTER_FEATURES = [
    { slug: "dashi", ja: "山車", en: "Dashi floats" },
    { slug: "mikoshi", ja: "神輿", en: "Mikoshi" },
    { slug: "odori", ja: "踊り", en: "Dance" },
    { slug: "hikimawashi", ja: "曳き回し", en: "Parade" },
    { slug: "night", ja: "夜が見どころ", en: "Night highlights" }
  ];

  function getLocale() {
    return document.documentElement.lang === "en" ? "en" : "ja";
  }

  function getMatsuriSegments() {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const index = segments.indexOf(MATSURI_MARKER);
    if (index < 0) return [];
    return segments.slice(index + 1).filter((segment) => segment !== "index.html");
  }

  function relativeUrl(targetSegments) {
    const current = getMatsuriSegments();
    let common = 0;
    while (common < current.length && common < targetSegments.length && current[common] === targetSegments[common]) {
      common += 1;
    }
    const up = "../".repeat(current.length - common);
    const down = targetSegments.slice(common).join("/");
    return `${up}${down ? `${down}/` : ""}index.html`;
  }

  function relativeFile(targetSegments, fileName) {
    const current = getMatsuriSegments();
    let common = 0;
    while (common < current.length && common < targetSegments.length && current[common] === targetSegments[common]) {
      common += 1;
    }
    const up = "../".repeat(current.length - common);
    const down = targetSegments.slice(common).join("/");
    return `${up}${down ? `${down}/` : ""}${fileName}`;
  }

  function toHiragana(text) {
    return text.replace(/[ァ-ヶ]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0x60)
    );
  }

  function normalizeForSearch(text) {
    return toHiragana(String(text || "").toLowerCase());
  }

  function sendGaEvent(name, params) {
    try {
      if (typeof window.gtag === "function") window.gtag("event", name, params);
    } catch (err) {
      // 計測失敗は検索UIに影響させない
    }
  }

  function getFavorites() {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function isFavorite(slug) {
    return getFavorites().includes(slug);
  }

  function toggleFavorite(slug) {
    const current = getFavorites();
    const next = current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug];
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      return current.includes(slug);
    }
    return next.includes(slug);
  }

  function extractSlugFromHref(href) {
    const match = href.match(/festivals\/([^/]+)\/?(?:index\.html)?(?:[?#].*)?$/);
    return match ? match[1] : null;
  }

  function updateHeart(heart, slug) {
    const active = isFavorite(slug);
    heart.textContent = active ? "♥" : "♡";
    heart.classList.toggle("is-active", active);
    heart.setAttribute("aria-label", active ? "お気に入りから削除" : "お気に入りに追加");
  }

  function createFavoriteHeart(slug) {
    const heart = document.createElement("button");
    heart.type = "button";
    heart.className = "favorite-heart";
    heart.dataset.favoriteSlug = slug;
    updateHeart(heart, slug);
    heart.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const nowFavorite = toggleFavorite(slug);
      updateHeart(heart, slug);
      sendGaEvent("favorite_toggle", { festival_slug: slug, is_favorite: nowFavorite });
      document.dispatchEvent(new CustomEvent("matsuri:favorites-changed", {
        detail: { slug, isFavorite: nowFavorite }
      }));
    });
    return heart;
  }

  function attachHeartToCard(card) {
    const slug = extractSlugFromHref(card.getAttribute("href") || "");
    if (!slug || card.querySelector(".favorite-heart")) return;
    const heart = createFavoriteHeart(slug);
    card.classList.add("favorite-heart-anchor");
    card.append(heart);
  }

  function hydrateFavoriteHearts(root = document) {
    if (root instanceof Element && root.matches('a.festival-item[href*="festivals/"]')) {
      attachHeartToCard(root);
    }
    root.querySelectorAll?.('a.festival-item[href*="festivals/"]').forEach(attachHeartToCard);
  }

  function attachHeartToDetail() {
    const header = document.querySelector(".festival-header");
    if (!header || !document.getElementById("festival-name") || header.querySelector(".favorite-heart")) return;
    if (typeof FESTIVAL === "undefined" || !FESTIVAL.id) return;
    header.classList.add("favorite-heart-anchor");
    header.append(createFavoriteHeart(FESTIVAL.id));
  }

  function setupFavoriteHearts() {
    hydrateFavoriteHearts();
    attachHeartToDetail();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) hydrateFavoriteHearts(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("matsuri:favorites-changed", (event) => {
      const slug = event.detail && event.detail.slug;
      if (!slug) return;
      document.querySelectorAll(".favorite-heart").forEach((heart) => {
        if (heart.dataset.favoriteSlug === slug) updateHeart(heart, slug);
      });
    });
  }

  function getHomeUrl() {
    return relativeUrl(getLocale() === "en" ? ["en"] : []);
  }

  function getFavoritesUrl() {
    return relativeUrl(["favorites"]);
  }

  function getLabHomeUrl() {
    return `${"../".repeat(getMatsuriSegments().length + 1)}index.html`;
  }

  function getLanguageUrl() {
    if (getLocale() === "en") return relativeUrl([]);
    const alternate = document.querySelector('link[rel="alternate"][hreflang="en"]');
    if (alternate) {
      const segments = new URL(alternate.href, window.location.href).pathname.split("/").filter(Boolean);
      const matsuriIndex = segments.indexOf(MATSURI_MARKER);
      if (matsuriIndex >= 0) return relativeUrl(segments.slice(matsuriIndex + 1));
    }
    return relativeUrl(["en"]);
  }

  function isHomeContext() {
    const segments = getMatsuriSegments();
    if (segments.length === 0 || (segments.length === 1 && segments[0] === "en")) return true;
    return ["months", "regions", "prefectures", "features"].includes(segments[0]);
  }

  function createNavLink(label, icon, href, active) {
    const link = document.createElement("a");
    link.className = "site-nav-item";
    link.href = href;
    if (active) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
    const iconElement = document.createElement("span");
    iconElement.className = "site-nav-icon";
    iconElement.setAttribute("aria-hidden", "true");
    iconElement.textContent = icon;
    const labelElement = document.createElement("span");
    labelElement.className = "site-nav-label";
    labelElement.textContent = label;
    link.append(iconElement, labelElement);
    return link;
  }

  function createNavButton(label, icon) {
    const button = document.createElement("button");
    button.className = "site-nav-item";
    button.type = "button";
    const iconElement = document.createElement("span");
    iconElement.className = "site-nav-icon";
    iconElement.setAttribute("aria-hidden", "true");
    iconElement.textContent = icon;
    const labelElement = document.createElement("span");
    labelElement.className = "site-nav-label";
    labelElement.textContent = label;
    button.append(iconElement, labelElement);
    return button;
  }

  let searchIndexPromise = null;

  function loadSearchIndex() {
    if (typeof SEARCH_INDEX !== "undefined") return Promise.resolve(SEARCH_INDEX);
    if (searchIndexPromise) return searchIndexPromise;
    searchIndexPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = relativeFile(["shared"], "search-index.js?v=1");
      script.onload = () => {
        if (typeof SEARCH_INDEX !== "undefined") resolve(SEARCH_INDEX);
        else reject(new Error("検索インデックスを参照できません"));
      };
      script.onerror = () => reject(new Error("検索インデックスを読み込めません"));
      document.head.append(script);
    });
    return searchIndexPromise;
  }

  function formatSearchDate(dateText) {
    if (!dateText) return "日程未確認";
    const parts = dateText.split("-").map(Number);
    if (parts.length !== 3 || parts.some((value) => !Number.isFinite(value))) return "日程未確認";
    return `${parts[0]}年${parts[1]}月${parts[2]}日`;
  }

  function buildSearchModal(searchButton) {
    const overlay = document.createElement("div");
    overlay.id = "search-modal-overlay";
    overlay.className = "search-modal-overlay";
    overlay.hidden = true;

    const modal = document.createElement("div");
    modal.id = "search-modal";
    modal.className = "search-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "search-modal-title");

    const header = document.createElement("div");
    header.className = "search-modal-header";
    const title = document.createElement("h2");
    title.id = "search-modal-title";
    title.textContent = "祭りを検索";
    const closeButton = document.createElement("button");
    closeButton.id = "search-modal-close";
    closeButton.className = "search-modal-close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "閉じる");
    closeButton.textContent = "×";
    header.append(title, closeButton);

    const input = document.createElement("input");
    input.id = "search-modal-input";
    input.className = "search-modal-input";
    input.type = "text";
    input.placeholder = "祭り名・都道府県・市区町村で検索";
    input.autocomplete = "off";

    const results = document.createElement("div");
    results.id = "search-modal-results";
    results.className = "search-modal-results";
    const quicklinks = document.createElement("div");
    quicklinks.id = "search-modal-quicklinks";
    quicklinks.className = "search-modal-quicklinks";
    modal.append(header, input, results, quicklinks);
    overlay.append(modal);
    document.body.append(overlay);

    const quickLinkGroups = [
      {
        title: "見たいものから探す",
        links: [
          ["山車", ["features", "dashi"]],
          ["神輿", ["features", "mikoshi"]],
          ["踊り", ["features", "odori"]],
          ["曳き回し", ["features", "hikimawashi"]],
          ["夜が見どころ", ["features", "night"]]
        ]
      },
      {
        title: "開催時期から探す",
        links: [
          ["7月", ["months", "july"]],
          ["8月", ["months", "august"]],
          ["9月", ["months", "september"]]
        ]
      },
      {
        title: "エリアから探す",
        links: [
          ["関東", ["regions", "kanto"]],
          ["東北", ["regions", "tohoku"]],
          ["中部", ["regions", "chubu"]],
          ["近畿", ["regions", "kinki"]],
          ["中国", ["regions", "chugoku"]],
          ["四国", ["regions", "shikoku"]],
          ["九州", ["regions", "kyushu"]]
        ]
      }
    ];

    function renderQuicklinks() {
      const groups = quickLinkGroups.map((group) => {
        const section = document.createElement("section");
        section.className = "search-quicklink-group";
        const heading = document.createElement("h3");
        heading.textContent = group.title;
        const links = document.createElement("div");
        links.className = "search-quicklink-list";
        group.links.forEach(([label, target]) => {
          const link = document.createElement("a");
          link.href = relativeUrl(target);
          link.textContent = label;
          links.append(link);
        });
        section.append(heading, links);
        return section;
      });
      quicklinks.replaceChildren(...groups);
      quicklinks.hidden = false;
      results.replaceChildren();
    }

    function findMatches(rawQuery) {
      const query = normalizeForSearch(rawQuery);
      if (!query || typeof SEARCH_INDEX === "undefined") return [];
      return SEARCH_INDEX.filter((item) => {
        return [item.name, item.officialName, item.prefecture, item.city]
          .some((value) => normalizeForSearch(value).includes(query));
      }).slice(0, 8);
    }

    function renderResults(matches) {
      quicklinks.hidden = true;
      if (matches.length === 0) {
        const empty = document.createElement("p");
        empty.className = "search-modal-empty";
        empty.textContent = "該当する祭りが見つかりませんでした";
        results.replaceChildren(empty);
        return;
      }
      const links = matches.map((item) => {
        const link = document.createElement("a");
        link.className = "search-result-item";
        link.href = relativeUrl(["festivals", item.slug]);
        const name = document.createElement("strong");
        name.textContent = item.name;
        const meta = document.createElement("span");
        meta.textContent = `${item.prefecture}${item.city}・${formatSearchDate(item.firstDate)}`;
        link.append(name, meta);
        return link;
      });
      results.replaceChildren(...links);
    }

    let searchTimer = null;
    input.addEventListener("input", () => {
      const rawQuery = input.value;
      const searchQuery = rawQuery.trim();
      window.clearTimeout(searchTimer);
      if (!searchQuery) {
        renderQuicklinks();
        return;
      }
      const matches = findMatches(searchQuery);
      renderResults(matches);
      searchTimer = window.setTimeout(() => {
        sendGaEvent("site_search", { query: rawQuery, result_count: matches.length });
      }, 800);
    });

    function closeSearchModal() {
      window.clearTimeout(searchTimer);
      input.value = "";
      overlay.hidden = true;
      renderQuicklinks();
      searchButton.focus();
    }

    async function openSearchModal() {
      overlay.hidden = false;
      results.replaceChildren();
      quicklinks.hidden = true;
      try {
        await loadSearchIndex();
        renderQuicklinks();
      } catch (err) {
        const message = document.createElement("p");
        message.className = "search-modal-empty";
        message.textContent = "検索データを読み込めませんでした。時間をおいて再度お試しください。";
        results.replaceChildren(message);
      }
      closeButton.focus();
    }

    closeButton.addEventListener("click", closeSearchModal);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeSearchModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !overlay.hidden) closeSearchModal();
    });
    searchButton.addEventListener("click", openSearchModal);
  }

  function buildFooter(locale) {
    if (document.querySelector(".site-footer")) return;

    const isEn = locale === "en";
    const text = isEn
      ? {
          tagline: "Find Japanese festivals by feature, date, and area.",
          about: "About this site",
          regions: "Browse by area",
          features: "Browse by feature",
          more: "More",
          favorites: "Favorites",
          lab: "VIGOR LAB Home",
          language: "日本語版",
          copyright: `© ${new Date().getFullYear()} VIGOR LAB`
        }
      : {
          tagline: "山車・神輿・踊りなどの特徴や開催時期、エリアから祭りを探せます。",
          about: "このサイトについて",
          regions: "エリアから探す",
          features: "見たいものから探す",
          more: "その他",
          favorites: "お気に入り",
          lab: "VIGOR LABトップへ",
          language: "English version",
          copyright: `© ${new Date().getFullYear()} VIGOR LAB`
        };

    const footer = document.createElement("footer");
    footer.className = "site-footer";

    const inner = document.createElement("div");
    inner.className = "site-footer-inner";

    const brand = document.createElement("div");
    brand.className = "site-footer-brand";
    const brandLink = document.createElement("a");
    brandLink.className = "site-footer-brand-link";
    brandLink.href = getHomeUrl();
    brandLink.textContent = "MATSURI";
    const taglineEl = document.createElement("p");
    taglineEl.className = "site-footer-tagline";
    taglineEl.textContent = text.tagline;
    const aboutLink = document.createElement("a");
    aboutLink.className = "site-footer-about-link";
    aboutLink.href = relativeFile([], "about.html");
    aboutLink.textContent = text.about;
    brand.append(brandLink, taglineEl, aboutLink);

    const makeGroup = (heading, links) => {
      const group = document.createElement("div");
      group.className = "site-footer-group";
      const h2 = document.createElement("h2");
      h2.textContent = heading;
      const list = document.createElement("div");
      list.className = "site-footer-link-list";
      list.append(...links);
      group.append(h2, list);
      return group;
    };

    const regionLinks = FOOTER_REGIONS.map((region) => {
      const a = document.createElement("a");
      a.href = relativeUrl(["regions", region.slug]);
      a.textContent = isEn ? region.en : region.ja;
      return a;
    });

    const featureLinks = FOOTER_FEATURES.map((feature) => {
      const a = document.createElement("a");
      a.href = relativeUrl(["features", feature.slug]);
      a.textContent = isEn ? feature.en : feature.ja;
      return a;
    });

    const favoritesLink = document.createElement("a");
    favoritesLink.href = getFavoritesUrl();
    favoritesLink.textContent = text.favorites;
    const labLink = document.createElement("a");
    labLink.href = getLabHomeUrl();
    labLink.textContent = text.lab;
    const languageLink = document.createElement("a");
    languageLink.href = getLanguageUrl();
    languageLink.textContent = text.language;

    const groups = document.createElement("div");
    groups.className = "site-footer-groups";
    groups.append(
      makeGroup(text.regions, regionLinks),
      makeGroup(text.features, featureLinks),
      makeGroup(text.more, [favoritesLink, labLink, languageLink])
    );

    inner.append(brand, groups);

    const bottom = document.createElement("div");
    bottom.className = "site-footer-bottom";
    bottom.textContent = text.copyright;

    footer.append(inner, bottom);
    document.body.append(footer);
  }

  function buildNav() {
    if (document.querySelector(".site-nav")) return;
    const locale = getLocale();
    const labels = locale === "en"
      ? { home: "Home", search: "Search", favorites: "Favorites", menu: "Menu", lab: "VIGOR LAB Home", language: "日本語版" }
      : { home: "ホーム", search: "検索", favorites: "お気に入り", menu: "メニュー", lab: "VIGOR LABトップへ", language: "English version" };
    const homeUrl = getHomeUrl();

    document.body.classList.add("has-site-nav");

    const nav = document.createElement("nav");
    nav.className = "site-nav";
    nav.setAttribute("aria-label", locale === "en" ? "Site navigation" : "サイトナビゲーション");

    const inner = document.createElement("div");
    inner.className = "site-nav-inner";
    const logo = document.createElement("a");
    logo.className = "site-nav-logo";
    logo.href = homeUrl;
    logo.setAttribute("aria-label", "MATSURI");
    const wordmark = document.createElement("img");
    wordmark.className = "site-nav-logo-wordmark";
    wordmark.src = `${relativeFile([], "shared/brand/matsuri-logo.png")}?v=2`;
    wordmark.alt = "";
    logo.append(wordmark);

    const topBar = document.createElement("div");
    topBar.className = "site-nav-topbar";
    topBar.append(logo.cloneNode(true));
    document.body.prepend(topBar);

    const items = document.createElement("div");
    items.className = "site-nav-items";
    const homeLink = createNavLink(labels.home, "⌂", homeUrl, isHomeContext());
    homeLink.querySelector(".site-nav-icon").classList.add("site-nav-icon--home");
    items.append(homeLink);

    const searchButton = createNavButton(labels.search, "⌕");
    searchButton.querySelector(".site-nav-icon").classList.add("site-nav-icon--search");
    items.append(searchButton);
    const favoritesLink = createNavLink(labels.favorites, "♡", getFavoritesUrl(), getMatsuriSegments()[0] === "favorites");
    favoritesLink.querySelector(".site-nav-icon").classList.add("site-nav-icon--favorites");
    items.append(favoritesLink);

    const menuWrap = document.createElement("div");
    menuWrap.className = "site-nav-menu-wrap";
    const menuButton = document.createElement("button");
    menuButton.className = "site-nav-item site-nav-menu-button";
    menuButton.type = "button";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-controls", "site-nav-menu");
    const menuIcon = document.createElement("span");
    menuIcon.className = "site-nav-icon site-nav-icon--menu";
    menuIcon.setAttribute("aria-hidden", "true");
    menuIcon.textContent = "☰";
    const menuLabel = document.createElement("span");
    menuLabel.className = "site-nav-label";
    menuLabel.textContent = labels.menu;
    menuButton.append(menuIcon, menuLabel);

    const menu = document.createElement("div");
    menu.id = "site-nav-menu";
    menu.className = "site-nav-menu";
    menu.hidden = true;
    const labLink = document.createElement("a");
    labLink.href = getLabHomeUrl();
    labLink.textContent = labels.lab;
    const languageLink = document.createElement("a");
    languageLink.href = getLanguageUrl();
    languageLink.textContent = labels.language;
    menu.append(labLink, languageLink);
    menuWrap.append(menuButton, menu);
    items.append(menuWrap);
    inner.append(logo, items);
    nav.append(inner);
    buildFooter(locale);
    document.body.append(nav);
    buildSearchModal(searchButton);
    setupFavoriteHearts();

    function closeMenu() {
      menu.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
    }

    menuButton.addEventListener("click", () => {
      const willOpen = menu.hidden;
      menu.hidden = !willOpen;
      menuButton.setAttribute("aria-expanded", String(willOpen));
    });
    document.addEventListener("click", (event) => {
      if (!menuWrap.contains(event.target)) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildNav);
  } else {
    buildNav();
  }
})();
