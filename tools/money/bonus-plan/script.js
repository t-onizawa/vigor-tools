var STORAGE_KEY = 'vigor-bonus-plan-draft';

var saveEl = document.getElementById('save-reasons');
var spendEl = document.getElementById('spend-reasons');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

function saveDraft() {
  var data = { save: saveEl.value, spend: spendEl.value };
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
  saveEl.value = data.save || '';
  spendEl.value = data.spend || '';
}

function updateSaveButtonVisibility() {
  var hasContent = saveEl.value.trim() !== '' || spendEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

[saveEl, spendEl].forEach(function (el) {
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
    saved = VigorHistory.save('bonus-plan', 'ボーナスの使い道比較シート', 'ボーナスの使い道を書き出した', '/money/bonus-plan/');
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
