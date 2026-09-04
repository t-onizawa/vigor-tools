#!/usr/bin/env node
// VIGOR MATSURI Data Integrity Checker v0.1
//
// 全festivals/*/data.jsを対象に、機械的に判定できる構造的矛盾（hard）と、
// キーワード照合による確度の低い矛盾候補（heuristic、レビュー前提）を検出する。
// 新しい管理画面は作らず、CLIから実行するだけの読み取り専用スクリプト。
//
// 実行: node matsuri/scripts/check-data-integrity.js
// 終了コード: hard issueが1件でもあれば1、無ければ0（CIやタスクのゲートに使える）

const fs = require("fs");
const path = require("path");

const FESTIVALS_DIR = path.join(__dirname, "..", "festivals");
const TODAY = new Date().toISOString().slice(0, 10);

const VALID_FEATURE_VALUES = new Set([true, false, null, "n/a"]);
const FEATURE_KEYS = ["hasDashi", "hasMikoshi", "hasDanceOnDashi", "hasParade"];

// v0.1の設計変更（実データで検証した結果）：
// 特徴フラグ⇔本文のキーワード照合ヒューリスティックは実装したが、164件の実データで
// 検証したところ169件中ほぼ全てが誤検知だった（「ではなく」等の否定表現を拾えない、
// 「舞楽」の「舞」等の一文字一致で無関係な語にマッチする等）。この種の意味的な整合性
// 判定は正規表現では解けず、Founderの設計意図どおり「曖昧な判定はAI/人間が読んで
// 判断する」領域として扱う。誤検知だらけの機械チェックを残すとノイズで本当に重要な
// hard issueが埋もれるため、v0.1では実装しない（キーワード照合コードは削除済み）。

function loadFestival(slug) {
  const file = path.join(FESTIVALS_DIR, slug, "data.js");
  if (!fs.existsSync(file)) return null;
  const source = fs.readFileSync(file, "utf8");
  try {
    return new Function(`${source}\nreturn FESTIVAL;`)();
  } catch (err) {
    return { __parseError: err.message };
  }
}

function extractDateHints(text) {
  if (!text) return [];
  const hints = new Set();
  const isoMatches = text.match(/\d{4}-\d{2}-\d{2}/g) || [];
  isoMatches.forEach((m) => hints.add(m));
  const jpMatches = text.match(/\d{1,2}月\d{1,2}日/g) || [];
  jpMatches.forEach((m) => hints.add(m));
  return [...hints];
}

function checkNoteDateHints(festival, yearly) {
  const findings = [];
  const note = yearly?.confirmation?.note;
  if (!note) return findings;

  // 「調査時点（2026-07-28）」「2026-09-04時点で」のような、イベント日ではなく
  // 確認・再確認を行った日を指すISO日付は除外する（v0.1実データ検証で判明した
  // 誤検知パターン：「時点」の前後6文字以内に現れるISO日付は確認日とみなす）
  const isoWithContext = [...note.matchAll(/\d{4}-\d{2}-\d{2}/g)].map((m) => {
    const start = Math.max(0, m.index - 6);
    const end = m.index + m[0].length + 6;
    return { date: m[0], context: note.slice(start, end) };
  });

  const knownConfirmedDates = new Set(
    [festival.constantInfo?.confirmation?.confirmedDate, yearly.confirmation?.confirmedDate].filter(Boolean)
  );

  const dates = Array.isArray(yearly.dates) ? yearly.dates : [];
  const mismatched = isoWithContext
    .filter(({ date, context }) => !dates.includes(date) && !context.includes("時点") && !knownConfirmedDates.has(date))
    .map(({ date }) => date);

  if (mismatched.length > 0) {
    findings.push({
      type: "note_date_hint_mismatch",
      detail: `confirmation.noteに登場する日付がyearlyInfo.datesに無い: ${mismatched.join(", ")}`
    });
  }
  return findings;
}

function checkFestival(slug, festival) {
  const hard = [];
  const heuristic = [];

  if (festival.__parseError) {
    hard.push({ type: "parse_error", detail: festival.__parseError });
    return { hard, heuristic };
  }

  const features = festival.constantInfo?.features || {};
  FEATURE_KEYS.forEach((key) => {
    if (!VALID_FEATURE_VALUES.has(features[key])) {
      hard.push({ type: "invalid_feature_value", detail: `${key}=${JSON.stringify(features[key])}` });
    }
  });

  const yearly = festival.yearlyInfo?.[0];
  if (!yearly) {
    hard.push({ type: "no_yearly_info" });
    return { hard, heuristic };
  }

  const status = yearly.eventStatus;
  const dates = Array.isArray(yearly.dates) ? yearly.dates : [];

  const hasParking = yearly.access?.hasParking;
  if (hasParking !== true && hasParking !== false && hasParking !== null) {
    hard.push({ type: "invalid_parking_value", detail: `hasParking=${JSON.stringify(hasParking)}` });
  }

  if (["confirmed", "ended"].includes(status) && dates.length === 0) {
    hard.push({ type: "status_requires_dates", detail: `status=${status}だがdatesが空` });
  }

  if (dates.length > 0) {
    const allPast = dates.every((d) => d < TODAY);
    const allFutureOrToday = dates.every((d) => d >= TODAY);

    if (status === "ended" && !allPast) {
      hard.push({ type: "ended_but_not_past", detail: `dates=${dates.join(",")}（未来日を含む）` });
    }
    if (status === "confirmed" && allPast) {
      hard.push({ type: "confirmed_but_all_past", detail: `dates=${dates.join(",")}（全て過去日、ended漏れの疑い）` });
    }
    if (["scheduled_pending_official", "unconfirmed"].includes(status) && allPast) {
      hard.push({ type: "unconfirmed_like_but_all_past", detail: `status=${status}, dates=${dates.join(",")}（全て過去日）` });
    }
  }

  if (status === "off_year" && dates.length > 0) {
    heuristic.push({ type: "off_year_has_dates", detail: `dates=${dates.join(",")}（小規模な例大祭等の可能性、要確認）` });
  }

  const constConfirm = festival.constantInfo?.confirmation;
  if (constConfirm?.verified === true && (!constConfirm.sources || constConfirm.sources.length === 0)) {
    hard.push({ type: "verified_true_no_sources" });
  }

  if (["confirmed", "scheduled_pending_official", "ended", "off_year"].includes(status)) {
    const yc = yearly.confirmation;
    if (!yc || !yc.sources || yc.sources.length === 0) {
      hard.push({ type: "status_confirmed_like_no_yearly_sources", detail: `status=${status}` });
    }
  }

  heuristic.push(...checkNoteDateHints(festival, yearly));

  return { hard, heuristic };
}

function main() {
  const slugs = fs
    .readdirSync(FESTIVALS_DIR)
    .filter((s) => fs.statSync(path.join(FESTIVALS_DIR, s)).isDirectory())
    .sort();

  let hardTotal = 0;
  let heuristicTotal = 0;
  const results = [];

  slugs.forEach((slug) => {
    const festival = loadFestival(slug);
    if (!festival) return;
    const { hard, heuristic } = checkFestival(slug, festival);
    if (hard.length > 0 || heuristic.length > 0) {
      results.push({ slug, hard, heuristic });
      hardTotal += hard.length;
      heuristicTotal += heuristic.length;
    }
  });

  console.log(`=== VIGOR MATSURI Data Integrity Check v0.1 ===`);
  console.log(`実行日: ${TODAY}`);
  console.log(`対象: ${slugs.length}件`);
  console.log(`hard issue: ${hardTotal}件 / heuristic候補: ${heuristicTotal}件`);
  console.log("");

  results.forEach(({ slug, hard, heuristic }) => {
    if (hard.length > 0) {
      console.log(`[HARD] ${slug}`);
      hard.forEach((i) => console.log(`  - ${i.type}: ${i.detail || ""}`));
    }
    if (heuristic.length > 0) {
      console.log(`[HEURISTIC] ${slug}`);
      heuristic.forEach((i) => console.log(`  - ${i.type}: ${i.detail || ""}`));
    }
  });

  if (hardTotal > 0) {
    console.log("");
    console.log(`FAIL: hard issueが${hardTotal}件あります。`);
    process.exit(1);
  } else {
    console.log("");
    console.log("PASS: hard issueはありません。");
    process.exit(0);
  }
}

main();
