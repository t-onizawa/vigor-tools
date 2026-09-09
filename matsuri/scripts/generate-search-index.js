// 新規祭り追加後にハブ生成スクリプトと併せて再実行し、検索対象を最新化する。
const fs = require("fs");
const path = require("path");

const MATSURI_ROOT = path.resolve(__dirname, "..");
const FESTIVALS_ROOT = path.join(MATSURI_ROOT, "festivals");
const SLUGS_FILE = path.join(MATSURI_ROOT, "shared", "festival-slugs.js");
const OUTPUT_FILE = path.join(MATSURI_ROOT, "shared", "search-index.js");

function evaluateConstant(filePath, constantName) {
  const source = fs.readFileSync(filePath, "utf8");
  return new Function(`${source}\nreturn ${constantName};`)();
}

function getPrimaryYearlyInfo(festival) {
  if (!festival || !Array.isArray(festival.yearlyInfo) || festival.yearlyInfo.length === 0) return null;
  const currentYear = new Date().getFullYear();
  const entries = festival.yearlyInfo.filter((entry) => entry && Number.isFinite(entry.year));
  const current = entries.find((entry) => entry.year === currentYear);
  if (current) return current;
  const future = entries.filter((entry) => entry.year > currentYear);
  if (future.length > 0) return future.reduce((nearest, entry) => entry.year < nearest.year ? entry : nearest);
  const past = entries.filter((entry) => entry.year < currentYear);
  return past.length > 0 ? past.reduce((latest, entry) => entry.year > latest.year ? entry : latest) : null;
}

const slugs = evaluateConstant(SLUGS_FILE, "FESTIVAL_SLUGS");
const index = slugs.map((slug) => {
  const festival = evaluateConstant(path.join(FESTIVALS_ROOT, slug, "data.js"), "FESTIVAL");
  const yearlyInfo = getPrimaryYearlyInfo(festival);
  const dates = yearlyInfo && Array.isArray(yearlyInfo.dates) ? yearlyInfo.dates : [];
  return {
    slug,
    name: festival.name || "",
    officialName: festival.officialName || "",
    prefecture: festival.prefecture || "",
    city: festival.city || "",
    firstDate: dates[0] || null
  };
});

fs.writeFileSync(OUTPUT_FILE, `const SEARCH_INDEX = ${JSON.stringify(index, null, 2)};\n`);
const generated = evaluateConstant(OUTPUT_FILE, "SEARCH_INDEX");
if (generated.length !== slugs.length || generated.some((item, index) => item.slug !== slugs[index])) {
  throw new Error("search-index.jsの生成結果がfestival-slugs.jsと一致しません");
}
console.log(`search-index.js: ${generated.length}件を生成・検証しました`);
