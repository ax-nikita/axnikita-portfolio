const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export class CaseRailController {
  constructor() {
    this.caseIndex = null;
    this.cases = [];
    this.links = [];
    this.metrics = [];
    this.currentCase = -1;
    this.scrollTicking = false;
    this.resizeTimer = null;
    this.boundRequestProgress = () => this.requestProgress();
    this.boundMeasure = () => this.debouncedMeasure();
  }

  init() {
    this.destroy();

    this.caseIndex = document.querySelector(".case-index");
    this.cases = [...document.querySelectorAll("main section.case")];
    this.links = this.caseIndex ? [...this.caseIndex.querySelectorAll("a")] : [];
    this.currentCase = -1;

    if (!this.caseIndex || !this.cases.length) return;

    window.addEventListener("scroll", this.boundRequestProgress, { passive: true });
    window.addEventListener("resize", this.boundMeasure);
    window.addEventListener("load", this.boundMeasure, { once: true });
    document.fonts?.ready?.then(() => this.measure()).catch(() => {});
    this.measure();
  }

  destroy() {
    window.removeEventListener("scroll", this.boundRequestProgress);
    window.removeEventListener("resize", this.boundMeasure);
    window.removeEventListener("load", this.boundMeasure);
    window.clearTimeout(this.resizeTimer);

    this.caseIndex = null;
    this.cases = [];
    this.links = [];
    this.metrics = [];
    this.currentCase = -1;
    this.scrollTicking = false;
    this.resizeTimer = null;
  }

  debouncedMeasure() {
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => this.measure(), 120);
  }

  measure() {
    if (!this.cases.length) return;

    this.metrics = this.cases.map((section) => ({
      id: section.id,
      top: section.getBoundingClientRect().top + window.scrollY,
    }));
    this.updateProgress();
  }

  requestProgress() {
    if (this.scrollTicking) return;
    this.scrollTicking = true;

    requestAnimationFrame(() => {
      this.updateProgress();
      this.scrollTicking = false;
    });
  }

  updateProgress() {
    if (!this.metrics.length || !this.caseIndex) return;

    const readingLine = window.scrollY + window.innerHeight * 0.34;
    let activeIndex = 0;

    for (let index = 0; index < this.metrics.length; index += 1) {
      if (readingLine >= this.metrics[index].top) activeIndex = index;
      else break;
    }

    if (activeIndex !== this.currentCase) {
      this.currentCase = activeIndex;
      this.syncActiveLink(activeIndex);
    }

    const first = this.metrics[0].top;
    const last = this.metrics[this.metrics.length - 1].top;
    const progress = last > first ? clamp((readingLine - first) / (last - first), 0, 1) : 0;

    this.caseIndex.style.setProperty("--case-progress", progress.toFixed(4));
    this.syncCaptionContrast();
  }

  syncActiveLink(activeIndex) {
    this.links.forEach((link, index) => {
      const active = index === activeIndex;
      link.classList.toggle("is-active", active);

      if (active) link.setAttribute("aria-current", "step");
      else link.removeAttribute("aria-current");
    });

    const activeLink = this.links[activeIndex];
    const number = activeLink?.querySelector("span:first-child")?.textContent?.trim() || "";
    const label = activeLink?.querySelector("span:last-child")?.textContent?.trim() || "";

    this.caseIndex.style.setProperty("--active-case-number", `"${number}"`);
    this.caseIndex.style.setProperty("--active-case-label", `"${label}"`);
    this.caseIndex.querySelector(".case-rail-fixed-label")?.replaceChildren(label);
    this.caseIndex.querySelector(".case-rail-fixed-count")?.replaceChildren(
      `${number}/${String(this.cases.length).padStart(2, "0")}`
    );

    const activeCase = this.cases[activeIndex];
    const activeCaseIsDark = Boolean(
      activeCase?.classList.contains("case--dark") || activeCase?.classList.contains("case--featured")
    );

    this.caseIndex.classList.toggle("case-rail--dark", activeCaseIsDark);
    this.caseIndex.classList.toggle("case-rail--light", !activeCaseIsDark);
  }

  syncCaptionContrast() {
    if (!this.caseIndex || window.innerWidth > 820) return;

    [
      this.caseIndex.querySelector(".case-rail-fixed-label"),
      this.caseIndex.querySelector(".case-rail-fixed-count"),
    ].filter(Boolean).forEach((caption) => {
      const rect = caption.getBoundingClientRect();
      const x = clamp(rect.left + rect.width / 2, 0, window.innerWidth - 1);
      const y = clamp(rect.top + rect.height / 2, 0, window.innerHeight - 1);
      const behind = document.elementsFromPoint(x, y).find((node) => !this.caseIndex.contains(node));
      const darkContext = Boolean(behind?.closest?.(".case--dark,.case--featured,.site-footer"));

      caption.style.color = darkContext ? "var(--bg)" : "var(--dark)";
    });
  }
}
