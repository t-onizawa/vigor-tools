#!/usr/bin/env node
// アコーディオン内のh2見出しは<summary>と重複表示されるため、視覚的には隠す（sr-only化）。
// 全件をメモリ上で自己検証してから書き込むため、1件でも想定外なら変更しない。

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
function listPages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dir, entry.name, "index.html")).filter(fs.existsSync);
}
const pages = [...listPages(path.join(ROOT, "festivals")), ...listPages(path.join(ROOT, "en", "festivals"))];
const requiredIds = ["hayashi-heading", "faq-heading", "sources-heading"];
const optionalIds = ["lodging-heading"];

function transform(file) {
  const source = fs.readFileSync(file, "utf8");
  let updated = source;
  requiredIds.forEach((id) => {
    const pattern = new RegExp(`<h2 id="${id}">`, "g");
    const matches = source.match(pattern) || [];
    if (matches.length !== 1) throw new Error(`${file}: ${id}が${matches.length}件`);
    updated = updated.replace(pattern, `<h2 id="${id}" class="sr-only">`);
  });
  optionalIds.forEach((id) => {
    const pattern = new RegExp(`<h2 id="${id}">`, "g");
    const matches = source.match(pattern) || [];
    if (matches.length > 1) throw new Error(`${file}: ${id}が${matches.length}件`);
    updated = updated.replace(pattern, `<h2 id="${id}" class="sr-only">`);
  });
  return { file, updated };
}

try {
  const plans = pages.map(transform);
  plans.forEach(({ file, updated }) => fs.writeFileSync(file, updated));
  console.log(`変換成功: ${plans.length}/${pages.length}件`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
