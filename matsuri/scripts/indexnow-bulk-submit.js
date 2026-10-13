// 一次限りの実行用スクリプト：Bing Webmaster Toolsが「一部の重要ページが
// IndexNow未送信」と指摘したことを受け、既存の全公開URL（祭り詳細・
// 月別/地方/都道府県/feature別ハブ・トップページ）をIndexNowへ一括送信
// する。新規祭り追加タスク側は追加分のみ個別送信する設計のため、それ
// 以前に公開済みだった既存ページはこれまで一度も送信されていなかった。
const fs = require("fs");
const path = require("path");
const https = require("https");

const SITE_ORIGIN = "https://vigorlab.net";
const HOST = "vigorlab.net";
const KEY = "5e536e2b99a84a3bb1cb18c3697cc639";
const KEY_LOCATION = `${SITE_ORIGIN}/${KEY}.txt`;
const MATSURI_ROOT = path.join(__dirname, "..");

function listFestivalUrls() {
  const dir = path.join(MATSURI_ROOT, "festivals");
  return fs
    .readdirSync(dir)
    .filter((slug) => fs.existsSync(path.join(dir, slug, "index.html")))
    .map((slug) => `${SITE_ORIGIN}/matsuri/festivals/${slug}/`);
}

function listHubUrls(subdir) {
  const dir = path.join(MATSURI_ROOT, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((slug) => fs.existsSync(path.join(dir, slug, "index.html")))
    .map((slug) => `${SITE_ORIGIN}/matsuri/${subdir}/${slug}/`);
}

function buildUrlList() {
  const urls = [
    `${SITE_ORIGIN}/matsuri/`,
    ...listFestivalUrls(),
    ...listHubUrls("features"),
    ...listHubUrls("prefectures"),
    ...listHubUrls("regions"),
    ...listHubUrls("months")
  ];
  return [...new Set(urls)];
}

function postBulk(urlList) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList
    });
    const req = https.request(
      "https://api.indexnow.org/indexnow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const urls = buildUrlList();
  console.log(`[indexnow-bulk-submit] 送信対象: ${urls.length}件`);

  // IndexNowの1リクエストあたり上限は10,000件。十分収まるため分割不要だが、
  // 念のため500件ずつのチャンクに分けて送信する（他サイトの実装例に合わせ、
  // 過大なペイロードを避ける）。
  const chunkSize = 500;
  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize);
    try {
      const result = await postBulk(chunk);
      console.log(
        `[indexnow-bulk-submit] チャンク${Math.floor(i / chunkSize) + 1}（${chunk.length}件）: HTTP ${result.status}`
      );
      if (result.status !== 200 && result.status !== 202) {
        console.log("  response body:", result.body.slice(0, 500));
      }
    } catch (err) {
      console.error(`[indexnow-bulk-submit] チャンク${Math.floor(i / chunkSize) + 1} 失敗:`, err.message);
    }
  }
  console.log("[indexnow-bulk-submit] 完了");
}

main();
