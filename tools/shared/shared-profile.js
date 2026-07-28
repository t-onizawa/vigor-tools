// VIGOR TOOLS Platform — 共通データ（Profile）
// 複数ツールで再利用する「入力値」を保存する。判断履歴（結果のログ）とは別物。
// ユーザーが明示的に保存した値だけを扱う。壊れたデータ・保存失敗があっても
// ページ全体を止めない。
//
// Guard Rails（2026-07-15・スコープクリープ防止のための設計上の制約）
//
// 1. Profileは目的ではなく手段である。Profileを育てるためにフィールドを
//    追加しない。ツール体験を改善する必要が生まれた結果としてのみ拡張する。
// 2. ダッシュボード・一覧画面は作らない。各フィールドは、それを必要とする
//    個別ツールの中でだけ、文脈付きで表示する。
// 3. 新しいフィールドは「今すでに2つ以上の実在するツールが、その数値の
//    入力欄を持っている」場合にのみ追加する。「将来使うかもしれない」は
//    追加理由にならない。
// 4. 新しいフィールドを作るより、既存ツールの入力値の再利用を優先する。
// 5. 保存は常にユーザーの明示的な操作でのみ行う。自動保存はしない。
// 6. 保存するのは、月々ほぼ変わらない数字だけに限定する。貯蓄額・資産残高
//    のような変動する数字、年齢・名前のような個人属性は保存しない。
// 7. 各フィールドは独立して保存し、合算済みの数値として上書きしない。
//    合計が必要な場面では、参照時に計算する（二重計上を防ぐ）。
// 8. データには必ず更新日を表示し、古い数字を黙って使い回さない。

var VigorProfile = (function () {
  var STORAGE_KEY = 'vigor_profile';
  var CURRENT_VERSION = 1;

  function emptyData() {
    return { version: CURRENT_VERSION, fields: {} };
  }

  function isValidData(data) {
    return !!(
      data &&
      typeof data === 'object' &&
      typeof data.version === 'number' &&
      data.fields &&
      typeof data.fields === 'object'
    );
  }

  function load() {
    var raw;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return emptyData();
    }
    if (!raw) return emptyData();

    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return emptyData();
    }

    if (!isValidData(parsed)) return emptyData();
    return parsed;
  }

  function persist(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  // fieldKey: 例 "monthlySubscriptionTotal"
  // value: 数値または文字列
  // source: この値を入力したツール名（表示用）
  // sourceUrl: そのツールへのリンク（絶対パス）
  function save(fieldKey, value, source, sourceUrl) {
    if (!fieldKey) return false;
    var data = load();
    data.fields[fieldKey] = {
      value: value,
      updatedAt: new Date().toISOString().slice(0, 10),
      source: source || '',
      sourceUrl: sourceUrl || ''
    };
    return persist(data);
  }

  function get(fieldKey) {
    var data = load();
    return Object.prototype.hasOwnProperty.call(data.fields, fieldKey)
      ? data.fields[fieldKey]
      : null;
  }

  function getAll() {
    return load().fields;
  }

  function remove(fieldKey) {
    var data = load();
    if (Object.prototype.hasOwnProperty.call(data.fields, fieldKey)) {
      delete data.fields[fieldKey];
    }
    return persist(data);
  }

  function clear() {
    return persist(emptyData());
  }

  return {
    save: save,
    get: get,
    getAll: getAll,
    remove: remove,
    clear: clear
  };
})();
