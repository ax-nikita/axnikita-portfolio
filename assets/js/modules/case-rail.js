const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export class CaseRailController {
  constructor() {
    this.cleanup = () => {};
  }

  init() {
    this.destroy();

    const caseIndex = document.querySelector(".case-index");
    const cases = [...document.querySelectorAll("main section.case")];
    const links = caseIndex ? [...caseIndex.querySelectorAll("a")] : [];
    if (!caseIndex || !cases.length) return;

    const controller = new AbortController();
    const { signal } = controller;
    let metrics = [];
    let currentCase = -1;
    let ticking = false;
    let resizeTimer = null;

    const syncContrast = () => {
      if (window.innerWidth > 820) return;
      [
        caseIndex.querySelector(".case-rail-fixed-label"),
        caseIndex.querySelector(".case-rail-fixed-count"),
      ].filter(Boolean).forEach((caption) => {
        const rect = caption.getBoundingClientRect();
        const x = clamp(rect.left + rect.width / 2, 0, window.innerWidth - 1);
        const y = clamp(rect.top + rect.height / 2, 0, window.innerHeight - 1);
        const behind = document.elementsFromPoint(x, y).find((node) => !caseIndex.contains(node));
        const dark = Boolean(behind?.closest?.(".case--dark,.case--featured,.site-footer"));
        caption.style.color = dark ? "var(--bg)" : "var(--dark)";
      });
    };

    const update = () => {
      if (!metrics.length) return;

      const readingLine = window.scrollY + window.innerHeight * 0.34;
      let activeIndex = 0;

      for (let i = 0; i < metrics.length; i += 1) {
        if (readingLine >= metrics[i].top) activeIndex = i;
        else break;
      }

      if (activeIndex !== currentCase) {
        currentCase = activeIndex;

        links.forEach((link, index) => {
          const active = index === activeIndex;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "step");
          else link.removeAttribute("aria-current");
        });

        const activeLink = links[activeIndex];
        const number = activeLink?.querySelector("span:first-child")?.textContent?.trim() || "";
        const label = activeLink?.querySelector("span:last-child")?.textContent?.trim() || "";

        caseIndex.style.setProperty("--active-case-number", `"${number}"`);
        caseIndex.style.setProperty("--active-case-label", `"${label}"`);

        caseIndex.querySelector(".case-rail-fixed-label")?.replaceChildren(label);
        caseIndex.querySelector(".case-rail-fixed-count")?.replaceChildren(
          `${number}/${String(cases.length).padStart(2, "0")}`
        );

        const activeCase = cases[activeIndex];
        const dark = Boolean(
          activeCase?.classList.contains("case--dark") ||
          activeCase?.classList.contains("case--featured")
        );

        caseIndex.classList.toggle("case-rail--dark", dark);
        caseIndex.classList.toggle("case-rail--light", !dark);
      }

      const first = metrics[0].top;
      const last = metrics.at(-1).top;
      const progress = last > first ? clamp((readingLine - first) / (last - first), 0, 1) : 0;
      caseIndex.style.setProperty("--case-progress", progress.toFixed(4));
      syncContrast();
    };

    const measure = () => {
      metrics = cases.map((section) => ({
        id: section.id,
        top: section.getBoundingClientRect().top + window.scrollY,
      }));
      update();
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    window.addEventListener("scroll", requestUpdate, { passive: true, signal });
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 120);
    }, { signal });

    measure();
    document.fonts?.ready?.then(measure).catch(() => {});

    this.cleanup = () => {
      clearTimeout(resizeTimer);
      controller.abort();
    };
  }

  destroy() {
    this.cleanup();
    this.cleanup = () => {};
  }
}
