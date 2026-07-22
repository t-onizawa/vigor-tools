// VIGOR TOOLS Platform — カード進捗バッジ v1（検証：3本のみ）
// 既存のlocalStorage（チェックリスト状態・判断履歴・下書き）を読み取り、
// 一覧カードに小さな状態バッジを追記するだけの表示専用スクリプト。
// 新規Profileフィールド・新規保存処理・新しい一覧画面は一切追加しない。
// データが無い/壊れている場合は何もせず、カードは通常表示のまま。

(function () {
  var TOOLS = [
    {
      match: 'before-quitting-checklist/',
      type: 'checklist',
      storageKey: 'vigor-before-quitting-checklist',
      total: 9
    },
    {
      match: 'subscriptions/',
      type: 'history',
      toolId: 'subscriptions',
      label: '計算済み'
    },
    {
      match: 'stay-or-leave/',
      type: 'draft-or-history',
      toolId: 'stay-or-leave',
      draftKey: 'vigor-stay-or-leave-draft',
      historyLabel: '判断履歴に保存済み',
      draftLabel: '下書きあり'
    }
  ];

  function getHistoryItems() {
    try {
      var raw = localStorage.getItem('vigor_history');
      if (!raw) return {};
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || !data.items) return {};
      return data.items;
    } catch (e) {
      return {};
    }
  }

  function hasDraftContent(key) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return false;
      var trimmed = raw.trim();
      if (!trimmed) return false;
      try {
        var obj = JSON.parse(trimmed);
        if (obj && typeof obj === 'object') {
          return Object.keys(obj).some(function (k) {
            return (obj[k] || '').toString().trim() !== '';
          });
        }
      } catch (e) {
        // JSONでなければ単純な文字列下書きとして扱う
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function checklistDoneCount(key, total) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return 0;
      var state = JSON.parse(raw);
      if (!state || typeof state !== 'object') return 0;
      var count = 0;
      Object.keys(state).forEach(function (k) {
        if (state[k]) count++;
      });
      return Math.min(count, total);
    } catch (e) {
      return 0;
    }
  }

  function badgeFor(tool, historyItems) {
    if (tool.type === 'checklist') {
      var done = checklistDoneCount(tool.storageKey, tool.total);
      if (done === 0) return null;
      if (done >= tool.total) return { text: '完了', done: true };
      return { text: done + ' / ' + tool.total + '項目', done: false };
    }
    if (tool.type === 'history') {
      return historyItems[tool.toolId] ? { text: tool.label, done: true } : null;
    }
    if (tool.type === 'draft-or-history') {
      if (historyItems[tool.toolId]) return { text: tool.historyLabel, done: true };
      if (hasDraftContent(tool.draftKey)) return { text: tool.draftLabel, done: false };
      return null;
    }
    return null;
  }

  function run() {
    var historyItems = getHistoryItems();
    var links = document.querySelectorAll('a.card[href]');
    links.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var tool = null;
      for (var i = 0; i < TOOLS.length; i++) {
        if (href.indexOf(TOOLS[i].match) !== -1) {
          tool = TOOLS[i];
          break;
        }
      }
      if (!tool) return;

      var result;
      try {
        result = badgeFor(tool, historyItems);
      } catch (e) {
        result = null;
      }
      if (!result || !result.text) return;

      var meta = link.querySelector('.card-meta');
      var badge = document.createElement('span');
      badge.className = 'card-status-badge' + (result.done ? ' card-status-badge--done' : '');
      badge.textContent = result.text;

      if (meta) {
        meta.appendChild(badge);
        return;
      }

      // 「まずはここから」など、card-metaを持たないカード（card-arrow構成）向けの代替表示
      var arrow = link.querySelector('.card-arrow');
      if (arrow) {
        badge.classList.add('card-status-badge--standalone');
        link.insertBefore(badge, arrow);
      }
    });
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  } catch (e) {
    // 状態表示に失敗しても、カード自体の表示・遷移には影響させない
  }
})();
