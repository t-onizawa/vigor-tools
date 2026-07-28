function renderHistory() {
  var listEl = document.getElementById('history-list');
  var emptyEl = document.getElementById('history-empty');
  var clearBlockEl = document.getElementById('history-clear-block');

  var items = {};
  if (typeof VigorHistory !== 'undefined') {
    items = VigorHistory.getAll();
  }

  var keys = Object.keys(items);
  listEl.innerHTML = '';

  if (keys.length === 0) {
    emptyEl.hidden = false;
    clearBlockEl.hidden = true;
    return;
  }

  emptyEl.hidden = true;
  clearBlockEl.hidden = false;

  keys.forEach(function (toolId) {
    var item = items[toolId] || {};

    var card = document.createElement('div');
    card.className = 'history-card';

    var info = document.createElement('div');
    info.className = 'history-card-info';

    var label = document.createElement('p');
    label.className = 'history-card-label';
    label.textContent = item.label || toolId;

    var result = document.createElement('p');
    result.className = 'history-card-result';
    result.textContent = '最新の結果：' + (item.result || '—') + '　' + (item.date || '');

    info.appendChild(label);
    info.appendChild(result);

    var actions = document.createElement('div');
    actions.className = 'history-card-actions';

    if (item.url) {
      var link = document.createElement('a');
      link.className = 'history-card-link';
      link.href = item.url;
      link.textContent = 'もう一度チェックする';
      actions.appendChild(link);
    }

    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'history-card-remove';
    removeBtn.textContent = '削除';
    removeBtn.addEventListener('click', function () {
      if (typeof VigorHistory !== 'undefined') {
        VigorHistory.remove(toolId);
      }
      renderHistory();
    });
    actions.appendChild(removeBtn);

    card.appendChild(info);
    card.appendChild(actions);
    listEl.appendChild(card);
  });
}

document.getElementById('clear-all-btn').addEventListener('click', function () {
  if (window.confirm('判断履歴をすべて削除します。よろしいですか？')) {
    if (typeof VigorHistory !== 'undefined') {
      VigorHistory.clear();
    }
    renderHistory();
  }
});

renderHistory();
