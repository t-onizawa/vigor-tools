(function () {
  const main = document.querySelector("main[data-weekend-end]");
  if (!main) return;
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date());
  if (today > main.dataset.weekendEnd) {
    const section = document.getElementById("this-weekend-section");
    if (section) section.hidden = true;
    const banner = document.getElementById("weekend-stale-banner");
    if (banner) banner.hidden = false;
    const lead = document.getElementById("weekend-lead");
    if (lead) lead.hidden = true;
  }
  main.querySelectorAll(".festival-item[data-end]").forEach((card) => {
    if (today > card.dataset.end) card.hidden = true;
  });
  // 内側の地域グループから順に非表示を判定する。
  Array.from(main.querySelectorAll("[data-weekend-block]")).reverse().forEach((section) => {
    if (!Array.from(section.querySelectorAll(".festival-item")).some((card) => !card.hidden)) section.hidden = true;
  });
})();
