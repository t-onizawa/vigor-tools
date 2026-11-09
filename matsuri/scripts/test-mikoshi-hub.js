// 神輿ハブ（features/mikoshi）の構造と構造化データの検証。実行: node matsuri/scripts/test-mikoshi-hub.js
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const MATSURI_ROOT = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(MATSURI_ROOT, "features/mikoshi/index.html"), "utf8");
const blocks = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map((m) => JSON.parse(m[1]));

let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`PASS ${name}`); }

test("titleに件数・年号を含まない", () => {
  const title = html.match(/<title>([^<]*)<\/title>/)[1];
  assert.strictEqual(title, "神輿が見られる祭りを探す｜全国の神輿渡御の見どころ・宮出し・宮入り【MATSURI】");
  assert(!/\d/.test(title));
});
test("H1が「探す」意図", () => {
  assert(html.includes("<h1>神輿が見られる祭りを探す</h1>"));
});
test("全件がHTMLに出力され、件数表示・ItemListと一致する（絞り込みはJSの表示切替のみ）", () => {
  const cards = (html.match(/<a class="festival-item(?: |")/g) || []).length;
  const collection = blocks.find((b) => b["@type"] === "CollectionPage");
  assert(cards > 0);
  assert.strictEqual(collection.mainEntity.numberOfItems, cards);
  assert.strictEqual(collection.mainEntity.itemListElement.length, cards);
  assert(html.includes(`<p class="count-text" id="hub-count-text">${cards}件を掲載中</p>`));
  assert(!/festival-item[^>]*\shidden/.test(html), "サーバー出力でカードを隠していない");
});
test("ItemListはURL列挙のみ（position+url）で、Eventを埋め込まない", () => {
  const collection = blocks.find((b) => b["@type"] === "CollectionPage");
  collection.mainEntity.itemListElement.forEach((item, index) => {
    assert.deepStrictEqual(Object.keys(item).sort(), ["@type", "position", "url"]);
    assert.strictEqual(item.position, index + 1);
    assert(/^https:\/\/vigorlab\.net\/matsuri\/festivals\/[a-z0-9-]+\/$/.test(item.url));
  });
  assert(!blocks.some((b) => b["@type"] === "Event"));
});
test("canonicalは末尾スラッシュのURL", () => {
  assert(html.includes('<link rel="canonical" href="https://vigorlab.net/matsuri/features/mikoshi/">'));
});

console.log(`${passed}テスト成功`);
