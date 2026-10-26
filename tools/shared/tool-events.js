// VIGOR TOOLS — ツール利用イベント計測（GA4）
// tool_start: ページ内で最初の操作（入力・変更・送信・ボタンクリック）があったとき1回だけ送信する。
// tool_complete: 各ツールの script.js が結果表示時に VigorEvents.complete() を呼んだとき、
//   tool_start 済みの場合に限り1回だけ送信する（保存状態の復元だけでは送信しない）。
// 内部トラフィックモードでは analytics.js が gtag を無効化するため、この計測も自動的に止まる。
var VigorEvents = (function () {
  var started = false;
  var completed = false;

  function toolId() {
    var parts = window.location.pathname.split('/').filter(function (s) { return s !== ''; });
    // /tools/<category>/<tool>/ → <tool>、/tools/<category>/ → <category>
    if (parts.length >= 3 && parts[0] === 'tools') return parts[2];
    if (parts.length >= 2 && parts[0] === 'tools') return parts[1];
    return 'tools-top';
  }

  function send(name) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, {
      tool_id: toolId(),
      page_path: window.location.pathname
    });
  }

  function start() {
    if (started) return;
    started = true;
    send('tool_start');
  }

  function complete() {
    if (!started || completed) return;
    completed = true;
    send('tool_complete');
  }

  ['input', 'change', 'submit'].forEach(function (type) {
    document.addEventListener(type, start, { capture: true, passive: true });
  });
  document.addEventListener('click', function (e) {
    if (e.target && e.target.closest && e.target.closest('button')) start();
  }, { capture: true, passive: true });

  return { start: start, complete: complete };
})();
