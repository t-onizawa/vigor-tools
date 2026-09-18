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
        <p><a href="../dashi/">山車とは？種類や違いはこちら →</a></p>
        <p class="hub-explainer-source">出典：<a href="https://ja.wikipedia.org/wiki/%E7%A5%9E%E8%BC%BF" target="_blank" rel="noopener noreferrer">Wikipedia「神輿」</a>等の一般的な解説を参考にしています。個別の祭りにおける神輿の詳細は、各祭りの詳細ページに記載の一次情報をご確認ください。</p>
        </div>
      </details>
`,
  dashi: `      <details class="hub-explainer">
        <summary>山車とは</summary>
        <div class="hub-explainer-body">
        <p>山車は、祭礼の際に引いたり担いだりする出し物の総称で、花や人形などで豪華に装飾されることが多いのが特徴です。神が降臨する臨時の依り代として機能してきたとされ、最古の記録は『古事記』垂仁天皇の条に見える「青葉山」、体系的な祭礼物としては『続日本後紀』天長10年（833年）の仁明天皇大嘗会で曳かれた「標山」が伝えられています。</p>
        <h3>山車の呼び名（地域による違い）</h3>
        <dl class="hub-glossary">
          <dt>曳山・山鉾</dt>
          <dd>「山」の要素を持つ呼び名。曳山（ひきやま）、山笠、山鉾など各地で呼び方が分かれる。</dd>
          <dt>だんじり（地車）</dt>
          <dd>近畿地方を中心とした呼び名。速度を保ったまま曲がる「やりまわし」が特徴とされる。</dd>
          <dt>屋台・太鼓台</dt>
          <dd>「台」の要素を持つ呼び名。地域や祭りによって構造・装飾が大きく異なる。</dd>
        </dl>
        <h3>神輿との違い</h3>
        <p>神輿が「神様そのものが乗る神聖な輿」であるのに対し、山車は「神を迎え、もてなすための出し物」という性格を持ちます。地域の民間信仰が加わり、装飾が豪華になったり、部分的に巨大化したりと独自の進化を遂げてきました。</p>
        <h3>掲載している祭りに見る山車の違い</h3>
        <p>同じ山車でも、見せ方は地域によって大きく異なります。<a href="../../festivals/kishiwada-danjiri-matsuri/">岸和田だんじり祭</a>では、昼は重いだんじりが速度を落とさず街角を曲がる「やりまわし」が、夜は提灯を灯した静かな曳行へと表情を変えます。<a href="../../festivals/takayama-sanno-matsuri/">春の高山祭（山王祭）</a>では、精緻な祭屋台が城下町に曳き揃えられ、からくりが奉納されます。</p>
        <p><a href="../mikoshi/">神輿とは？種類や違いはこちら →</a></p>
        <p class="hub-explainer-source">出典：<a href="https://ja.wikipedia.org/wiki/%E5%B1%B1%E8%BB%8A" target="_blank" rel="noopener noreferrer">Wikipedia「山車」</a>等の一般的な解説を参考にしています。個別の祭りにおける山車の詳細は、各祭りの詳細ページに記載の一次情報をご確認ください。</p>
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
