var STORAGE_KEY = 'vigor-prep-for-ai-draft';
var purposeEl = document.getElementById('purpose');
var contextEl = document.getElementById('context');
var formatEl = document.getElementById('format');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

function saveDraft() {
  var data = { purpose: purposeEl.value, context: contextEl.value, format: formatEl.value };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // 保存に失敗しても入力は継続できる
  }
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
  purposeEl.value = data.purpose || '';
  contextEl.value = data.context || '';
  formatEl.value = data.format || '';
}

function updateSaveButtonVisibility() {
  var hasContent = purposeEl.value.trim() !== '' || contextEl.value.trim() !== '' || formatEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

[purposeEl, contextEl, formatEl].forEach(function (el) {
  el.addEventListener('input', function () {
    saveDraft();
    updateSaveButtonVisibility();
    if (!savedBlock.hidden) {
      savedBlock.hidden = true;
      saveBlock.hidden = false;
    }
  });
});

document.getElementById('copy-btn').addEventListener('click', function () {
  var text =
    '【目的】\n' + purposeEl.value + '\n\n' +
    '【背景・前提】\n' + contextEl.value + '\n\n' +
    '【欲しい出力の形】\n' + formatEl.value;

  navigator.clipboard.writeText(text).then(function () {
    var note = document.getElementById('copy-note');
    note.hidden = false;
    setTimeout(function () { note.hidden = true; }, 2000);
  }).catch(function () {});
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save(
      'prep-for-ai',
      'AIへ渡す前の情報整理シート',
      'AIへ渡す情報を整理した',
      '/ai/prep-for-ai/'
    );
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
