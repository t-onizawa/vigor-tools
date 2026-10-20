// IndexNow送信と本番200確認の共通処理（indexnow-notify-changed.js / finalize-additions.js から使う）。
// キー・keyLocation は indexnow-bulk-submit.js と同じ。
const https = require("https");

const ORIGIN = "https://vigorlab.net";
const KEY = "5e536e2b99a84a3bb1cb18c3697cc639";
const CHUNK_SIZE = 500;

async function productionStatus(url) {
  try {
    const res = await fetch(url, { redirect: "follow", headers: { "user-agent": "VigorMatsuriIndexNow/1.0" } });
    if (res.body) res.body.cancel().catch(() => {});
    return res.status;
  } catch (_) {
    return 0;
  }
}

function postIndexNow(urlList) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ host: "vigorlab.net", key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList });
    const req = https.request("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(body) }
    }, (res) => {
      res.resume();
      res.on("end", () => resolve({ status: res.statusCode }));
    });
    req.on("error", (err) => resolve({ status: 0, error: err.message }));
    req.setTimeout(15000, () => req.destroy(new Error("timeout")));
    req.end(body);
  });
}

// 本番で200のURLだけをチャンク送信する。失敗しても例外は投げず、結果だけ返す。
async function submitLive(urls, { verify = true, log = console.log } = {}) {
  const live = [];
  const skipped = [];
  for (let i = 0; i < urls.length; i += 8) {
    const batch = urls.slice(i, i + 8);
    const statuses = verify ? await Promise.all(batch.map(productionStatus)) : batch.map(() => 200);
    batch.forEach((url, j) => (statuses[j] === 200 ? live : skipped).push(statuses[j] === 200 ? url : `${url} [${statuses[j] || "接続失敗"}]`));
  }
  const results = [];
  for (let i = 0; i < live.length; i += CHUNK_SIZE) {
    const chunk = live.slice(i, i + CHUNK_SIZE);
    const res = await postIndexNow(chunk);
    results.push({ count: chunk.length, status: res.status || res.error });
    log(`IndexNow送信 ${chunk.length}件: HTTP ${res.status || res.error}`);
  }
  const ok = results.length > 0 && results.every((r) => r.status === 200 || r.status === 202);
  return { live, skipped, results, ok };
}

module.exports = { ORIGIN, productionStatus, postIndexNow, submitLive };
