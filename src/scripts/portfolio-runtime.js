(() => {
  "use strict";

  const getAx = () => {
    if (!window.axnikitaJS || window.axnikitaJS.version !== "3.0.1") {
      throw new Error("Portfolio requires axnikitaJS 3.0.1");
    }

    const { axCookie } = window.axnikitaJS.classes;
    const { throttle } = window.axnikitaJS.utils;

    return {
      axCookie,
      throttle,
      axQS: window.axQS,
      axQSA: window.axQSA,
    };
  };

  class LanguageController {
    constructor(ax) {
      this.ax = ax;
      this.cookieName = "portfolio_lang";
      this.lang = this.ax.axCookie.getValue(this.cookieName) === "en" ? "en" : "ru";
    }

    bind() {
      document.addEventListener("click", (event) => {
        const button = event.target.closest("[data-lang-button]");
        if (!button) return;
        this.apply(button.dataset.langButton);
      });
    }

    apply(lang = this.lang) {
      this.lang = lang === "en" ? "en" : "ru";
      document.documentElement.lang = this.lang;
      document.documentElement.dataset.lang = this.lang;

      this.ax.axQSA("[data-lang-ru][data-lang-en]").forEach((node) => {
        const value = this.lang === "en" ? node.dataset.langEn : node.dataset.langRu;
        if (value === undefined) return;
        if (node.hasAttribute("data-lang-html")) node.innerHTML = value;
        else node.textContent = value;
      });

      this.ax.axQSA("[data-lang-button]").forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.langButton === this.lang));
      });

      this.ax.axCookie.setValue(this.cookieName, this.lang, {
        path: "/",
        "max-age": 60 * 60 * 24 * 365,
        samesite: "lax",
      });
    }
  }

  class LightboxController {
    constructor(ax) { this.ax = ax; }

    bind() {
      document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-lightbox]");
        if (trigger) {
          event.preventDefault();
          this.open(trigger);
          return;
        }

        if (event.target.closest("[data-lightbox-close]") || event.target.matches("#lightbox")) {
          this.ax.axQS("#lightbox")?.close();
        }
      });
    }

    open(trigger) {
      const dialog = this.ax.axQS("#lightbox");
      const image = dialog?.querySelector("img");
      if (!dialog || !image) return;

      image.src = trigger.dataset.lightbox;
      image.alt = trigger.querySelector("img")?.alt ?? "";
      dialog.showModal();
    }
  }

  class CaseRailController {
    constructor(ax) {
      this.ax = ax;
      this.caseIndex = null;
      this.cases = [];
      this.links = [];
      this.metrics = [];
      this.activeIndex = -1;
      this.scrollHandler = null;
      this.resizeHandler = null;
    }

    init() {
      this.destroy();
      this.caseIndex = this.ax.axQS(".case-index");
      this.cases = [...this.ax.axQSA("main section.case")];
      this.links = [...this.ax.axQSA(".case-index a")];
      this.activeIndex = -1;

      if (!this.caseIndex || !this.cases.length) return;

      this.scrollHandler = this.ax.throttle(() => this.update(), 16);
      this.resizeHandler = this.ax.throttle(() => this.measure(), 90);
      window.addEventListener("scroll", this.scrollHandler, { passive: true });
      window.addEventListener("resize", this.resizeHandler, { passive: true });
      this.measure();
      document.fonts?.ready?.then(() => this.measure());
    }

    destroy() {
      if (this.scrollHandler) window.removeEventListener("scroll", this.scrollHandler);
      if (this.resizeHandler) window.removeEventListener("resize", this.resizeHandler);
      this.scrollHandler = null;
      this.resizeHandler = null;
    }

    measure() {
      this.metrics = this.cases.map((section) => ({
        id: section.id,
        top: section.getBoundingClientRect().top + window.scrollY,
      }));
      this.update();
    }

    update() {
      if (!this.metrics.length || !this.caseIndex) return;
      const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
      const readingLine = window.scrollY + window.innerHeight * 0.34;

      let activeIndex = 0;
      for (let i = 0; i < this.metrics.length; i += 1) {
        if (readingLine >= this.metrics[i].top) activeIndex = i;
        else break;
      }

      if (activeIndex !== this.activeIndex) {
        this.activeIndex = activeIndex;
        this.links.forEach((link, index) => {
          const active = index === activeIndex;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "step");
          else link.removeAttribute("aria-current");
        });

        const activeLink = this.links[activeIndex];
        const number = activeLink?.querySelector("span:first-child")?.textContent?.trim() ?? "";
        const label = activeLink?.querySelector("span:last-child")?.textContent?.trim() ?? "";
        this.caseIndex.querySelector(".case-rail-fixed-label")?.replaceChildren(label);
        this.caseIndex.querySelector(".case-rail-fixed-count")?.replaceChildren(
          `${number}/${String(this.cases.length).padStart(2, "0")}`
        );
      }

      const first = this.metrics[0].top;
      const last = this.metrics[this.metrics.length - 1].top;
      const progress = last > first ? clamp((readingLine - first) / (last - first), 0, 1) : 0;
      this.caseIndex.style.setProperty("--case-progress", progress.toFixed(4));
      this.syncCaptionContrast();
    }

    syncCaptionContrast() {
      if (window.innerWidth > 820 || !this.caseIndex) return;
      [
        this.caseIndex.querySelector(".case-rail-fixed-label"),
        this.caseIndex.querySelector(".case-rail-fixed-count"),
      ].filter(Boolean).forEach((caption) => {
        const rect = caption.getBoundingClientRect();
        const x = Math.min(window.innerWidth - 1, Math.max(0, rect.left + rect.width / 2));
        const y = Math.min(window.innerHeight - 1, Math.max(0, rect.top + rect.height / 2));
        const behind = document.elementsFromPoint(x, y).find((node) => !this.caseIndex.contains(node));
        const dark = Boolean(behind?.closest?.(".case--dark,.case--featured,.site-footer"));
        caption.style.color = dark ? "var(--bg)" : "var(--dark)";
      });
    }
  }

  class PortfolioApp {
    constructor() {
      this.ax = getAx();
      this.language = new LanguageController(this.ax);
      this.lightbox = new LightboxController(this.ax);
      this.caseRail = new CaseRailController(this.ax);
    }

    init() {
      this.language.bind();
      this.lightbox.bind();
      this.observeShellMain();

      // Historical axnikitaJS [spa] dispatches this after replacing <main>.
      document.addEventListener("end_load_spa", () => {
        this.schedulePageInit();
      });

      // axURL pushes history state, while the historical SPA layer has no popstate loader.
      // Full reload on back/forward keeps content and URL consistent without a second router.
      window.addEventListener("popstate", () => window.location.reload());

      this.initPage();
    }

    schedulePageInit() {
      if (this.pendingPageInit) return;
      this.pendingPageInit = true;

      requestAnimationFrame(() => {
        this.pendingPageInit = false;
        this.initPage();
      });
    }

    observeShellMain() {
      const shell = this.ax.axQS(".site-shell");
      if (!shell || !window.MutationObserver) return;

      const observer = new MutationObserver((mutations) => {
        const mainChanged = mutations.some((mutation) => (
          [...mutation.addedNodes, ...mutation.removedNodes].some((node) => node?.nodeType === 1 && node.matches?.("main"))
        ));

        if (mainChanged) this.schedulePageInit();
      });

      observer.observe(shell, { childList: true });
    }

    initPage() {
      this.syncPersistentShell();
      this.language.apply(this.language.lang);
      this.caseRail.init();
      document.dispatchEvent(new CustomEvent("portfolio:page-ready"));
    }

    syncPersistentShell() {
      const main = this.ax.axQS("main");
      if (!main) return;

      const pageKey = main.dataset.pageKey;
      if (pageKey) document.body.dataset.page = pageKey;

      if (main.dataset.pageTitle) document.title = main.dataset.pageTitle;
      const description = document.querySelector('meta[name="description"]');
      if (description && main.dataset.pageDescription) {
        description.content = main.dataset.pageDescription;
      }

      this.ax.axQSA("[data-page-key]").forEach((link) => {
        const active = link.dataset.pageKey === pageKey;
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });

      const footerMap = [
        [".footer-eyebrow", "footerEyebrow"],
        [".footer-title", "footerTitle"],
        [".footer-title-accent", "footerAccent"],
        [".footer-contact > p", "footerText"],
      ];

      footerMap.forEach(([selector, key]) => {
        const node = this.ax.axQS(selector);
        const ru = main.dataset[`${key}Ru`];
        const en = main.dataset[`${key}En`];
        if (!node || ru === undefined || en === undefined) return;
        node.dataset.langRu = ru;
        node.dataset.langEn = en;
      });
    }
  }

  window.addEventListener("DOMContentLoaded", () => new PortfolioApp().init());
})();
