// npm依存なし。日付指定の検証・書き込み検証はメモリ／OS一時領域のみ。
const assert = require("assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");
const { execFileSync, spawnSync } = require("child_process");
const page = require("./generate-weekend-page");
const { loadHubData, MATSURI_ROOT } = require("./lib/hub-shared");
const tests = [];
function test(name, fn) { fn(); tests.push(name); console.log(`PASS ${name}`); }
function festival(id, dates, extra = {}) {
  return { id, name: id, prefecture: "東京都", city: "テスト市", areaTag: "tokyo", constantInfo: { features: {}, access: {} }, yearlyInfo: [{ year: Number(dates[0]?.slice(0, 4) || 2026), eventStatus: "confirmed", dates, access: { hasParking: null }, confirmation: { confirmedDate: "2026-01-01" }, ...extra }] };
}
const generate = (festivals, asOf, existing = "") => page.generate({ festivals, asOf, existing, experienceTags: {}, cssVersion: "52" });
test("日曜・月曜・JST境界", () => {
  assert.deepEqual(page.weekendRange("2026-10-25"), { start: "2026-10-24", end: "2026-10-25" });
  assert.deepEqual(page.weekendRange("2026-10-26"), { start: "2026-10-31", end: "2026-11-01" });
  assert.equal(page.todayJst(new Date("2026-10-24T16:00:00Z")), "2026-10-25");
});
test("カード日付の過去日除去・連続まとめ・ほか・年またぎ", () => {
  assert.equal(page.formatCardDates(["2026-10-18", "2026-10-19", "2026-10-20", "2026-10-22", "2026-10-24", "2026-10-26"], "2026-10-19"), "10月19日〜10月20日・10月22日・10月24日ほか");
  assert.equal(page.formatCardDates(["2026-10-30", "2026-10-31", "2026-11-01", "2026-11-02", "2026-11-03"], "2026-10-19"), "10月30日〜11月3日");
  assert.equal(page.formatCardDates(["2026-12-31", "2027-01-01"], "2026-12-30"), "12月31日〜2027年1月1日");
  assert.equal(page.formatCardDates(["2027-01-02"], "2026-12-30"), "2027年1月2日");
  const rendered = generate([festival("remaining", ["2026-10-18", "2026-10-24", "2026-11-01"])], "2026-10-19").html;
  assert(rendered.includes('<p class="item-date">10月24日・11月1日</p>'));
  assert(rendered.includes('data-end="2026-11-01"'));
});
test("年またぎ週末", () => {
  assert.deepEqual(page.weekendRange("2026-12-26"), { start: "2026-12-26", end: "2026-12-27" });
  assert.deepEqual(page.weekendRange("2026-12-31"), { start: "2027-01-02", end: "2027-01-03" });
  assert.deepEqual(page.weekendRange("2027-12-29"), { start: "2028-01-01", end: "2028-01-02" });
  assert.deepEqual(page.weekendRange("2022-12-29"), { start: "2022-12-31", end: "2023-01-01" });
  const cross = generate([festival("cross", ["2022-12-31", "2023-01-01"], { year: 2022, confirmation: { confirmedDate: "2022-12-01" } })], "2022-12-29");
  assert(cross.html.includes("12/31(土)〜1/1(日)"));
  assert(cross.html.includes("2023年1月1日"));
});
test("開催年・確認日・前年コピー疑い", () => {
  const future = festival("future", ["2027-01-02"], { year: 2027, confirmation: { confirmedDate: "2026-12-10" } });
  const cross = festival("cross", ["2026-12-31", "2027-01-01"], { year: 2026 });
  const wrong = festival("wrong", ["2026-12-20"], { year: 2027 });
  const model = page.buildModel([future, cross, wrong], "2026-12-31");
  assert.equal(model.weekend[0].festival.id, "future");
  assert(model.upcoming.some((i) => i.festival.id === "cross"));
  assert.equal(model.excluded.date_before_entry_year, 1);
  for (const dates of [["2026-01-02", "2028-01-01"], ["2027-01-02"]]) assert.equal(page.confirmedEntry(festival("bad", dates), { ...future.yearlyInfo[0], year: 2026, dates }, "2026-12-31").reason, "date_year_mismatch");
  const missing = festival("missing", ["2027-01-02"], { confirmation: {} });
  assert.equal(page.buildModel([missing], "2026-12-31").excluded.confirmation_missing_or_invalid, 1);
  const futureCheck = festival("future-check", ["2027-01-02"], { confirmation: { confirmedDate: "2027-01-01" } });
  assert.equal(page.buildModel([futureCheck], "2026-12-31").excluded.confirmation_in_future, 1);
  future.yearlyInfo.push({ year: 2026, eventStatus: "ended", dates: ["2026-12-20"] });
  const warning = page.buildModel([future], "2026-12-31");
  assert.equal(warning.weekend.length, 1);
  assert.match(warning.warnings[0], /^::warning::future:.*2026-12-10.*2026-12-20/);
});
test("0件・確認済み以外除外・6件合成ケース", () => {
  const statuses = ["scheduled_pending_official", "unconfirmed", "cancelled", "off_year", "ended", "postponed"];
  const input = statuses.map((status) => festival(status, ["2026-10-24"], { eventStatus: status }));
  assert.equal(generate(input, "2026-10-24").model.weekend.length, 0);
  assert(!generate(input, "2026-10-24").html.includes('id="this-weekend-section"'));
  assert.equal(page.buildModel([input[4]], "2026-10-24", { includeEnded: true }).weekend.length, 1);
  const six = Array.from({ length: 6 }, (_, i) => festival(`six-${i}`, ["2026-10-24"]));
  assert.equal(generate(six, "2026-10-24").model.weekend.length, 6);
  const empty = generate([], "2026-11-21");
  assert(empty.html.includes("に開催が確認できた祭りはありません。"));
  assert(empty.html.includes('id="find-festivals"'));
  assert(empty.html.includes('id="publication-policy"'));
});
test("14日窓・次週末・おすすめ上限・参考情報", () => {
  const input = [festival("weekend", ["2026-10-24"]), festival("boundary", ["2026-11-01"]), festival("outside", ["2026-11-02"]), ...Array.from({ length: 10 }, (_, i) => festival(`later-${i}`, ["2026-12-10"]))];
  const model = page.buildModel(input, "2026-10-19");
  assert.equal(model.upcoming.length, 1);
  assert.equal(model.upcoming[0].festival.id, "boundary");
  assert.equal(model.nextWeekend.length, 0);
  assert.equal(model.nextRange, null);
  assert(!generate(input, "2026-10-19").html.includes('id="next-weekend-section"'));
  assert.equal(model.recommendations.length, 6);
  assert(!model.recommendations.some((i) => ["weekend", "boundary"].includes(i.festival.id)));
  const ref = generate([festival("historical", ["2026-11-02"], { eventStatus: "ended" })], "2027-11-01");
  assert.equal(ref.model.references.length, 1);
  assert(ref.html.includes("例年は11月ごろ・次回の日程は未発表"));
  assert(!ref.html.includes('data-end="2026-11-02"'));
});
test("次の週末は掲載済みを除外して未掲載の最初の週末を選ぶ", () => {
  const input = [festival("current", ["2026-10-24", "2026-11-07"]), festival("soon", ["2026-10-31", "2026-11-07"]), festival("unseen", ["2026-11-14"]), festival("later", ["2026-11-21"])];
  const model = page.buildModel(input, "2026-10-19");
  assert.deepEqual(model.nextRange, { start: "2026-11-14", end: "2026-11-15" });
  assert.deepEqual(model.nextWeekend.map((item) => item.festival.id), ["unseen"]);
  assert.deepEqual(model.recommendations.map((item) => item.festival.id), ["later"]);
  const ids = [...model.weekend, ...model.upcoming, ...model.nextWeekend, ...model.recommendations].map((item) => item.festival.id);
  assert.equal(new Set(ids).size, ids.length);
});
test("更新日据え置き・データ変更・atomic write", () => {
  const input = [festival("one", ["2026-11-10"])];
  const first = generate(input, "2026-10-19");
  const second = generate(input, "2026-10-20", first.html);
  assert.equal(second.changed, false);
  assert.equal(second.html, first.html);
  input[0].name = "内容変更";
  assert.equal(generate(input, "2026-10-20", first.html).changed, true);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "matsuri-weekend-test-"));
  try { const target = path.join(dir, "index.html"); page.atomicWrite(target, first.html); assert.equal(fs.readFileSync(target, "utf8"), first.html); assert.equal(fs.readdirSync(dir).length, 1); }
  finally { fs.rmSync(dir, { recursive: true }); }
});
test("古い情報防止をDOMスタブで実行", () => {
  const old = { dataset: { end: "2026-10-25" }, hidden: false }, future = { dataset: { end: "2026-11-10" }, hidden: false };
  const weekend = { hidden: false, querySelectorAll: () => [old] };
  const upcoming = { hidden: false, querySelectorAll: () => [old, future] };
  const banner = { hidden: true }, lead = { hidden: false };
  const main = { dataset: { weekendEnd: "2026-10-25" }, querySelectorAll: (selector) => selector === ".festival-item[data-end]" ? [old, future] : [weekend, upcoming] };
  class MockDate extends Date { constructor(...args) { super(...(args.length ? args : ["2026-10-25T16:00:00Z"])); } }
  vm.runInNewContext(fs.readFileSync(path.join(MATSURI_ROOT, "shared/weekend-page.js"), "utf8"), { Date: MockDate, Intl, document: { querySelector: () => main, getElementById: (id) => ({ "this-weekend-section": weekend, "weekend-stale-banner": banner, "weekend-lead": lead })[id] } });
  assert.equal(lead.hidden, true);
  assert.equal(banner.hidden, false); assert.equal(weekend.hidden, true); assert.equal(old.hidden, true); assert.equal(future.hidden, false); assert.equal(upcoming.hidden, false);
});
test("robots・JSON-LD・release gate合成成功", () => {
  const html = generate([], "2026-10-19").html;
  assert(html.includes(`<meta name="robots" content="${page.ROBOTS_CONTENT}">`));
  const json = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  assert.deepEqual(json.map((j) => j["@type"]), ["BreadcrumbList", "ItemList"]);
  assert.equal(json[1].dateModified, "2026-10-19");
  assert(page.releaseGate(html, "", "").every(([, ok]) => !ok));
  const ready = html.replace('content="noindex,follow"', 'content="index,follow"');
  assert(page.releaseGate(ready, '<a href="/matsuri/this-weekend/">週末</a>', '<url><loc>https://vigorlab.net/matsuri/this-weekend/</loc></url>', "index,follow").every(([, ok]) => ok));
});
test("TZ=UTC / Asia/Tokyoで出力一致", () => {
  const script = `const p=require(${JSON.stringify(path.join(__dirname, "generate-weekend-page.js"))});const {loadHubData}=require(${JSON.stringify(path.join(__dirname, "lib/hub-shared.js"))});const d=loadHubData();process.stdout.write(p.generate({festivals:d.items.map(i=>i.festival),experienceTags:d.experienceTags,cssVersion:d.cssVersion,asOf:'2026-12-31'}).html);`;
  assert.equal(execFileSync(process.execPath, ["-e", script], { env: { ...process.env, TZ: "UTC" }, encoding: "utf8" }), execFileSync(process.execPath, ["-e", script], { env: { ...process.env, TZ: "Asia/Tokyo" }, encoding: "utf8" }));
});
const real = loadHubData();
const snapshots = {};
for (const asOf of ["2026-10-19", "2026-10-24", "2026-10-25", "2026-10-26", "2026-11-21", "2026-12-05", "2026-12-26", "2026-12-31", "2027-01-02"]) {
  const r = page.generate({ festivals: real.items.map((i) => i.festival), experienceTags: real.experienceTags, cssVersion: real.cssVersion, asOf });
  snapshots[asOf] = { weekend: r.model.weekend.length, upcoming: r.model.upcoming.length, nextWeekend: r.model.nextWeekend.length, recommendations: r.model.recommendations.length, references: r.model.references.length, excluded: r.model.excluded, warnings: r.model.warnings };
  if (asOf === "2027-01-02") assert([...r.model.weekend, ...r.model.upcoming, ...r.model.recommendations].every((i) => i.dates.some((d) => d >= asOf)));
}
console.log("実データ検証（メモリ上）", JSON.stringify(snapshots, null, 2));
test("--as-ofと--include-endedで本番ファイルが変わらない", () => {
  const before = fs.existsSync(page.OUTPUT) ? fs.readFileSync(page.OUTPUT, "utf8") : null;
  for (const args of [["--as-of", "2026-11-21", "--check"], ["--include-ended", "--summary"]]) {
    const run = spawnSync(process.execPath, [path.join(__dirname, "generate-weekend-page.js"), ...args], { encoding: "utf8" }); assert.equal(run.status, 0, run.stderr);
  }
  assert.equal(fs.existsSync(page.OUTPUT) ? fs.readFileSync(page.OUTPUT, "utf8") : null, before);
});
console.log(`${tests.length}テスト成功`);
if (process.argv.includes("--release-gate")) {
  const html = fs.existsSync(page.OUTPUT) ? fs.readFileSync(page.OUTPUT, "utf8") : "";
  const results = page.releaseGate(html, fs.readFileSync(path.join(MATSURI_ROOT, "index.html"), "utf8"), fs.readFileSync(path.join(MATSURI_ROOT, "../sitemap.xml"), "utf8"));
  console.log("|公開条件|結果|\n|---|---|"); results.forEach(([label, ok]) => console.log(`|${label}|${ok ? "達成" : "未達"}|`));
  if (results.some(([, ok]) => !ok)) process.exitCode = 1;
}
