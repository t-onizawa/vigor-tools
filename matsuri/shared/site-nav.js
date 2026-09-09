(function () {
  const MATSURI_MARKER = "matsuri";

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

  function getHomeUrl() {
    return relativeUrl(getLocale() === "en" ? ["en"] : []);
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
    logo.textContent = "MATSURI";

    const items = document.createElement("div");
    items.className = "site-nav-items";
    items.append(createNavLink(labels.home, "⌂", homeUrl, isHomeContext()));

    // TODO: Phase 4で検索モーダルに差し替え
    items.append(createNavLink(labels.search, "⌕", homeUrl, false));
    // TODO: Phase 5でお気に入り一覧ページに差し替え
    items.append(createNavLink(labels.favorites, "♡", homeUrl, false));

    const menuWrap = document.createElement("div");
    menuWrap.className = "site-nav-menu-wrap";
    const menuButton = document.createElement("button");
    menuButton.className = "site-nav-item site-nav-menu-button";
    menuButton.type = "button";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-controls", "site-nav-menu");
    const menuIcon = document.createElement("span");
    menuIcon.className = "site-nav-icon";
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
    document.body.append(nav);

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
