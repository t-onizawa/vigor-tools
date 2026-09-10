const {
  MONTHS,
  loadHubData,
  sortFestivalItems,
  renderMonthPage,
  writePage
} = require("./lib/hub-shared");

function main() {
  const { items, experienceTags, cssVersion } = loadHubData();
  for (const month of MONTHS) {
    const monthItems = sortFestivalItems(items.filter(({ yearlyInfo }) => {
      return Array.isArray(yearlyInfo.dates) && yearlyInfo.dates.some((date) => {
        return Number(date.slice(5, 7)) === month.number;
      });
    }));
    const html = renderMonthPage(month, monthItems, experienceTags, cssVersion, { area: "full", feature: true });
    writePage(`months/${month.slug}`, html, monthItems.length, month.label);
    console.log(`${month.label}: ${monthItems.length}件`);
  }
}

main();
