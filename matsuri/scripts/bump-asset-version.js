#!/usr/bin/env node
// VIGOR MATSURI 共有アセットのバージョンクエリ一括更新スクリプト
//
// festival-detail.css・festival-detail.jsは全festival詳細ページ（174件超＋
// 英語版）から参照される共有ファイルで、キャッシュバスティング用の
// バージョンクエリ（?v=N）を持つ。これらのファイルを変更した際、
// 手作業で全ページのクエリを揃えようとすると更新漏れが起きやすいため、
// このスクリプトで機械的に一括更新する。
//
// 実行: node matsuri/scripts/bump-asset-version.js <新しいバージョン番号>
// 例:   node matsuri/scripts/bump-asset-version.js 2
//
// 実行後、対象ファイル全件で新バージョンに揃っていることを標準出力で
// 報告する。festival-detail.css・festival-detail.jsのどちらか一方でも
// 変更した場合は、両方まとめてこのスクリプトでバージョンを上げること
// （個別に別バージョンを持たせない。管理を単純に保つため）。

const fs = require("fs");
const path = require("path");

const MATSURI_DIR = path.join(__dirname, "..");
const TARGETS = [
  { name: "festival-detail.css", pattern: /festival-detail\.css(\?v=\d+)?/g },
  { name: "festival-detail.js", pattern: /festival-detail\.js(\?v=\d+)?/g }
];

function findIndexHtmlFiles() {
  const files = [];
  const festivalsDir = path.join(MATSURI_DIR, "festivals");
  const enFestivalsDir = path.join(MATSURI_DIR, "en", "festivals");

  [festivalsDir, enFestivalsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach((slug) => {
      const indexPath = path.join(dir, slug, "index.html");
      if (fs.existsSync(indexPath)) files.push(indexPath);
    });
  });

  return files;
}

function main() {
  const newVersion = process.argv[2];
  if (!newVersion || !/^\d+$/.test(newVersion)) {
    console.error("使い方: node matsuri/scripts/bump-asset-version.js <新しいバージョン番号（整数）>");
    process.exit(1);
  }

  const files = findIndexHtmlFiles();
  let updatedCount = 0;

  files.forEach((file) => {
    const original = fs.readFileSync(file, "utf8");
    let updated = original;

    TARGETS.forEach(({ name, pattern }) => {
      updated = updated.replace(pattern, `${name}?v=${newVersion}`);
    });

    if (updated !== original) {
      fs.writeFileSync(file, updated, "utf8");
      updatedCount++;
    }
  });

  console.log(`対象ファイル: ${files.length}件`);
  console.log(`更新: ${updatedCount}件（新バージョン: v=${newVersion}）`);

  // 更新後の検証：全ファイルが新バージョンに揃っているか確認する
  const mismatched = files.filter((file) => {
    const content = fs.readFileSync(file, "utf8");
    return TARGETS.some(({ name }) => !content.includes(`${name}?v=${newVersion}`));
  });

  if (mismatched.length > 0) {
    console.error(`検証NG: ${mismatched.length}件のファイルでバージョンが揃っていません:`);
    mismatched.forEach((file) => console.error(`  - ${file}`));
    process.exit(1);
  }

  console.log(`検証OK: 全${files.length}件がv=${newVersion}に揃っています。`);
}

main();
