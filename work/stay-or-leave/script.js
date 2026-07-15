var STORAGE_KEY = 'vigor-stay-or-leave-draft';

var topicEl = document.getElementById('topic');
var stayEl = document.getElementById('stay-reasons');
var leaveEl = document.getElementById('leave-reasons');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

function saveDraft() {
  var data = {
    topic: topicEl.value,
    stay: stayEl.value,
    leave: leaveEl.value
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // 保存に失敗しても、入力自体は継続できる（壊れにくい設計を優先する）
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
  stayEl.value = data.stay || '';
  leaveEl.value = data.leave || '';
}

function updateSaveButtonVisibility() {
  var hasContent = stayEl.value.trim() !== '' || leaveEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) {
    savedBlock.hidden = true;
  }
}

[topicEl, stayEl, leaveEl].forEach(function (el) {
  el.addEventListener('input', function () {
    saveDraft();
    // 内容を変更したら、保存済み表示は一旦戻す（今の内容と一致しなくなるため）
    if (!savedBlock.hidden) {
      savedBlock.hidden = true;
      saveBlock.hidden = false;
    }
  });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var topic = topicEl.value.trim();
  var description = topic
    ? '「' + topic + '」について、続ける理由と辞めたい理由を書き出した'
    : '続ける理由と辞めたい理由を書き出した';

  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save(
      'stay-or-leave',
      '続ける理由 vs 辞めたい理由 比較シート',
      description,
      '/work/stay-or-leave/'
    );
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
