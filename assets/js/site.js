import { LanguageController } from "./modules/language.js";
import { syncShell, waitForShell } from "./modules/shell.js";
import { initAboutPage } from "./modules/about.js";
import { CaseRailController } from "./modules/case-rail.js";
import { initLightbox } from "./modules/lightbox.js";

class PortfolioApp {
  constructor() {
    this.language = new LanguageController();
    this.caseRail = new CaseRailController();
    this.pageCleanup = () => {};
  }

  start() {
    this.language.bind();
    initLightbox();
    waitForShell(this.language);

    document.addEventListener("end_load_spa", () => this.initPage());
    window.addEventListener("popstate", () => window.location.reload());

    this.initPage();
  }

  initPage() {
    this.pageCleanup();
    this.pageCleanup = () => {};
    this.caseRail.destroy();

    const main = document.querySelector("main[data-page-key]");
    if (!main) return;

    const pageKey = main.dataset.pageKey;

    // The CSS bundle is already loaded. Switching data-page activates the
    // corresponding scoped rules synchronously, without another CSS request.
    syncShell(this.language);
    this.language.apply();

    if (pageKey === "about") {
      this.pageCleanup = initAboutPage();
    } else if (pageKey === "web" || pageKey === "gamedev") {
      this.caseRail.init();
    }
  }
}

const start = () => new PortfolioApp().start();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start, { once: true });
} else {
  start();
}
