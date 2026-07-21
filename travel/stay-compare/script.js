var STORAGE_KEY = 'vigor-stay-compare-draft';

var aNameEl = document.getElementById('stay-a-name');
var aReasonsEl = document.getElementById('stay-a-reasons');
var bNameEl = document.getElementById('stay-b-name');
var bReasonsEl = document.getElementById('stay-b-reasons');
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
  var aName = aNameEl.value.trim() || '候補A';
  var bName = bNameEl.value.trim() || '候補B';
  var description = '「' + aName + '」と「' + bName + '」を比較した';

  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('stay-compare', '宿泊先比較シート', description, '/travel/stay-compare/');
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
