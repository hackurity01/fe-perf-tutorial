(function () {
  var c = location.protocol == "https:" ? "https:" : "http:";
  var a = "20250630";
  var p = "prod";
  if (window.daum && window.daum.roughmap && window.daum.roughmap.cdn) {
    return;
  }
  window.daum = window.daum || {};
  window.daum.roughmap = {
    phase: p,
    cdn: a,
    URL_KEY_DATA_LOAD_PRE: c + "//t1.daumcdn.net/roughmap/",
    url_protocal: c,
    url_cdn_domain: "//t1.daumcdn.net",
  };
  var b =
    c +
    "//t1.daumcdn.net/kakaomapweb/roughmap/place/" +
    p +
    "/" +
    a +
    "/roughmapLander.js";

  // Modified the part below
  var script = document.createElement("script");
  script.src = b;
  document.head.appendChild(script);
})();
