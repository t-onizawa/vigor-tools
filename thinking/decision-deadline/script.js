var STORAGE_KEY = 'vigor-decision-deadline-draft';
var topicEl = document.getElementById('topic');
var deadlineEl = document.getElementById('deadline');
var memoEl = document.getElementById('memo');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

function saveDraft() {
  var data = { topic: topicEl.value, deadline: deadlineEl.value, memo: memoEl.value };
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
  topicEl.value = data.topic || '';
  deadlineEl.value = data.deadline || '';
  memoEl.value = data.memo || '';
}

function updateSaveButtonVisibility() {
  var hasContent = topicEl.value.trim() !== '' || deadlineEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

[topicEl, deadlineEl, memoEl].forEach(function (el) {
  el.addEventListener('input', function () {
    saveDraft();
    updateSaveButtonVisibility();
    if (!savedBlock.hidden) {
      savedBlock.hidden = true;
      saveBlock.hidden = false;
    }
  });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var deadline = deadlineEl.value.trim();
  var description = deadline ? deadline + 'までに決めると設定した' : '決断の期限メモを書いた';

  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('decision-deadline', '決断期限メモ', description, '/thinking/decision-deadline/');
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
