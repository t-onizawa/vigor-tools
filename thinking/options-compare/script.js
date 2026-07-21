var STORAGE_KEY = 'vigor-options-compare-draft';

var aNameEl = document.getElementById('option-a-name');
var aReasonsEl = document.getElementById('option-a-reasons');
var bNameEl = document.getElementById('option-b-name');
var bReasonsEl = document.getElementById('option-b-reasons');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

var allFields = [aNameEl, aReasonsEl, bNameEl, bReasonsEl];

function saveDraft() {
  var data = { aName: aNameEl.value, aReasons: aReasonsEl.value, bName: bNameEl.value, bReasons: bReasonsEl.value };
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
  aNameEl.value = data.aName || '';
  aReasonsEl.value = data.aReasons || '';
  bNameEl.value = data.bName || '';
  bReasonsEl.value = data.bReasons || '';
}

function updateSaveButtonVisibility() {
  var hasContent = aReasonsEl.value.trim() !== '' || bReasonsEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

allFields.forEach(function (el) {
  el.addEventListener('input', function () {
    saveDraft();
    if (!savedBlock.hidden) {
      savedBlock.hidden = true;
      saveBlock.hidden = false;
    }
  });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var aName = aNameEl.value.trim() || '選択肢A';
  var bName = bNameEl.value.trim() || '選択肢B';
  var description = '「' + aName + '」と「' + bName + '」を比較した';

  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('options-compare', '迷っている選択肢の比較シート', description, '/thinking/options-compare/');
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
