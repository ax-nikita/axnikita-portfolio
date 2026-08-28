import { initAboutPage } from "./about.js";
import { initGamedevPage } from "./gamedev.js";
import { initWebPage } from "./web.js";
import { CaseRailController } from "./modules/case-rail.js";
import { LanguageController } from "./modules/language.js";
import { initLightbox } from "./modules/lightbox.js";
import { PAGE_COPY } from "./modules/page-copy.js";
import { formatFooterTitle, getCurrentPageKey, syncShell } from "./modules/shell.js";

const getAx = () => {
  if (!window.axnikitaJS || window.axnikitaJS.version !== "3.0.1") {
    throw new Error("Portfolio requires axnikitaJS 3.0.1");
  }

  return window.axnikitaJS;
};

class PortfolioApp {
  constructor() {
    this.ax = getAx();
    this.language = new LanguageController(PAGE_COPY);
    this.caseRail = new CaseRailController();
    this.pageCleanup = () => {};
    this.pendingPageInit = false;
    this.pageModules = {
      about: initAboutPage,
      web: initWebPage,
      gamedev: initGamedevPage,
    };
  }

  start() {
    this.language.bind();
    initLightbox();
    this.observeShell();

    document.addEventListener("end_load_spa", () => {
      this.schedulePageInit();
    });

    window.addEventListener("popstate", () => window.location.reload());
    this.schedulePageInit();
  }

  observeShell() {
    const shell = document.querySelector(".site-shell");
    if (!shell || !window.MutationObserver) return;

    const observer = new MutationObserver((mutations) => {
      const shellChanged = mutations.some((mutation) =>
        [...mutation.addedNodes, ...mutation.removedNodes].some((node) => node?.nodeType === 1)
      );

      if (shellChanged) this.schedulePageInit();
    });

    observer.observe(shell, { childList: true });
  }

  schedulePageInit() {
    if (this.pendingPageInit) return;
    this.pendingPageInit = true;

    requestAnimationFrame(() => {
      this.pendingPageInit = false;
      this.initPage();
    });
  }

  initPage() {
    this.pageCleanup();
    this.caseRail.destroy();

    syncShell();
    this.language.apply();
    formatFooterTitle();

    const pageKey = getCurrentPageKey();
    const initPage = this.pageModules[pageKey];
    this.pageCleanup = typeof initPage === "function"
      ? initPage({ ax: this.ax, caseRail: this.caseRail, language: this.language })
      : () => {};

    document.dispatchEvent(new CustomEvent("portfolio:page-ready", { detail: { pageKey } }));
  }
}

const start = () => new PortfolioApp().start();

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", start, { once: true });
} else {
  start();
}
