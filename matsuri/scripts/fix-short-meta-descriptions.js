// 一次限りの移行スクリプト：Bing Webmaster Toolsが「meta descriptionが
// 短すぎる」と指摘したページ（120文字未満）を、schema-design.mdの
// 必須要件（120〜160文字程度、開催地・日程・特徴・駐車場・最寄り駅を
// すべて含む）を満たす文章で再生成する。meta description・
// og:description・twitter:descriptionの3箇所を同じ内容に揃える
// （og:title/twitter:title等、他の要素は変更しない）。
const fs = require("fs");
const path = require("path");

const FESTIVALS_DIR = path.join(__dirname, "..", "festivals");
const MIN_LENGTH = 120;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readFestival(slug) {
  const src = fs.readFileSync(path.join(FESTIVALS_DIR, slug, "data.js"), "utf8");
  return new Function(`${src}\nreturn FESTIVAL;`)();
}

function featureList(features) {
  const defs = [
    ["hasDashi", "山車"],
    ["hasMikoshi", "神輿"],
    ["hasDanceOnDashi", "踊り"],
    ["hasParade", "曳き回し"]
  ];
  return defs.filter(([key]) => features[key] === true).map(([, label]) => label).join("・");
}

function parkingLabel(value) {
  if (value === true) return "あり";
  if (value === false) return "なし";
  if (value === "n/a") return "該当なし";
  return "未確認";
}

function formatDate(dateText) {
  const d = new Date(`${dateText}T00:00:00+09:00`);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function dateRangeText(dates) {
  if (!Array.isArray(dates) || dates.length === 0) return null;
  if (dates.length === 1) return formatDate(dates[0]);
  const end = formatDate(dates[dates.length - 1]).replace(/^\d+年/, "");
  return `${formatDate(dates[0])}〜${end}`;
}

function buildDescription(festival) {
  const currentYear = festival.yearlyInfo[0];
  const dr = dateRangeText(currentYear.dates);
  let dateExpr;
  if (currentYear.eventStatus === "ended") {
    dateExpr = dr ? `${dr}に開催されました` : "開催されました";
  } else if (currentYear.eventStatus === "cancelled") {
    dateExpr = dr ? `${dr}開催予定でしたが中止となりました` : "中止となりました";
  } else if (["scheduled_pending_official", "unconfirmed"].includes(currentYear.eventStatus)) {
    dateExpr = dr ? `${dr}に開催予定（公式詳細発表待ち）` : "開催時期は未定";
  } else {
    dateExpr = dr ? `${dr}に開催` : "開催";
  }

  const feats = featureList(festival.constantInfo.features);
  const parking = parkingLabel(currentYear.access.hasParking);
  const station = festival.constantInfo.access.nearestStation;
  const highlight = festival.constantInfo.highlightComment || "";
  const featPart = feats ? `${feats}が特徴で、` : "";

  return `${festival.prefecture}${festival.city}の${festival.name}は${dateExpr}。${highlight} ${featPart}駐車場は${parking}。最寄り駅・アクセス拠点は${station}です。`;
}

function replaceAttr(html, attrPattern, newValue, label) {
  const re = new RegExp(`(${attrPattern}content=")[^"]*(")`);
  if (!re.test(html)) {
    throw new Error(`置換対象が見つかりません（${label}）`);
  }
  return html.replace(re, `$1${escapeHtml(newValue)}$2`);
}

function fixSlug(slug) {
  const filePath = path.join(FESTIVALS_DIR, slug, "index.html");
  let html = fs.readFileSync(filePath, "utf8");

  const currentMatch = html.match(/<meta name="description" content="([^"]*)"/);
  if (!currentMatch) {
    console.log(`[fix-short-meta-descriptions] スキップ（descriptionなし）: ${slug}`);
    return false;
  }
  if (currentMatch[1].length >= MIN_LENGTH) {
    return false;
  }

  const festival = readFestival(slug);
  const description = buildDescription(festival);

  html = replaceAttr(html, '<meta name="description" ', description, "meta description");
  html = replaceAttr(html, '<meta property="og:description" ', description, "og:description");
  html = replaceAttr(html, '<meta name="twitter:description" ', description, "twitter:description");

  fs.writeFileSync(filePath, html);
  console.log(`[fix-short-meta-descriptions] 更新: ${slug}（${currentMatch[1].length}→${description.length}文字）`);
  return true;
}

function main() {
  const slugs = fs
    .readdirSync(FESTIVALS_DIR)
    .filter((name) => fs.existsSync(path.join(FESTIVALS_DIR, name, "data.js")))
    .filter((name) => fs.existsSync(path.join(FESTIVALS_DIR, name, "index.html")));

  let updated = 0;
  let failed = 0;
  slugs.forEach((slug) => {
    try {
      if (fixSlug(slug)) updated += 1;
    } catch (err) {
      failed += 1;
      console.error(`[fix-short-meta-descriptions] 失敗: ${slug} — ${err.message}`);
    }
  });
  console.log(`[fix-short-meta-descriptions] 完了: 更新${updated}件 / 失敗${failed}件`);
  if (failed > 0) process.exitCode = 1;
}

main();
