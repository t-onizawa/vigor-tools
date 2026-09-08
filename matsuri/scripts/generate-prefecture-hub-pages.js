const fs = require("fs");
const path = require("path");
const {
  MINIMUM_HUB_COUNT,
  REGIONS,
  MATSURI_ROOT,
  loadHubData,
  sortFestivalItems,
  renderHubPage,
  writePage
} = require("./lib/hub-shared");

function main() {
  const { items, experienceTags, cssVersion } = loadHubData();
  const grouped = new Map();
  for (const item of items) {
    const areaTag = item.festival.areaTag;
    if (!areaTag) continue;
    if (!grouped.has(areaTag)) grouped.set(areaTag, []);
    grouped.get(areaTag).push(item);
  }
  const generatedRegions = new Set(Object.entries(REGIONS)
    .filter(([, region]) => items.filter(({ festival }) => region.prefectures.includes(festival.areaTag)).length >= MINIMUM_HUB_COUNT)
    .map(([slug]) => slug));
  const generatedSlugs = [];

  for (const [areaTag, groupedItems] of [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    if (groupedItems.length < MINIMUM_HUB_COUNT) continue;
    const selected = sortFestivalItems(groupedItems);
    const prefecture = selected[0].festival.prefecture;
    const regionEntry = Object.entries(REGIONS).find(([, region]) => region.prefectures.includes(areaTag));
    const regionLink = regionEntry && generatedRegions.has(regionEntry[0])
      ? `<p class="back-to-list"><a href="../../regions/${regionEntry[0]}/">${regionEntry[1].label}の祭りをもっと見る →</a></p>`
      : "";
    const canonical = `https://vigorlab.net/matsuri/prefectures/${areaTag}/`;
    const html = renderHubPage({
      h1: `${prefecture}の祭り一覧`,
      breadcrumbLabel: `${prefecture}の祭り`,
      canonical,
      title: (count) => `${prefecture}の祭り${count}件｜MATSURI`,
      description: (count) => `${prefecture}で開催される祭り${count}件をまとめました。開催日程・アクセス・山車や神輿などの見どころを比較できます。`,
      jsonDescription: (count) => `${prefecture}で開催される祭り${count}件をまとめました。`,
      intro: (count) => `${prefecture}で開催される祭り${count}件を日程順にまとめました。`,
      auxiliaryLink: regionLink
    }, selected, experienceTags, cssVersion);
    writePage(`prefectures/${areaTag}`, html, selected.length, prefecture);
    generatedSlugs.push(areaTag);
    console.log(`${areaTag}: ${selected.length}件`);
  }

  const output = `const PREFECTURE_HUB_SLUGS = ${JSON.stringify(generatedSlugs)};\n`;
  fs.writeFileSync(path.join(MATSURI_ROOT, "shared", "prefecture-hub-slugs.js"), output);
  console.log(`shared/prefecture-hub-slugs.js: ${generatedSlugs.length}件`);
}

main();
