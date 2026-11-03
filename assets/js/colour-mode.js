// Restore colour preference before rendering, independently of light/dark mode.
(function () {
  var root = document.documentElement;
  var enabled = false;
  try { enabled = localStorage.getItem("colour-mode") === "colourful"; } catch (error) {}
  root.setAttribute("data-colour-mode", enabled ? "colourful" : "colourless");
  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("colour-toggle");
    if (!button) return;
    function update() {
      root.setAttribute("data-colour-mode", enabled ? "colourful" : "colourless");
      button.setAttribute("aria-pressed", String(enabled));
      var label = enabled ? "Switch to colourless mode" : "Enable colourful mode";
      button.setAttribute("aria-label", label);
      button.title = label;
    }
    button.addEventListener("click", function () {
      enabled = !enabled;
      update();
      try { localStorage.setItem("colour-mode", enabled ? "colourful" : "colourless"); } catch (error) {}
    });
    function restore() {
      try { enabled = localStorage.getItem("colour-mode") === "colourful"; } catch (error) {}
      update();
    }
    window.addEventListener("pageshow", restore);
    window.addEventListener("storage", function (event) {
      if (event.key === "colour-mode" || event.key === null) restore();
    });
    restore();
  });
})();
