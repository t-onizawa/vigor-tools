const {
  MINIMUM_HUB_COUNT,
  loadHubData,
  sortFestivalItems,
  renderHubPage,
  writePage
} = require("./lib/hub-shared");

const FEATURE_HUBS = [
  { slug: "dashi", label: "山車", match: (features) => features.hasDashi === true },
  { slug: "mikoshi", label: "神輿", match: (features) => features.hasMikoshi === true },
  { slug: "odori", label: "踊り", match: (features) => features.hasDanceOnDashi === true },
  { slug: "hikimawashi", label: "曳き回し", match: (features) => features.hasParade === true },
  { slug: "night", label: "夜", match: (features) => features.highlightTime === "night" || features.highlightTime === "both" },
  { slug: "day", label: "昼", match: (features) => features.highlightTime === "day" || features.highlightTime === "both" },
  { slug: "evening", label: "夕方", match: (features) => features.highlightTime === "evening" }
];

function titleFor(hub, count) {
  if (["night", "day", "evening"].includes(hub.slug)) return `${hub.label}が見どころの祭り${count}件｜MATSURI`;
  return `${hub.label}が見られる祭り${count}件｜MATSURI`;
}

function main() {
  const { items, experienceTags, cssVersion } = loadHubData();
  for (const hub of FEATURE_HUBS) {
    const selected = sortFestivalItems(items.filter(({ festival }) => {
      const features = (festival.constantInfo && festival.constantInfo.features) || {};
      return hub.match(features);
    }));
    if (selected.length < MINIMUM_HUB_COUNT) continue;
    const canonical = `https://vigorlab.net/matsuri/features/${hub.slug}/`;
    const html = renderHubPage({
      h1: `${hub.label}が見どころの祭り一覧`,
      breadcrumbLabel: `${hub.label}が見どころの祭り`,
      canonical,
      title: (count) => titleFor(hub, count),
      description: (count) => `${hub.label}が見どころの祭り${count}件をまとめました。開催日程・アクセス・山車や神輿などの特徴を比較できます。`,
      jsonDescription: (count) => `${hub.label}が見どころの祭り${count}件をまとめました。`,
      intro: (count) => `${hub.label}が見どころの祭り${count}件を日程順にまとめました。`
    }, selected, experienceTags, cssVersion);
    writePage(`features/${hub.slug}`, html, selected.length, hub.label);
    console.log(`${hub.slug}: ${selected.length}件`);
  }
}

main();
