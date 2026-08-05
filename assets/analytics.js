// Replace GA_MEASUREMENT_ID with the production GA4 measurement ID.
(function () {
  const GA_MEASUREMENT_ID = "G-50STFBVFLW";

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

  var isInternal = false;
  try {
    const internal = new URLSearchParams(window.location.search).get("internal");
    if (internal === "1") {
      localStorage.setItem("vigor_internal_traffic", "1");
    } else if (internal === "0") {
      localStorage.removeItem("vigor_internal_traffic");
    }

    isInternal = localStorage.getItem("vigor_internal_traffic") === "1";
  } catch (e) {}

  window.gtag("js", new Date());
  if (isInternal) {
    window.gtag("config", GA_MEASUREMENT_ID, { traffic_type: "internal" });
  } else {
    window.gtag("config", GA_MEASUREMENT_ID);
  }
})();
