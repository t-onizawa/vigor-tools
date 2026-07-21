var STORAGE_KEY = 'vigor-request-template-draft';
var whatEl = document.getElementById('what');
var deadlineEl = document.getElementById('deadline');
var doneEl = document.getElementById('done');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

function saveDraft() {
  var data = { what: whatEl.value, deadline: deadlineEl.value, done: doneEl.value };
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
  whatEl.value = data.what || '';
  deadlineEl.value = data.deadline || '';
  doneEl.value = data.done || '';
}

function updateSaveButtonVisibility() {
  var hasContent = whatEl.value.trim() !== '' || deadlineEl.value.trim() !== '' || doneEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

[whatEl, deadlineEl, doneEl].forEach(function (el) {
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
    'お願いしたいこと：' + whatEl.value + '\n' +
    '期限：' + deadlineEl.value + '\n' +
    '完了の条件：' + doneEl.value;

  navigator.clipboard.writeText(text).then(function () {
    var note = document.getElementById('copy-note');
    note.hidden = false;
    setTimeout(function () { note.hidden = true; }, 2000);
  }).catch(function () {});
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('request-template', '依頼文を明確にするテンプレ', '依頼文を整理した', '/work/request-template/');
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
