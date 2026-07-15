// VIGOR TOOLS Platform — 共通データ（Profile）
// 複数ツールで再利用する「入力値」を保存する。判断履歴（結果のログ）とは別物。
// ユーザーが明示的に保存した値だけを扱う。壊れたデータ・保存失敗があっても
// ページ全体を止めない。

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
