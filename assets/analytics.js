// Replace GA_MEASUREMENT_ID with the production GA4 measurement ID.
(function () {
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

  if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
})();
