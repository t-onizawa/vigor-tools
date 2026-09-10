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
  const areaTagToRegion = {};
  for (const [slug, region] of Object.entries(REGIONS)) {
    const selected = sortFestivalItems(items.filter(({ festival }) => region.prefectures.includes(festival.areaTag)));
    if (selected.length < MINIMUM_HUB_COUNT) continue;
    const canonical = `https://vigorlab.net/matsuri/regions/${slug}/`;
    const html = renderHubPage({
      h1: `${region.label}の祭り一覧`,
      breadcrumbLabel: `${region.label}の祭り`,
      canonical,
      title: (count) => `${region.label}の祭り${count}件｜MATSURI`,
      description: (count) => `${region.label}で開催される祭り${count}件をまとめました。開催日程・アクセス・山車や神輿などの見どころを比較できます。`,
      jsonDescription: (count) => `${region.label}で開催される祭り${count}件をまとめました。`,
      intro: (count) => `${region.label}で開催される祭り${count}件を日程順にまとめました。`,
      filters: { area: "region-scoped", areaRegionSlug: slug, feature: true, month: true }
    }, selected, experienceTags, cssVersion);
    writePage(`regions/${slug}`, html, selected.length, region.label);
    console.log(`${slug}: ${selected.length}件`);
    region.prefectures.forEach((areaTag) => {
      areaTagToRegion[areaTag] = { slug, label: region.label };
    });
  }

  const output = `const REGION_HUB_MAP = ${JSON.stringify(areaTagToRegion)};\n`;
  fs.writeFileSync(path.join(MATSURI_ROOT, "shared", "region-hub-slugs.js"), output);
  console.log(`shared/region-hub-slugs.js: ${Object.keys(areaTagToRegion).length}件`);
}

main();
