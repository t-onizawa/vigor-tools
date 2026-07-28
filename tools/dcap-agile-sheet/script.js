'use strict';

document.addEventListener('DOMContentLoaded', function () {

  var form        = document.getElementById('dcap-form');
  var resetBtn    = document.getElementById('reset-btn');
  var copyBtn     = document.getElementById('copy-btn');
  var outputSec   = document.getElementById('output-section');
  var errorMsg    = document.getElementById('next-do-error');

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
    set('out-check', buildCheck(goal, nextDo));
    set('out-next',  buildNext(goal, stuck));
  }

  function set(id, html) {
    document.getElementById(id).innerHTML = html;
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
  function buildCheck(goal, nextDo) {
    var lines = [];

    if (goal) {
      lines.push('「' + goal + '」に少し近づきましたか？');
    }
    lines.push('15分間、それだけに集中できましたか？');
    lines.push('次にやるべきことが、少し見えてきましたか？');

    return lines.map(function (l) { return p('✓ ' + l); }).join('');
  }

  // 次の小さなDo
  function buildNext(goal, stuck) {
    var lines = [];

    if (goal) {
      lines.push('「' + goal + '」のために、次の15分でできることは何ですか？');
    } else {
      lines.push('次の15分でできることは何ですか？');
    }

    if (stuck) {
      lines.push('まだ「' + stuck + '」で止まっているなら、もう一度このシートを使ってください。');
    }

    return lines.map(function (l, i) {
      return p((i === 0 ? '→ ' : '') + l);
    }).join('');
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
    ].join('\n');
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

});
