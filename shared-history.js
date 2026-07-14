// VIGOR TOOLS Platform — 判断履歴
// ユーザーが明示的に保存したツールの結果だけを、ブラウザ内に記録する。
// 壊れたデータ・保存失敗があっても、ページ全体を止めない。

var VigorHistory = (function () {
  var STORAGE_KEY = 'vigor_history';
  var CURRENT_VERSION = 1;

  function emptyData() {
    return { version: CURRENT_VERSION, items: {} };
  }

  function isValidData(data) {
    return !!(
      data &&
      typeof data === 'object' &&
      typeof data.version === 'number' &&
      data.items &&
      typeof data.items === 'object'
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

  function save(toolId, label, result, url) {
    if (!toolId) return false;
    var data = load();
    data.items[toolId] = {
      label: label || '',
      result: result || '',
      date: new Date().toISOString().slice(0, 10),
      url: url || ''
    };
    return persist(data);
  }

  function getAll() {
    return load().items;
  }

  function remove(toolId) {
    var data = load();
    if (Object.prototype.hasOwnProperty.call(data.items, toolId)) {
      delete data.items[toolId];
    }
    return persist(data);
  }

  function clear() {
    return persist(emptyData());
  }

  return {
    save: save,
    getAll: getAll,
    remove: remove,
    clear: clear
  };
})();
