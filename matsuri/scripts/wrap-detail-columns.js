#!/usr/bin/env node
// 詳細ページのPC2カラムで、左右カードの高さが行ごとに連動する問題を構造的に直す。
// 左カラム（見どころ・特徴・スケジュール・動画）と右カラム（アクセス・地図）を
// それぞれ .detail-col でまとめ、カラム内を独立して縦に積む。
// 既存sectionの内容は変えない。全件をメモリ上で検証してから書き込み、1件でも
// 想定外なら何も書かない。再実行しても安全（ラッパー済みはスキップ）。
//
// 実行: node matsuri/scripts/wrap-detail-columns.js

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
function listPages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory())
    .map((e) => path.join(dir, e.name, "index.html")).filter(fs.existsSync);
}
const pages = [...listPages(path.join(ROOT, "festivals")), ...listPages(path.join(ROOT, "en", "festivals"))];

const MAIN_IDS = [
  /<section\b[^>]*id="highlight-comment-section"/,
  /<section\b[^>]*aria-labelledby="features-heading"/,
  /<section\b[^>]*id="schedule-section"/,
  /<section\b[^>]*id="atmosphere-media-section"/
];
const SIDE_IDS = [
  /<section\b[^>]*aria-labelledby="access-heading"/,
  /<section\b[^>]*id="map-section"/
];

function planPage(html) {
  if (html.includes('class="detail-col')) return { skip: "already" };
  const find = (re) => { const m = re.exec(html); return m ? m.index : -1; };
  const main = MAIN_IDS.map(find);
  const side = SIDE_IDS.map(find);
  if (main[0] < 0 || main[1] < 0 || side[0] < 0) return { error: "必須section欠落" };
  const present = [...main, ...side].filter((i) => i >= 0);
  for (let i = 1; i < present.length; i++) {
    if (present[i] <= present[i - 1]) return { error: "section順が想定と異なる" };
  }
  const mainStart = Math.min(...main.filter((i) => i >= 0));
  const sideStart = side[0];
  const lastSide = Math.max(...side.filter((i) => i >= 0));
  const endTag = html.indexOf("</section>", lastSide);
  if (endTag < 0) return { error: "末尾section不明" };
  const sideEnd = endTag + "</section>".length;
  // 左右カラムの間・前後に、想定外の要素が挟まっていないこと
  const between = html.slice(html.indexOf("</section>", Math.max(...main.filter((i) => i >= 0))) + 10, sideStart);
  if (/<(section|details|header|main)\b/.test(between)) return { error: "左右の間に想定外の要素" };
  return { mainStart, sideStart, sideEnd };
}

const plans = [];
const problems = [];
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const plan = planPage(html);
  if (plan.error) problems.push(`${path.relative(ROOT, file)}: ${plan.error}`);
  else plans.push({ file, html, plan });
}
if (problems.length) {
  console.error("想定外のページがあるため、何も書き込みません:\n" + problems.join("\n"));
  process.exit(1);
}

let changed = 0;
let skipped = 0;
for (const { file, html, plan } of plans) {
  if (plan.skip) { skipped++; continue; }
  const out =
    html.slice(0, plan.mainStart) +
    '<div class="detail-col detail-col-main">\n' +
    html.slice(plan.mainStart, plan.sideStart) +
    '</div>\n<div class="detail-col detail-col-side">\n' +
    html.slice(plan.sideStart, plan.sideEnd) +
    '\n</div>' +
    html.slice(plan.sideEnd);
  fs.writeFileSync(file, out);
  changed++;
}
console.log(`[wrap-detail-columns] 変更${changed}件 / スキップ${skipped}件 / 対象${pages.length}件`);
