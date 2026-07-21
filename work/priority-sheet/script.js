var STORAGE_KEY = 'vigor-priority-sheet-draft';
var textEl = document.getElementById('tasks');
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
    saved = VigorHistory.save('priority-sheet', '仕事の優先順位整理シート', '仕事の優先順位を書き出した', '/work/priority-sheet/');
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
