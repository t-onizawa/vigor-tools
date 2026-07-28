var STORAGE_KEY = 'vigor-decide-or-wait-draft';

var buyEl = document.getElementById('buy-reasons');
var waitEl = document.getElementById('wait-reasons');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

function saveDraft() {
  var data = { buy: buyEl.value, wait: waitEl.value };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // 保存に失敗しても、入力自体は継続できる
  }
  updateSaveButtonVisibility();
}

function restoreDraft() {
  var raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return;
  }
  if (!raw) return;
  var data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    return;
  }
  if (!data || typeof data !== 'object') return;
  buyEl.value = data.buy || '';
  waitEl.value = data.wait || '';
}

function updateSaveButtonVisibility() {
  var hasContent = buyEl.value.trim() !== '' || waitEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

[buyEl, waitEl].forEach(function (el) {
  el.addEventListener('input', function () {
    saveDraft();
    if (!savedBlock.hidden) {
      savedBlock.hidden = true;
      saveBlock.hidden = false;
    }
  });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('decide-or-wait', '買う／見送る比較シート', '買う理由と見送る理由を書き出した', '/buy/decide-or-wait/');
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
