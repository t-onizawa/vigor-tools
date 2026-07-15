var STORAGE_KEY = 'vigor-not-to-do-draft';
var textEl = document.getElementById('not-to-do');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

function saveDraft() {
  try {
    localStorage.setItem(STORAGE_KEY, textEl.value);
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
  if (raw) textEl.value = raw;
}

function updateSaveButtonVisibility() {
  var hasContent = textEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

textEl.addEventListener('input', function () {
  saveDraft();
  updateSaveButtonVisibility();
  if (!savedBlock.hidden) {
    savedBlock.hidden = true;
    saveBlock.hidden = false;
  }
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save(
      'not-to-do',
      'やらないことリスト',
      'やめること・手放すことを書き出した',
      '/thinking/not-to-do/'
    );
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
