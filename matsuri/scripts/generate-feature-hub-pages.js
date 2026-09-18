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

const FEATURE_EXPLAINERS = {
  mikoshi: `      <details class="hub-explainer">
        <summary>神輿とは</summary>
        <div class="hub-explainer-body">
        <p>神輿は、祭礼の期間だけ神様（御神体）が神社を出て氏子の町を巡る、いわば「移動する神社」です。文献上の初出は720年、隼人の乱に際して「豊前国司に仰せつけられ、初めて神輿を作らしむ」と伝えられ、749年には宇佐八幡神が金色の鳳凰を頂く鳳輦で奈良へ渡御した記録が、現在の神輿の原型とされています。</p>
        <h3>神輿の種類</h3>
        <dl class="hub-glossary">
          <dt>本社神輿（宮神輿）</dt>
          <dd>神社が所有する、その神社で最も大きな神輿。</dd>
          <dt>町会神輿</dt>
          <dd>氏子町会が所有し、氏神の御霊を分けて担ぐ神輿。大人神輿・女神輿・子供神輿に分かれることが多い。</dd>
        </dl>
        <h3>神輿にまつわる用語</h3>
        <dl class="hub-glossary">
          <dt>宮出し</dt>
          <dd>祭礼のはじまりに、神輿が神社の鳥居をくぐって町へ出ること。</dd>
          <dt>宮入り</dt>
          <dd>神輿が神社へ帰り、祭りの終わりを告げること。</dd>
        </dl>
        <h3>掲載している祭りに見る神輿の違い</h3>
        <p>同じ神輿でも、地域や祭りによって担ぎ方・見せ方は大きく異なります。<a href="../../festivals/nada-kenka-matsuri/">灘のけんか祭り</a>では、御旅山で三基の神輿を激しくぶつけ合う神事が行われます。<a href="../../festivals/awa-yawatanmachi/">安房やわたんまち</a>では、10社の神輿と5社の山車・お船が一堂に会し、境内で神輿振りを競います。</p>
        <p class="hub-explainer-source">出典：<a href="https://ja.wikipedia.org/wiki/%E7%A5%9E%E8%BC%BF" target="_blank" rel="noopener noreferrer">Wikipedia「神輿」</a>等の一般的な解説を参考にしています。個別の祭りにおける神輿の詳細は、各祭りの詳細ページに記載の一次情報をご確認ください。</p>
        </div>
      </details>
`
};

function titleFor(hub, count) {
  if (["night", "day", "evening"].includes(hub.slug)) return `${hub.label}が見どころの祭り${count}件【2026年版】｜MATSURI`;
  return `${hub.label}が見られる祭り${count}件【2026年版】｜MATSURI`;
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
      description: (count) => `2026年に${hub.label}が見どころの祭り${count}件をまとめました。開催日程・アクセス・山車や神輿などの特徴を比較できます。`,
      jsonDescription: (count) => `2026年に${hub.label}が見どころの祭り${count}件をまとめました。`,
      intro: (count) => `${hub.label}が見どころの祭り${count}件を日程順にまとめました。`,
      filters: { area: "full", month: true },
      explainerHtml: FEATURE_EXPLAINERS[hub.slug]
    }, selected, experienceTags, cssVersion);
    writePage(`features/${hub.slug}`, html, selected.length, hub.label);
    console.log(`${hub.slug}: ${selected.length}件`);
  }
}

main();
