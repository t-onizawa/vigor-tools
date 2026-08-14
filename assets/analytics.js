/*
 * Founder自身のアクセスをGA4データから除外するための内部トラフィック抑制。
 *
 * 使い方: どのデバイスでも、対象サイトのどのページでもよいので
 * ?internal=1 を付けて一度アクセスすると、そのデバイス・そのブラウザでは
 * 以後GA送信が止まります。
 *
 * 解除: ?internal=clear または ?internal=0 を付けて一度アクセスすると解除されます。
 * 端末の初期化・譲渡時に使ってください。
 *
 * 確認: internalモードのページでブラウザ開発者ツールのConsoleに
 * [Analytics] Internal mode: enabled が出ること、Networkタブで
 * googletagmanager.com への通信が発生していないことで確認できます。
 *
 * 対象範囲: ブラウザ単位です。同一デバイスでも別ブラウザや
 * シークレットウィンドウには効きません。
 */
// Replace GA_MEASUREMENT_ID with the production GA4 measurement ID.
(function () {
  const GA_MEASUREMENT_ID = "G-50STFBVFLW";

  if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    return;
  }

  var isInternal = false;
  try {
    const internal = new URLSearchParams(window.location.search).get("internal");
    if (internal === "1") {
      localStorage.setItem("vigor_internal_traffic", "1");
    } else if (internal === "clear" || internal === "0") {
      localStorage.removeItem("vigor_internal_traffic");
    }

    isInternal = localStorage.getItem("vigor_internal_traffic") === "1";
  } catch (e) {}

  window.dataLayer = window.dataLayer || [];

  if (isInternal) {
    window.gtag = function () {};
    console.info("[Analytics] Internal mode: enabled");
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(script);

  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
})();
