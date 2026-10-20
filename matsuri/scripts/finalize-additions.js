#!/usr/bin/env node
// 新規祭り追加の機械的な後処理をまとめる（LLM不要）。
//
//   node matsuri/scripts/finalize-additions.js prepare <slug...> [--date YYYY-MM-DD]
//     commit前：静的コンテンツ生成 → ハブ・検索インデックス再生成 → sitemap.xml追記（既存は重複追記しない）
//     → 反映確認。1つでも失敗すれば終了コード1。
//   node matsuri/scripts/finalize-additions.js notify <slug...> [--urls <url>...]
//     push・Pages反映後：本番が200のURLだけをIndexNowへ一括通知する。失敗しても公開には影響しない（終了コード0）。
//   node matsuri/scripts/finalize-additions.js x-draft <slug...> [--date YYYY-MM-DD] [--links first|all]
//     X投稿下書きを標準出力へ出す（既定は1件目のみリンク付き）。
//
// sitemap.xmlへの書き込みは、追加したページ分を`</urlset>`直前へ追記するだけ（root CLAUDE.md の例外ルール）。

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { submitLive } = require("./lib/indexnow");

const ORIGIN = "https://vigorlab.net";
const MATSURI = path.join(__dirname, "..");
const SITEMAP = path.join(MATSURI, "..", "sitemap.xml");
const HUB_SCRIPTS = [
  "generate-feature-hub-pages.js",
  "generate-prefecture-hub-pages.js",
  "generate-region-hub-pages.js",
  "generate-month-hub-pages.js",
  "generate-search-index.js"
];

const todayJst = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date());
const festivalUrl = (slug) => `${ORIGIN}/matsuri/festivals/${slug}/`;
const runScript = (name, extra = []) => execFileSync("node", [path.join(__dirname, name), ...extra], { stdio: "inherit" });

function loadFestival(slug) {
  const source = fs.readFileSync(path.join(MATSURI, "festivals", slug, "data.js"), "utf8");
  return new Function(`${source}\nreturn FESTIVAL;`)();
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const slugs = [];
  const opts = { urls: [] };
  for (let i = 0; i < rest.length; i += 1) {
    if (rest[i] === "--date") opts.date = rest[++i];
    else if (rest[i] === "--links") opts.links = rest[++i];
    else if (rest[i] === "--urls") {
      while (rest[i + 1] && !rest[i + 1].startsWith("--")) opts.urls.push(rest[++i]);
    } else slugs.push(rest[i]);
  }
  return { command, slugs, opts };
}

function requireSlugs(slugs) {
  if (slugs.length === 0) throw new Error("slug を1つ以上指定してください");
  slugs.forEach((slug) => {
    ["data.js", "index.html"].forEach((file) => {
      if (!fs.existsSync(path.join(MATSURI, "festivals", slug, file))) throw new Error(`festivals/${slug}/${file} がありません`);
    });
  });
}

function appendSitemap(slugs, date) {
  let xml = fs.readFileSync(SITEMAP, "utf8");
  const added = [];
  slugs.forEach((slug) => {
    const loc = festivalUrl(slug);
    if (xml.includes(`<loc>${loc}</loc>`)) return;
    const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${date}</lastmod><changefreq>yearly</changefreq><priority>0.7</priority>\n  </url>\n`;
    xml = xml.replace("</urlset>", `${entry}</urlset>`);
    added.push(loc);
  });
  if (added.length) fs.writeFileSync(SITEMAP, xml);
  return added;
}

function verifyPrepared(slugs) {
  const problems = [];
  const searchIndex = fs.readFileSync(path.join(MATSURI, "shared", "search-index.js"), "utf8");
  const slugList = fs.readFileSync(path.join(MATSURI, "shared", "festival-slugs.js"), "utf8");
  const sitemap = fs.readFileSync(SITEMAP, "utf8");
  slugs.forEach((slug) => {
    const html = fs.readFileSync(path.join(MATSURI, "festivals", slug, "index.html"), "utf8");
    const data = loadFestival(slug);
    if (data.id !== slug) problems.push(`${slug}: data.js の id(${data.id}) と slug が不一致`);
    if (!html.includes(`<link rel="canonical" href="${festivalUrl(slug)}"`)) problems.push(`${slug}: canonical が ${festivalUrl(slug)} と不一致`);
    if (!html.includes("data-static-content")) problems.push(`${slug}: data-static-content が付いていない`);
    const hasDates = (data.yearlyInfo || []).some((y) => Array.isArray(y.dates) && y.dates.length > 0);
    if (hasDates && !html.includes("application/ld+json")) problems.push(`${slug}: 日程があるのに Event JSON-LD がない`);
    if (!searchIndex.includes(`"${slug}"`)) problems.push(`${slug}: search-index.js に未掲載`);
    if (!slugList.includes(`"${slug}"`)) problems.push(`${slug}: festival-slugs.js に未登録`);
    if (!/festival-slugs\.js/.test(html)) problems.push(`${slug}: index.html が festival-slugs.js を読み込んでいない`);
    if (!sitemap.includes(`<loc>${festivalUrl(slug)}</loc>`)) problems.push(`${slug}: sitemap.xml に未掲載`);
    // 都道府県ハブに載っているか（ハブの存在するページのみ）
    const prefHubs = fs.readdirSync(path.join(MATSURI, "prefectures"), { withFileTypes: true }).filter((d) => d.isDirectory());
    const inAnyPrefHub = prefHubs.some((d) => fs.readFileSync(path.join(MATSURI, "prefectures", d.name, "index.html"), "utf8").includes(`/festivals/${slug}/`));
    if (!inAnyPrefHub) problems.push(`${slug}: どの都道府県ハブにも掲載されていない`);
  });
  return problems;
}

function prepare(slugs, opts) {
  requireSlugs(slugs);
  const date = opts.date || todayJst();
  runScript("generate-static-content.js", slugs);
  HUB_SCRIPTS.forEach((name) => runScript(name));
  const added = appendSitemap(slugs, date);
  const problems = verifyPrepared(slugs);
  console.log(`\n[finalize] sitemap追記: ${added.length}件${added.map((u) => `\n  ${u}`).join("")}`);
  if (problems.length) {
    console.error(`[finalize] NG ${problems.length}件`);
    problems.forEach((p) => console.error(`  - ${p}`));
    return 1;
  }
  console.log(`[finalize] OK: ${slugs.length}件の静的化・ハブ・検索インデックス・sitemap・canonical/JSON-LD を確認`);
  return 0;
}

async function notify(slugs, opts) {
  const candidates = [...slugs.map(festivalUrl), ...opts.urls];
  if (candidates.length === 0) {
    console.log("IndexNow通知: 該当なし");
    return 0;
  }
  const result = await submitLive(candidates);
  console.log(`IndexNow通知: ${result.ok ? "成功" : result.live.length === 0 ? "送信対象なし" : "失敗"}`);
  result.live.forEach((u) => console.log(`  ${u}`));
  result.skipped.forEach((u) => console.log(`  除外(本番200でない): ${u}`));
  return 0;
}

function shortPrefecture(name) {
  return name === "北海道" ? name : String(name || "").replace(/[都府県]$/, "");
}

function xDraft(slugs, opts) {
  requireSlugs(slugs);
  const date = opts.date || todayJst();
  const linkAll = opts.links === "all";
  const lines = ["【お祭り追加】", `新しいお祭りを${slugs.length}件追加しました。`, ""];
  slugs.forEach((slug, i) => {
    const f = loadFestival(slug);
    lines.push(`${f.name}（${shortPrefecture(f.prefecture)}）`);
    if (i === 0 || linkAll) {
      lines.push(`${festivalUrl(slug)}?utm_source=x&utm_medium=social&utm_campaign=new_festival&utm_content=${date}`);
    }
  });
  lines.push("", "#祭り #山車 #神輿");
  console.log(lines.join("\n"));
  return 0;
}

async function main() {
  const { command, slugs, opts } = parseArgs(process.argv.slice(2));
  if (opts.date && !/^\d{4}-\d{2}-\d{2}$/.test(opts.date)) throw new Error("--date は YYYY-MM-DD で指定する");
  if (command === "prepare") return prepare(slugs, opts);
  if (command === "notify") return notify(slugs, opts);
  if (command === "x-draft") return xDraft(slugs, opts);
  throw new Error("usage: finalize-additions.js <prepare|notify|x-draft> <slug...>");
}

main().then((code) => process.exit(code), (err) => {
  console.error(err.message);
  process.exit(1);
});
