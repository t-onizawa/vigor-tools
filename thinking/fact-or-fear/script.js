var STORAGE_KEY = 'vigor-fact-or-fear-draft';

var factsEl = document.getElementById('facts');
var fearsEl = document.getElementById('fears');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

function saveDraft() {
  var data = { facts: factsEl.value, fears: fearsEl.value };
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
  factsEl.value = data.facts || '';
  fearsEl.value = data.fears || '';
}

function updateSaveButtonVisibility() {
  var hasContent = factsEl.value.trim() !== '' || fearsEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

[factsEl, fearsEl].forEach(function (el) {
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
    saved = VigorHistory.save('fact-or-fear', '不安を事実と想像に分けるシート', '事実と想像を分けて書き出した', '/thinking/fact-or-fear/');
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
