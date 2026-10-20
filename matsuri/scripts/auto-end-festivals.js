#!/usr/bin/env node
// confirmed のまま全日程が過去日になった祭り（check-data-integrity.js の confirmed_but_all_past）を
// eventStatus "ended" へ機械的に直す。判断・調査は不要な修正のため、LLMを使わずに実行する。
//
// 実行: node matsuri/scripts/auto-end-festivals.js [--dry-run] [--as-of YYYY-MM-DD] [--regenerate]
//   --dry-run      対象の一覧のみ表示し、ファイルは書き換えない
//   --as-of        基準日（既定は日本時間の今日）
//   --regenerate   変更があれば、静的コンテンツ・ハブ・検索インデックスを再生成する
// 書き換えるのは eventStatus の値のみ（他の記述・整形は変更しない）。

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const FESTIVALS_DIR = path.join(__dirname, "..", "festivals");
const STATUS_RE = /(["']?eventStatus["']?\s*:\s*["'])([a-z_]+)(["'])/g;
const HUB_SCRIPTS = [
  "generate-feature-hub-pages.js",
  "generate-prefecture-hub-pages.js",
  "generate-region-hub-pages.js",
  "generate-month-hub-pages.js",
  "generate-search-index.js"
];

function todayJst() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date());
}

function evaluate(source) {
  return new Function(`${source}\nreturn FESTIVAL;`)();
}

function isAllPast(entry, asOf) {
  return entry.eventStatus === "confirmed"
    && Array.isArray(entry.dates)
    && entry.dates.length > 0
    && entry.dates.every((d) => d < asOf);
}

// 1ファイル分の書き換え結果を返す。構造が想定と違う場合は null（書き換えない）と理由を返す。
function planFile(source, asOf) {
  const festival = evaluate(source);
  const entries = Array.isArray(festival.yearlyInfo) ? festival.yearlyInfo : [];
  const targets = entries.map((e, i) => (isAllPast(e, asOf) ? i : -1)).filter((i) => i >= 0);
  if (targets.length === 0) return { years: [], source };
  const matches = [...source.matchAll(STATUS_RE)];
  if (matches.length !== entries.length) return { error: `eventStatusの記述数(${matches.length})とyearlyInfo件数(${entries.length})が不一致` };
  let index = -1;
  const next = source.replace(STATUS_RE, (all, pre, value, post) => {
    index += 1;
    return targets.includes(index) ? `${pre}ended${post}` : all;
  });
  const after = evaluate(next).yearlyInfo;
  const ok = after.every((e, i) => (targets.includes(i) ? e.eventStatus === "ended" : e.eventStatus === entries[i].eventStatus))
    && JSON.stringify(after.map((e) => ({ ...e, eventStatus: null }))) === JSON.stringify(entries.map((e) => ({ ...e, eventStatus: null })));
  if (!ok) return { error: "書き換え後の内容がeventStatus以外で変化したため中止" };
  return { years: targets.map((i) => entries[i].year), source: next };
}

function run(args) {
  const dryRun = args.includes("--dry-run");
  const regenerate = args.includes("--regenerate");
  const asOfIndex = args.indexOf("--as-of");
  const asOf = asOfIndex >= 0 ? args[asOfIndex + 1] : todayJst();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) throw new Error("--as-of は YYYY-MM-DD で指定する");

  const changed = [];
  const errors = [];
  for (const slug of fs.readdirSync(FESTIVALS_DIR).sort()) {
    const file = path.join(FESTIVALS_DIR, slug, "data.js");
    if (!fs.existsSync(file)) continue;
    const source = fs.readFileSync(file, "utf8");
    let plan;
    try {
      plan = planFile(source, asOf);
    } catch (err) {
      errors.push(`${slug}: ${err.message}`);
      continue;
    }
    if (plan.error) {
      errors.push(`${slug}: ${plan.error}`);
      continue;
    }
    if (plan.years.length === 0) continue;
    changed.push({ slug, years: plan.years });
    if (!dryRun) fs.writeFileSync(file, plan.source);
  }

  console.log(`基準日: ${asOf}${dryRun ? "（dry-run）" : ""}`);
  console.log(`ended化${dryRun ? "対象" : ""}: ${changed.length}件`);
  changed.forEach(({ slug, years }) => console.log(`  ${slug} (${years.join(",")})`));
  errors.forEach((message) => console.error(`ERROR ${message}`));

  if (regenerate && !dryRun && changed.length > 0) {
    const scripts = path.join(__dirname);
    execFileSync("node", [path.join(scripts, "generate-static-content.js"), ...changed.map((c) => c.slug)], { stdio: "inherit" });
    HUB_SCRIPTS.forEach((name) => execFileSync("node", [path.join(scripts, name)], { stdio: "inherit" }));
  }
  console.log(`SUMMARY as_of=${asOf} ended=${changed.length} errors=${errors.length}`);
  return errors.length ? 1 : 0;
}

if (require.main === module) {
  try {
    process.exit(run(process.argv.slice(2)));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = { planFile, isAllPast, todayJst };
