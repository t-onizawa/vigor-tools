var STORAGE_KEY = 'vigor-task-breakdown-draft';
var taskEl = document.getElementById('task-name');
var stepsEl = document.getElementById('steps');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

function saveDraft() {
  var data = { task: taskEl.value, steps: stepsEl.value };
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
  taskEl.value = data.task || '';
  stepsEl.value = data.steps || '';
}

function updateSaveButtonVisibility() {
  var hasContent = stepsEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

[taskEl, stepsEl].forEach(function (el) {
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
  var task = taskEl.value.trim();
  var description = task ? '「' + task + '」をステップに分解した' : 'タスクをステップに分解した';

  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('task-breakdown', 'タスクをAIに任せられる形へ分解するシート', description, '/ai/task-breakdown/');
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
