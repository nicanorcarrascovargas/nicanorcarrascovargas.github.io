// Restore reading size before rendering, then connect the reader controls.
(function () {
  var key = "reading-text-size";
  var size = 120;
  var decrease, increase, status;
  function apply(announce) {
    document.documentElement.style.setProperty("--reading-font-size", (size / 100) + "rem");
    if (decrease) decrease.disabled = size <= 85;
    if (increase) increase.disabled = size >= 180;
    if (announce) {
      if (status) status.textContent = "Text size " + size + " percent";
      try { localStorage.setItem(key, String(size)); } catch (error) {}
    }
  }
  function restore() {
    try {
      var stored = Number(localStorage.getItem(key));
      size = Number.isFinite(stored) && stored >= 85 && stored <= 180 ? stored : 120;
    } catch (error) { /* Controls also work without browser storage. */ }
    apply(false);
  }
  restore();
  window.addEventListener("pageshow", restore);
  window.addEventListener("storage", function (event) {
    if (event.key === key || event.key === null) restore();
  });
  function connectControls() {
    decrease = document.getElementById("text-size-decrease");
    increase = document.getElementById("text-size-increase");
    status = document.getElementById("text-size-status");
    if (!decrease || !increase) return;
    decrease.addEventListener("click", function () { size = Math.max(85, size - 10); apply(true); });
    increase.addEventListener("click", function () { size = Math.min(180, size + 10); apply(true); });
    apply(false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", connectControls);
  else connectControls();
})();
