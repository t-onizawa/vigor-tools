(function () {
  const main = document.querySelector("main[data-weekend-end]");
  if (!main) return;
  // 保存値が使えない場合も、期限切れ非表示の処理は継続する。
  try {
    const region = localStorage.getItem("matsuri-region-pref");
    const regions = ["hokkaido", "tohoku", "kanto", "chubu", "kinki", "chugoku", "shikoku", "kyushu", "okinawa"];
    const section = document.getElementById("this-weekend-section");
    if (section && regions.includes(region)) {
      const selected = section.querySelector(`:scope > [data-region="${region}"]`);
      const first = section.querySelector(":scope > [data-region]");
      if (selected && first && selected !== first) section.insertBefore(selected, first);
    }
  } catch (_) { /* localStorageが利用できなくても静的順のまま表示する。 */ }
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
