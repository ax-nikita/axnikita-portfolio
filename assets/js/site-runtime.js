(() => {
  "use strict";

  const applyRuntimeMetadata = () => {
    const version = window.axnikitaJS?.version || window.ax_lib_info?.version || "";
    if (version) {
      document.documentElement.dataset.axnikitaJs = version;
    }

    const throttle = window.axnikitaJS?.utils?.throttle;
    if (typeof throttle !== "function") return;

    const syncViewportUnit = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };

    syncViewportUnit();
    window.addEventListener("resize", throttle(syncViewportUnit, 120), { passive: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyRuntimeMetadata, { once: true });
  } else {
    applyRuntimeMetadata();
  }
})();
