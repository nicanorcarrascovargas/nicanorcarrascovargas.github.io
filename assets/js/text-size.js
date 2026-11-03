// Adjust reading text independently of browser zoom and navigation.
document.addEventListener("DOMContentLoaded", function () {
  var decrease = document.getElementById("text-size-decrease");
  var increase = document.getElementById("text-size-increase");
  var status = document.getElementById("text-size-status");
  if (!decrease || !increase) return;
  var key = "reading-text-size";
  var size = 100;
  try {
    var stored = Number(localStorage.getItem(key));
    if (Number.isFinite(stored) && stored >= 85 && stored <= 150) size = stored;
  } catch (error) { /* Controls also work without browser storage. */ }
  function apply(announce) {
    document.documentElement.style.setProperty("--reading-font-size", (size / 100) + "rem");
    decrease.disabled = size <= 85;
    increase.disabled = size >= 150;
    if (announce) status.textContent = "Text size " + size + " percent";
    try { localStorage.setItem(key, String(size)); } catch (error) {}
  }
  decrease.addEventListener("click", function () { size = Math.max(85, size - 5); apply(true); });
  increase.addEventListener("click", function () { size = Math.min(150, size + 5); apply(true); });
  apply(false);
});
