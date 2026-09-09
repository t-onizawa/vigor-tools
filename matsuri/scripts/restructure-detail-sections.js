#!/usr/bin/env node
// 既存sectionの内容を変えず、全詳細ページを機械的に並べ替える。
// 全件をメモリ上で自己検証してから書き込むため、1件でも想定外なら変更しない。

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
function listPages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dir, entry.name, "index.html")).filter(fs.existsSync);
}
const pages = [...listPages(path.join(ROOT, "festivals")), ...listPages(path.join(ROOT, "en", "festivals"))];
const definitions = [
  ["primary", /class="[^"]*\bprimary-info\b/], ["schedule", /id="schedule-section"/],
  ["atmosphere", /id="atmosphere-media-section"/], ["features", /aria-labelledby="features-heading"/],
  ["highlight", /id="highlight-comment-section"/], ["access", /aria-labelledby="access-heading"/],
  ["lodging", /id="lodging-section"/], ["map", /id="map-section"/],
  ["hayashi", /id="hayashi-section"/], ["related", /id="related-festivals-section"/],
  ["faq", /id="faq-section"/], ["sources", /aria-labelledby="sources-heading"/]
];
const required = ["primary", "schedule", "atmosphere", "features", "highlight", "access", "map", "hayashi", "faq", "sources"];
const displayOrder = ["primary", "highlight", "features", "schedule", "atmosphere", "access", "map", "related"];
const accordionOrder = ["lodging", "hayashi", "faq", "sources"];
const hash = (text) => crypto.createHash("sha256").update(text).digest("hex");

function identify(section) {
  const found = definitions.filter(([, pattern]) => pattern.test(section));
  if (found.length !== 1) throw new Error(`sectionの特定結果が${found.length}件: ${section.slice(0, 100)}`);
  return found[0][0];
}
function heading(section) {
  const found = section.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/);
  if (!found) throw new Error(`h2を取得できません: ${section.slice(0, 100)}`);
  return found[1].replace(/<[^>]+>/g, "").trim();
}
function accordion(key, section) {
  return `      <details class="accordion-section" data-accordion-section="${key}">\n        <summary>${heading(section)}</summary>\n${section}\n      </details>`;
}
function transform(file) {
  const source = fs.readFileSync(file, "utf8");
  if (source.includes('data-accordion-section="')) throw new Error(`${file}: 既に変換済み`);
  const mainMatch = source.match(/<main\b[^>]*>[\s\S]*?<\/main>/);
  if (!mainMatch) throw new Error(`${file}: mainを特定できません`);
  const main = mainMatch[0];
  const matches = [...main.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)];
  if (matches.length < 10 || matches.length > 12) throw new Error(`${file}: section数が想定外 (${matches.length})`);
  const sections = new Map();
  matches.forEach((match) => {
    const key = identify(match[0]);
    if (sections.has(key)) throw new Error(`${file}: ${key}が重複`);
    sections.set(key, match[0]);
  });
  required.forEach((key) => { if (!sections.has(key)) throw new Error(`${file}: ${key}がありません`); });
  if (sections.size !== matches.length) throw new Error(`${file}: sectionの特定数が不一致`);

  const before = new Map([...sections].map(([key, value]) => [key, hash(value)]));
  const first = matches[0].index;
  const lastMatch = matches[matches.length - 1];
  const last = lastMatch.index + lastMatch[0].length;
  const prefix = main.slice(0, first).trimEnd();
  const suffix = main.slice(last).trimStart();
  const english = file.includes(`${path.sep}en${path.sep}festivals${path.sep}`);
  const blocks = [];
  displayOrder.forEach((key) => { if (sections.has(key)) blocks.push(sections.get(key)); });
  accordionOrder.forEach((key) => { if (sections.has(key)) blocks.push(accordion(key, sections.get(key))); });
  blocks.push(`      <details class="accordion-section alternate-links-section" id="alternate-links-section" hidden>\n        <summary>${english ? "Explore this festival by category" : "この祭りをほかの切り口で見る"}</summary>\n        <div id="alternate-links-list"></div>\n      </details>`);
  const updatedMain = `${prefix}\n\n${blocks.join("\n\n")}\n    ${suffix}`;
  const updated = source.replace(main, updatedMain);

  const afterMain = updated.match(/<main\b[^>]*>[\s\S]*?<\/main>/)[0];
  const afterMatches = [...afterMain.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)];
  if (afterMatches.length !== matches.length) throw new Error(`${file}: section数不一致 (${matches.length} -> ${afterMatches.length})`);
  const after = new Map(afterMatches.map((match) => [identify(match[0]), hash(match[0])]));
  before.forEach((value, key) => { if (after.get(key) !== value) throw new Error(`${file}: ${key}の内容が変化`); });
  const expectedAccordions = accordionOrder.filter((key) => sections.has(key)).length;
  if ((afterMain.match(/data-accordion-section=/g) || []).length !== expectedAccordions) throw new Error(`${file}: accordion数不一致`);
  return { file, updated, count: matches.length };
}

try {
  const plans = pages.map(transform);
  plans.forEach(({ file, updated }) => fs.writeFileSync(file, updated));
  const counts = plans.reduce((all, plan) => ({ ...all, [plan.count]: (all[plan.count] || 0) + 1 }), {});
  console.log(`変換・自己検証成功: ${plans.length}/${pages.length}件`);
  console.log(`section数・ID・内容ハッシュ一致: ${JSON.stringify(counts)}`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
