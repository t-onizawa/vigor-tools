// 一次限りの移行スクリプト：2026-09-13〜09-18に追加された7件の祭りページが、
// 9/9完了のアコーディオンUI刷新（Phase6/7）以前の古いテンプレート構造の
// まま取り残されていた不具合の修正。<head>はそのまま保持し、<body>だけを
// 現行の正規テンプレート（宿泊/行事の特徴/よくある質問/出典のアコーディオン化、
// セクション順序の統一、lodging-cta-config.js読み込み）へ全面差し替えする。
// 差し替え後はgenerate-static-content.jsを対象slugで再実行し、
// イベントステータス・特徴バッジ・アクセス情報・JSON-LDを再注入する想定。
const fs = require("fs");
const path = require("path");

const FESTIVALS_DIR = path.join(__dirname, "..", "festivals");

const TARGET_SLUGS = [
  "hino-matsuri",
  "kakunodate-hiburi-kamakura",
  "kamihinokinai-kamifusen-age",
  "kumano-hayatama-reitaisai-mifune-matsuri",
  "kumano-jofuku-mantosai",
  "kumano-ohanabi-taikai",
  "yugawara-yassa-matsuri"
];

function buildPristineBody(name) {
  return `<body><main class="page-shell" aria-labelledby="festival-name"><header class="festival-header"><p class="back-link"><a href="../../index.html">← 祭を探す</a></p><h1 id="festival-name">${name}</h1><p class="prefecture" id="festival-prefecture"></p></header>

<section class="primary-info" aria-labelledby="dates-heading"><div><p class="section-label" id="dates-heading"></p><p class="section-label-note" id="event-status-note"></p><p class="date-list" id="festival-dates"></p></div><span class="status-badge" id="event-status"></span></section>

<section class="info-section" id="highlight-comment-section" aria-labelledby="highlight-comment-heading" hidden><h2 id="highlight-comment-heading">一言見どころコメント</h2><p id="highlight-comment-text"></p></section>

<section class="info-section" aria-labelledby="features-heading"><h2 id="features-heading">特徴</h2><div class="feature-grid" id="feature-grid"></div></section>

<section class="info-section" id="schedule-section" aria-labelledby="schedule-heading" hidden><h2 id="schedule-heading">当日の目安スケジュール</h2><div id="schedule-list-container"></div></section>

<section class="info-section media-section" id="atmosphere-media-section" aria-labelledby="atmosphere-media-heading" hidden><h2 id="atmosphere-media-heading">祭りの様子を動画で見る</h2><p class="media-notice" id="atmosphere-media-notice"></p><div class="media-frame" id="atmosphere-media-frame"></div><p class="source-meta" id="atmosphere-media-meta"></p><p><a id="atmosphere-media-link" href="#" target="_blank" rel="noopener noreferrer">YouTubeで見る →</a></p><div class="media-gallery-grid" id="atmosphere-media-gallery" hidden></div></section>

<section class="info-section" aria-labelledby="access-heading"><h2 id="access-heading">開催地・アクセス</h2><div class="detail-list" id="access-list"></div></section>

<section class="info-section media-section" id="map-section" aria-labelledby="map-heading" hidden><h2 id="map-heading">地図</h2><div class="media-frame map-frame" id="map-frame"></div><p class="source-meta" id="map-note"></p><p><a id="map-external-link" href="#" target="_blank" rel="noopener noreferrer">Googleマップで見る →</a></p></section>

<section class="info-section" id="related-festivals-section" aria-labelledby="related-festivals-heading" hidden><h2 id="related-festivals-heading">関連する祭り</h2><div class="feature-grid" id="related-festivals-list"></div></section>

      <details class="accordion-section" data-accordion-section="lodging">
        <summary>宿泊</summary>
<section class="info-section" id="lodging-section" aria-labelledby="lodging-heading" hidden>
        <h2 id="lodging-heading" class="sr-only">宿泊</h2>
        <p>宿泊を検討する場合は、周辺のホテル・宿を探せます。</p>
        <p><a id="lodging-link" class="search-link-button" href="#" target="_blank" rel="noopener noreferrer">周辺のホテル・宿を探す →</a></p>
      </section>
      </details>

      <details class="accordion-section" data-accordion-section="hayashi">
        <summary>行事の特徴</summary>
<section class="info-section" id="hayashi-section" aria-labelledby="hayashi-heading" hidden><h2 id="hayashi-heading" class="sr-only">行事の特徴</h2><p id="hayashi-note"></p></section>
      </details>

      <details class="accordion-section" data-accordion-section="faq">
        <summary>よくある質問</summary>
<section class="info-section" id="faq-section" aria-labelledby="faq-heading"><h2 id="faq-heading" class="sr-only">よくある質問</h2><div id="faq-list"></div></section>
      </details>

      <details class="accordion-section" data-accordion-section="sources">
        <summary>出典・確認日</summary>
<section class="info-section sources-section" aria-labelledby="sources-heading"><h2 id="sources-heading" class="sr-only">出典・確認日</h2><div class="source-block" id="constant-sources"></div><div class="source-block" id="yearly-sources"></div></section>
      </details>

      <details class="accordion-section alternate-links-section" id="alternate-links-section" hidden>
        <summary>こちらもチェック</summary>
        <div id="alternate-links-list"></div>
      </details>
    </main><script src="../../shared/festival-slugs.js"></script><script src="../../shared/lodging-cta-config.js"></script><script src="./data.js"></script><script src="../../shared/festival-detail.js?v=22"></script>  <script src="../../shared/site-nav.js?v=15"></script>
</body></html>`;
}

function readFestivalName(slug) {
  const src = fs.readFileSync(path.join(FESTIVALS_DIR, slug, "data.js"), "utf8");
  const FESTIVAL = new Function(`${src}\nreturn FESTIVAL;`)();
  return FESTIVAL.name;
}

function migrateSlug(slug) {
  const filePath = path.join(FESTIVALS_DIR, slug, "index.html");
  const html = fs.readFileSync(filePath, "utf8");

  const bodyStart = html.indexOf("<body");
  if (bodyStart === -1) {
    throw new Error(`<body>が見つかりません: ${slug}`);
  }
  const head = html.slice(0, bodyStart);
  const name = readFestivalName(slug);
  const newHtml = head + buildPristineBody(name);

  fs.writeFileSync(filePath, newHtml);
  console.log(`[migrate-pre-accordion-pages] 更新: festivals/${slug}/index.html`);
}

function main() {
  TARGET_SLUGS.forEach(migrateSlug);
  console.log(`[migrate-pre-accordion-pages] 完了: ${TARGET_SLUGS.length}件`);
}

main();
