#!/usr/bin/env node
// 週次保守の機械的チェックをまとめて実行する読み取り専用スクリプト（LLM不要）。
// 一次情報の再確認や変更判断はここでは行わない。結果を表で出し、人間/AIは「要確認」だけを見る。
//
// 実行: node matsuri/scripts/weekly-health-check.js [--json] [--save] [--skip-urls] [--skip-media] [--skip-gh]
//   --json         結果をJSONで出力（既定はMarkdown表）
//   --save         URL/動画チェック結果を matsuri/research/health-check-last.json に保存（次回との差分用）
//   --skip-urls    出典URLのGET確認を省略
//   --skip-media   動画(oEmbed)確認を省略
//   --skip-gh      今週末ワークフロー・日次cronの実行確認を省略
// 終了コード: fail が1件でもあれば1。

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..", "..");
const FESTIVALS_DIR = path.join(ROOT, "matsuri", "festivals");
const LAST_FILE = path.join(ROOT, "matsuri", "research", "health-check-last.json");
const TODAY = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date());
const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);

const results = [];
const add = (name, status, detail, items = []) => results.push({ name, status, detail, items });

function loadAll() {
  const festivals = [];
  for (const slug of fs.readdirSync(FESTIVALS_DIR).sort()) {
    const file = path.join(FESTIVALS_DIR, slug, "data.js");
    if (!fs.existsSync(file)) continue;
    const source = fs.readFileSync(file, "utf8");
    let data = null;
    let syntaxError = null;
    try {
      new vm.Script(source, { filename: file });
      data = new Function(`${source}\nreturn FESTIVAL;`)();
    } catch (err) {
      syntaxError = err.message;
    }
    festivals.push({ slug, file, data, syntaxError });
  }
  return festivals;
}

function checkSyntax(festivals) {
  const bad = festivals.filter((f) => f.syntaxError).map((f) => `${f.slug}: ${f.syntaxError}`);
  add("data.js 構文 (node --check 相当)", bad.length ? "fail" : "ok", `${festivals.length}件中 不正${bad.length}件`, bad);
}

function checkGitDiff() {
  try {
    execFileSync("git", ["diff", "--check"], { cwd: ROOT, stdio: "pipe" });
    add("git diff --check", "ok", "問題なし");
  } catch (err) {
    const out = `${err.stdout || ""}${err.stderr || ""}`.trim().split("\n").slice(0, 10);
    add("git diff --check", "fail", "空白エラーあり", out);
  }
}

function checkIntegrity() {
  let out = "";
  let code = 0;
  try {
    out = execFileSync("node", [path.join(__dirname, "check-data-integrity.js")], { encoding: "utf8" });
  } catch (err) {
    out = err.stdout || "";
    code = err.status || 1;
  }
  const m = out.match(/hard issue:\s*(\d+)件\s*\/\s*heuristic候補:\s*(\d+)件/);
  const lines = out.split("\n").filter((l) => /^\[(HARD|HEURISTIC)\]/.test(l) || /^\s+- /.test(l)).map((l) => l.trim().replace(/^- /, "")).slice(0, 20);
  if (!m) return add("データ整合性 (check-data-integrity)", "fail", "出力を解釈できない", [out.slice(0, 300)]);
  const hard = Number(m[1]);
  add("データ整合性 (check-data-integrity)", hard || code ? "fail" : "ok", `hard ${hard}件 / heuristic ${m[2]}件`, lines);
}

function checkIds(festivals) {
  const problems = [];
  const seenId = new Map();
  for (const { slug, data } of festivals) {
    if (!data) continue;
    if (data.id !== slug) problems.push(`${slug}: id(${data.id})とディレクトリ名が不一致`);
    if (seenId.has(data.id)) problems.push(`id重複: ${data.id} (${seenId.get(data.id)}, ${slug})`);
    seenId.set(data.id, slug);
  }
  try {
    const src = fs.readFileSync(path.join(ROOT, "matsuri", "shared", "festival-slugs.js"), "utf8");
    const listed = new Function(`${src}\nreturn FESTIVAL_SLUGS;`)();
    const dirs = new Set(festivals.map((f) => f.slug));
    const dup = listed.filter((s, i) => listed.indexOf(s) !== i);
    dup.forEach((s) => problems.push(`FESTIVAL_SLUGS重複: ${s}`));
    listed.filter((s) => !dirs.has(s)).forEach((s) => problems.push(`FESTIVAL_SLUGSにあるがdata.jsなし: ${s}`));
    [...dirs].filter((s) => !listed.includes(s)).forEach((s) => problems.push(`data.jsはあるがFESTIVAL_SLUGS未登録: ${s}`));
  } catch (err) {
    problems.push(`festival-slugs.js 読込失敗: ${err.message}`);
  }
  add("id / slug / FESTIVAL_SLUGS 整合", problems.length ? "fail" : "ok", `問題${problems.length}件`, problems);
}

function checkDetailPages(festivals) {
  const problems = [];
  for (const { slug, data } of festivals) {
    const file = path.join(FESTIVALS_DIR, slug, "index.html");
    if (!fs.existsSync(file)) {
      problems.push(`${slug}: index.htmlなし`);
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
    const expected = `https://vigorlab.net/matsuri/festivals/${slug}/`;
    if (!canon) problems.push(`${slug}: canonicalなし`);
    else if (canon[1] !== expected) problems.push(`${slug}: canonical不一致 (${canon[1]})`);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    // 日程が1件も無い祭りは generate-static-content.js が意図的にJSON-LDを出さない。
    const hasDates = (data?.yearlyInfo || []).some((y) => Array.isArray(y.dates) && y.dates.length > 0);
    if (blocks.length === 0 && hasDates) problems.push(`${slug}: 日程があるのにJSON-LDなし`);
    blocks.forEach((b, i) => {
      try {
        JSON.parse(b[1]);
      } catch (err) {
        problems.push(`${slug}: JSON-LD(${i + 1})がJSONとして不正`);
      }
    });
  }
  add("詳細ページ canonical / JSON-LD", problems.length ? "fail" : "ok", `問題${problems.length}件`, problems.slice(0, 30));
}

function checkDateConsistency(festivals) {
  const warns = [];
  const pending = [];
  const live = [];
  const soon = [];
  const addDays = (iso, n) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
  const horizon = addDays(TODAY, 14);
  for (const { slug, data } of festivals) {
    for (const y of data?.yearlyInfo || []) {
      const dates = Array.isArray(y.dates) ? y.dates.filter(Boolean).sort() : [];
      if (dates.length === 0) continue;
      const first = dates[0];
      const last = dates[dates.length - 1];
      if (["confirmed", "scheduled_pending_official"].includes(y.eventStatus) && last < TODAY) {
        pending.push(`${slug} (${y.year}): ${y.eventStatus}, dates=${dates.join(",")}`);
      }
      if (y.eventStatus === "ended" && last >= TODAY) warns.push(`${slug} (${y.year}): ended だが ${last} は今日以降`);
      if (y.eventStatus === "confirmed" && first <= TODAY && TODAY <= last) live.push(`${slug} (${first}〜${last})`);
      else if (y.eventStatus === "confirmed" && first > TODAY && first <= horizon) soon.push(`${slug} (${first})`);
    }
  }
  add("開催日と eventStatus の整合", warns.length ? "warn" : "ok", `ended矛盾${warns.length}件 / 開催中${live.length}件 / 14日以内に開催${soon.length}件`, [
    ...warns,
    ...live.map((s) => `開催中: ${s}`),
    ...soon.map((s) => `まもなく: ${s}`)
  ].slice(0, 40));
  add("日次ended化の更新漏れ（読み取り専用）", pending.length ? "fail" : "ok",
    `日本時間 ${TODAY} / 残存${pending.length}件（全年度、週次では修正しない）`, pending);
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  }));
  return out;
}

async function fetchStatus(url, { method = "GET" } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "Mozilla/5.0 (compatible; VigorMatsuriHealthCheck/1.0)", accept: "text/html,*/*" }
    });
    if (res.body) res.body.cancel().catch(() => {});
    return { status: res.status };
  } catch (err) {
    return { status: 0, error: err.name === "AbortError" ? "timeout" : (err.cause?.code || err.message) };
  } finally {
    clearTimeout(timer);
  }
}

// 404/410のみ「リンク切れ」とみなす。403/429/5xx/タイムアウトは確定できないので「要確認」。
function classify(status) {
  if (status >= 200 && status < 400) return "ok";
  if (status === 404 || status === 410) return "broken";
  return "uncertain";
}

function previousResults() {
  try {
    return JSON.parse(fs.readFileSync(LAST_FILE, "utf8"));
  } catch (_) {
    return {};
  }
}

async function checkSourceUrls(festivals, prev, store) {
  const owners = new Map();
  for (const { slug, data } of festivals) {
    const urls = [
      ...(data?.constantInfo?.confirmation?.sources || []),
      ...(data?.yearlyInfo || []).flatMap((y) => y.confirmation?.sources || [])
    ];
    urls.filter((u) => /^https?:\/\//.test(u)).forEach((u) => {
      if (!owners.has(u)) owners.set(u, new Set());
      owners.get(u).add(slug);
    });
  }
  const urls = [...owners.keys()];
  const res = await mapLimit(urls, 8, (u) => fetchStatus(u));
  const state = {};
  urls.forEach((u, i) => {
    state[u] = { cls: classify(res[i].status), status: res[i].status || res[i].error };
  });
  store.sourceUrls = state;
  const prevState = prev.sourceUrls || {};
  const broken = urls.filter((u) => state[u].cls === "broken");
  const uncertain = urls.filter((u) => state[u].cls === "uncertain");
  const hasBaseline = Boolean(prev.sourceUrls);
  const newlyBad = hasBaseline ? urls.filter((u) => state[u].cls !== "ok" && (prevState[u]?.cls || "ok") === "ok") : [];
  const label = (u) => `${[...owners.get(u)].join(",")}: ${u} [${state[u].status}]`;
  add("出典URL (GET確認)", broken.length ? "warn" : "ok",
    `${urls.length}件中 リンク切れ(404/410)${broken.length}件 / 要確認(403・429・5xx・timeout等)${uncertain.length}件 / 前回から新規に異常${newlyBad.length}件`,
    [...newlyBad.map((u) => `新規: ${label(u)}`), ...broken.filter((u) => !newlyBad.includes(u)).map((u) => `継続: ${label(u)}`)].slice(0, 40));
}

function mediaRefs(festivals) {
  const refs = new Map();
  const put = (slug, id, kind) => {
    if (!id) return;
    if (!refs.has(id)) refs.set(id, { slugs: new Set(), kinds: new Set() });
    refs.get(id).slugs.add(slug);
    refs.get(id).kinds.add(kind);
  };
  for (const { slug, data } of festivals) {
    const c = data?.constantInfo || {};
    (c.atmosphereMedia || []).filter((m) => m.type === "youtube").forEach((m) => put(slug, m.contentId, "atmosphereMedia"));
    if (c.backgroundImage?.type === "youtube") put(slug, c.backgroundImage.contentId, "backgroundImage");
  }
  return refs;
}

async function checkMedia(festivals, prev, store) {
  const refs = mediaRefs(festivals);
  const ids = [...refs.keys()];
  const res = await mapLimit(ids, 6, (id) =>
    fetchStatus(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`));
  const state = {};
  ids.forEach((id, i) => {
    // 401/403は埋め込み不可・非公開、404は削除。いずれも掲載不可の可能性があるので別扱いで報告する。
    const s = res[i].status;
    state[id] = { cls: s === 200 ? "ok" : (s === 401 || s === 403 || s === 404 ? "unavailable" : "uncertain"), status: s || res[i].error };
  });
  store.media = state;
  const bad = ids.filter((id) => state[id].cls === "unavailable");
  const unsure = ids.filter((id) => state[id].cls === "uncertain");
  const newlyBad = prev.media ? bad.filter((id) => (prev.media[id]?.cls || "ok") === "ok") : [];
  const label = (id) => `${[...refs.get(id).slugs].join(",")} (${[...refs.get(id).kinds].join("/")}): ${id} [${state[id].status}]`;
  add("動画 (YouTube oEmbed)", bad.length ? "warn" : "ok",
    `${ids.length}本中 削除・非公開・埋込不可${bad.length}本 / 要確認${unsure.length}本 / 前回から新規${newlyBad.length}本`,
    [...bad.map((id) => `${newlyBad.includes(id) ? "新規" : "継続"}: ${label(id)}`), ...unsure.map((id) => `要確認: ${label(id)}`)].slice(0, 40));
}

function checkWeekendWorkflow() {
  try {
    const out = execFileSync("gh", ["run", "list", "--workflow", "weekend-page.yml", "--status", "success", "--limit", "1", "--json", "createdAt,updatedAt,databaseId"],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    const run = JSON.parse(out)[0];
    if (!run) return add("今週末ページ自動更新", "warn", "成功したrunが見つからない");
    const hours = (Date.now() - Date.parse(run.updatedAt)) / 3600000;
    add("今週末ページ自動更新", hours > 48 ? "warn" : "ok", `最終成功 ${run.updatedAt} (${hours.toFixed(1)}時間前, run ${run.databaseId})`);
  } catch (err) {
    add("今週末ページ自動更新", "skip", `gh を利用できないため確認なし (${String(err.message).split("\n")[0]})`);
  }
}

function checkDailyCron() {
  const name = "日次cron / ended化ステップ";
  try {
    // 成功runだけに絞ると直近の失敗を隠してしまう。手動・push実行とも区別する。
    const out = execFileSync("gh", ["run", "list", "--workflow", "weekend-page.yml", "--branch", "main", "--event", "schedule", "--limit", "1", "--json", "status,conclusion,createdAt,databaseId,url"],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    const run = JSON.parse(out)[0];
    if (!run) return add(name, "warn", "mainの日次schedule実行が見つからない");
    const items = [`run ${run.databaseId}: ${run.url}`];
    const hours = (Date.now() - Date.parse(run.createdAt)) / 3600000;
    const jobs = JSON.parse(execFileSync("gh", ["run", "view", String(run.databaseId), "--json", "jobs"],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })).jobs || [];
    const steps = jobs.flatMap((job) => job.steps || []);
    const ended = steps.find((step) => step.name === "End finished festivals");
    items.push(...steps.filter((step) => step.conclusion === "failure").map((step) => `失敗ステップ: ${step.name}`));
    const failed = run.status === "completed" && run.conclusion !== "success";
    const stepFailed = ended?.conclusion === "failure";
    const ok = run.status === "completed" && run.conclusion === "success"
      && ended?.status === "completed" && ended.conclusion === "success" && hours <= 48;
    add(name, failed || stepFailed ? "fail" : (ok ? "ok" : "warn"),
      `最新schedule: ${run.status}/${run.conclusion || "未確定"} / 開始 ${run.createdAt} (${hours.toFixed(1)}時間前) / ended化: ${ended ? `${ended.status}/${ended.conclusion || "未確定"}` : "ステップなし"}（週次では再実行しない）`, items);
  } catch (err) {
    add(name, "warn", `取得できず動作未確認 (${String(err.message).split("\n")[0]})`);
  }
}

function render() {
  const mark = { ok: "OK", warn: "要確認", fail: "NG", skip: "SKIP" };
  const lines = [`# MATSURI 週次ヘルスチェック (${TODAY})`, "", "| チェック | 結果 | 内容 |", "|---|---|---|"];
  results.forEach((r) => lines.push(`| ${r.name} | ${mark[r.status]} | ${r.detail} |`));
  results.filter((r) => r.items.length).forEach((r) => {
    lines.push("", `## ${r.name}`, ...r.items.map((i) => `- ${i}`));
  });
  return lines.join("\n");
}

async function main() {
  const festivals = loadAll();
  const prev = previousResults();
  const store = {};
  checkSyntax(festivals);
  checkGitDiff();
  checkIntegrity();
  checkIds(festivals);
  checkDetailPages(festivals);
  checkDateConsistency(festivals);
  if (!has("--skip-urls")) await checkSourceUrls(festivals, prev, store);
  if (!has("--skip-media")) await checkMedia(festivals, prev, store);
  if (!has("--skip-gh")) {
    checkWeekendWorkflow();
    checkDailyCron();
  }

  if (has("--save") && (store.sourceUrls || store.media)) {
    fs.writeFileSync(LAST_FILE, `${JSON.stringify({ checkedAt: TODAY, sourceUrls: store.sourceUrls || prev.sourceUrls, media: store.media || prev.media }, null, 1)}\n`);
  }
  console.log(has("--json") ? JSON.stringify({ date: TODAY, results }, null, 2) : render());
  return results.some((r) => r.status === "fail") ? 1 : 0;
}

main().then((code) => process.exit(code), (err) => {
  console.error(err);
  process.exit(1);
});
