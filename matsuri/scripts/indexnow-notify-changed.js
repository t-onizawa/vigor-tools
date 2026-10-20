#!/usr/bin/env node
// 指定コミット範囲で追加・変更された公開ページ(matsuri/**/index.html)をIndexNowへ通知する（LLM不要）。
//
//   node matsuri/scripts/indexnow-notify-changed.js [--from <sha>] [--to <sha>] [--dry-run] [--no-verify] [--urls <url>...]
//   既定の範囲は HEAD~1..HEAD。--dry-run は対象URLの一覧だけ表示して送信しない。
//   通常は本番が200のURLだけを送る（Pages反映前のURLを送らないため）。--no-verify で確認を省く。
//   対象0件なら何も送らず正常終了。送信に失敗しても終了コードは0（公開自体には影響しないため）。

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { ORIGIN, submitLive } = require("./lib/indexnow");

const ROOT = path.join(__dirname, "..", "..");

function parseArgs(argv) {
  const opts = { from: "HEAD~1", to: "HEAD", dryRun: false, verify: true, urls: [] };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--from") opts.from = argv[++i];
    else if (argv[i] === "--to") opts.to = argv[++i];
    else if (argv[i] === "--dry-run") opts.dryRun = true;
    else if (argv[i] === "--no-verify") opts.verify = false;
    else if (argv[i] === "--urls") {
      while (argv[i + 1] && !argv[i + 1].startsWith("--")) opts.urls.push(argv[++i]);
    }
  }
  return opts;
}

function toPublicUrl(file) {
  const m = file.match(/^matsuri\/(?:(.+)\/)?index\.html$/);
  if (!m) return null;
  const dir = m[1] || "";
  const segments = dir.split("/").filter(Boolean);
  if (segments.some((s) => s.startsWith("_")) || segments[0] === "research" || segments[0] === "note-drafts") return null;
  return `${ORIGIN}/matsuri/${dir ? `${dir}/` : ""}`;
}

function isNoindex(file) {
  try {
    const html = fs.readFileSync(path.join(ROOT, file), "utf8");
    return /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  } catch (_) {
    return false;
  }
}

function changedPages(from, to) {
  const out = execFileSync("git", ["diff", "--name-only", "--diff-filter=AMR", from, to, "--", "matsuri"], { cwd: ROOT, encoding: "utf8" });
  const urls = [];
  out.split("\n").filter(Boolean).forEach((file) => {
    const url = toPublicUrl(file);
    if (url && !isNoindex(file)) urls.push(url);
  });
  return [...new Set(urls)];
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const urls = [...new Set([...changedPages(opts.from, opts.to), ...opts.urls])];
  console.log(`IndexNow対象: ${urls.length}件 (${opts.from}..${opts.to})`);
  if (urls.length === 0) return;
  if (opts.dryRun) {
    urls.forEach((u) => console.log(`  ${u}`));
    console.log("--dry-run のため送信しません");
    return;
  }
  const result = await submitLive(urls, { verify: opts.verify });
  console.log(`IndexNow通知: ${result.ok ? "成功" : result.live.length === 0 ? "送信対象なし" : "失敗"} (送信${result.live.length}件 / 本番200でなく除外${result.skipped.length}件)`);
  result.skipped.forEach((u) => console.log(`  除外: ${u}`));
}

main().catch((err) => {
  console.error(`IndexNow通知で例外: ${err.message}`);
});
