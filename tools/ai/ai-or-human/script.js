var STORAGE_KEY = 'vigor-ai-or-human-draft';

var topicEl = document.getElementById('topic');
var aiEl = document.getElementById('ai-reasons');
var humanEl = document.getElementById('human-reasons');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

function saveDraft() {
  var data = {
    topic: topicEl.value,
    ai: aiEl.value,
    human: humanEl.value
  };
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

  topicEl.value = data.topic || '';
  aiEl.value = data.ai || '';
  humanEl.value = data.human || '';
}

function updateSaveButtonVisibility() {
  var hasContent = aiEl.value.trim() !== '' || humanEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

[topicEl, aiEl, humanEl].forEach(function (el) {
  el.addEventListener('input', function () {
    saveDraft();
    if (!savedBlock.hidden) {
      savedBlock.hidden = true;
      saveBlock.hidden = false;
    }
  });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var topic = topicEl.value.trim();
  var description = topic
    ? '「' + topic + '」について、AIに聞くか人に聞くかを書き出した'
    : 'AIに聞くか人に聞くかを書き出した';

  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save(
      'ai-or-human',
      'AIに聞くべきか、人に聞くべきか 判断シート',
      description,
      '/ai/ai-or-human/'
    );
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
