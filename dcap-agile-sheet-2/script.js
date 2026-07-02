'use strict';

document.addEventListener('DOMContentLoaded', function () {

  var form            = document.getElementById('dcap-form');
  var resetBtn        = document.getElementById('reset-btn');
  var copyBtn         = document.getElementById('copy-btn');
  var clearHistoryBtn = document.getElementById('clear-history-btn');
  var outputSec       = document.getElementById('output-section');
  var errorMsg        = document.getElementById('next-do-error');

  // ── Generate ──────────────────────────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var stuck  = field('stuck');
    var goal   = field('goal');
    var nextDo = field('next-do');

    if (!nextDo) {
      errorMsg.hidden = false;
      document.getElementById('next-do').focus();
      return;
    }
    errorMsg.hidden = true;

    render(stuck, goal, nextDo);
    saveHistory({ id: Date.now(), date: new Date().toISOString(), stuck: stuck, goal: goal, nextDo: nextDo });
    renderHistory();

    outputSec.hidden = false;
    setTimeout(function () {
      outputSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  });

  // ── Reset ─────────────────────────────────────────────────
  resetBtn.addEventListener('click', function () {
    form.reset();
    errorMsg.hidden = true;
    outputSec.hidden = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Clear history ─────────────────────────────────────────
  clearHistoryBtn.addEventListener('click', function () {
    localStorage.removeItem('dcap-history');
    renderHistory();
  });

  // ── Copy ──────────────────────────────────────────────────
  copyBtn.addEventListener('click', function () {
    var text = buildCopyText();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(flash).catch(fallbackCopy.bind(null, text));
    } else {
      fallbackCopy(text);
    }
  });

  // ── Helpers ───────────────────────────────────────────────

  function field(id) {
    return document.getElementById(id).value.trim();
  }

  function render(stuck, goal, nextDo) {
    set('out-do',    buildDo(nextDo));
    set('out-check', buildCheck(goal));
    set('out-next',  buildNext(goal, stuck));
    set('out-plan',  buildPlan(goal, nextDo));
  }

  function set(id, html) {
    document.getElementById(id).innerHTML = html;
  }

  function formatDate(isoStr) {
    var d = new Date(isoStr);
    var month = d.getMonth() + 1;
    var day   = d.getDate();
    var h     = ('0' + d.getHours()).slice(-2);
    var m     = ('0' + d.getMinutes()).slice(-2);
    return month + '月' + day + '日 ' + h + ':' + m;
  }

  function truncate(str, len) {
    return str.length > len ? str.slice(0, len) + '…' : str;
  }

  function p(text) {
    return '<p>' + esc(text) + '</p>';
  }

  function esc(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // 今すぐやるDo
  function buildDo(nextDo) {
    return p(nextDo);
  }

  // やった後に見るポイント
  function buildCheck(goal) {
    var lines = [];

    if (goal) {
      lines.push('この一手で、少しでも「' + goal + '」に近づきましたか？');
    } else {
      lines.push('15分だけ試して、何かひとつ前に動けましたか？');
    }
    lines.push('15分間、それだけに集中できましたか？');
    lines.push('次にやるべきことが、少し見えてきましたか？');

    return lines.map(function (l) { return p('✓ ' + l); }).join('');
  }

  // 次の一手（small plan / p）
  function buildPlan(goal, nextDo) {
    var hypothesis = goal
      ? '「' + nextDo + '」をやってみると、「' + goal + '」に向けて次に何をすべきかが見えてきます。'
      : '「' + nextDo + '」をやってみると、次に直すべきことが少し見えてきます。';
    return p('次に試す小さな仮説：' + hypothesis);
  }

  // 次の小さなDo
  function buildNext(goal, stuck) {
    var line;

    if (stuck && goal) {
      line = 'まだ「' + stuck + '」で止まっているなら、次はもっと小さく分解して試してください。';
    } else if (stuck && !goal) {
      line = 'まだ「' + stuck + '」で止まっているなら、まずは一番小さい作業だけに切り出してください。';
    } else if (!stuck && goal) {
      line = '次は「' + goal + '」に近づくための、もう一つ小さな一手を試してください。';
    } else {
      line = '次は、今できそうなことをひとつだけ選んで試してください。';
    }

    return p('→ ' + line);
  }

  // コピー用テキスト
  function buildCopyText() {
    return [
      '【DCAPアジャイルシート】',
      '',
      '■ 今すぐやるDo',
      document.getElementById('out-do').innerText,
      '',
      '■ やった後に見るポイント',
      document.getElementById('out-check').innerText,
      '',
      '■ 次の小さなDo',
      document.getElementById('out-next').innerText,
      '',
      '■ 次の一手',
      document.getElementById('out-plan').innerText,
    ].join('\n');
  }

  // ── History ───────────────────────────────────────────────

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem('dcap-history') || '[]');
    } catch (_) {
      return [];
    }
  }

  function saveHistory(entry) {
    var history = loadHistory();
    history.unshift(entry);
    history = history.slice(0, 10);
    localStorage.setItem('dcap-history', JSON.stringify(history));
  }

  function renderHistory() {
    var history = loadHistory();
    var section = document.getElementById('history-section');
    var list    = document.getElementById('history-list');

    if (!history.length) {
      section.hidden = true;
      return;
    }

    list.innerHTML = history.map(function (entry) {
      var sub      = entry.goal || entry.stuck;
      var subLabel = entry.goal ? '目標：' : '止まっていたこと：';
      return '<li class="history-item">' +
        '<div class="history-date">' + formatDate(entry.date) + '</div>' +
        '<div class="history-next-do">' + esc(truncate(entry.nextDo, 30)) + '</div>' +
        (sub ? '<div class="history-sub">' + esc(subLabel + sub) + '</div>' : '') +
        '</li>';
    }).join('');

    section.hidden = false;
  }

  function flash() {
    copyBtn.textContent = 'コピーしました';
    setTimeout(function () { copyBtn.textContent = 'コピー'; }, 2200);
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); flash(); } catch (_) {}
    document.body.removeChild(ta);
  }

  // ── Init ──────────────────────────────────────────────────
  renderHistory();

});
