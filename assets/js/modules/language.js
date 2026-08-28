const normalizeLang = (lang) => (lang === "en" ? "en" : "ru");

export class LanguageController {
  constructor(copyByPage) {
    this.copyByPage = copyByPage;
    this.storageKey = "portfolio-lang";
    this.lang = this.readStoredLang();
    this.bound = false;
  }

  bind() {
    if (this.bound) return;
    this.bound = true;

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-lang-button]");
      if (!button) return;
      this.apply(button.dataset.langButton);
      this.writeStoredLang();
    });
  }

  readStoredLang() {
    try {
      return normalizeLang(localStorage.getItem(this.storageKey));
    } catch (_) {
      return "ru";
    }
  }

  writeStoredLang() {
    try {
      localStorage.setItem(this.storageKey, this.lang);
    } catch (_) {}
  }

  apply(lang = this.lang) {
    this.lang = normalizeLang(lang);
    document.documentElement.lang = this.lang;
    document.documentElement.dataset.lang = this.lang;

    this.applyGeneratedCopy();
    this.applyInlineCopy();
    this.syncButtons();

    document.dispatchEvent(new CustomEvent("portfolio:language-change", { detail: { lang: this.lang } }));
  }

  applyGeneratedCopy() {
    const pageKey = document.querySelector("main[data-page-key]")?.dataset.pageKey || "about";
    const copy = this.copyByPage[pageKey]?.[this.lang] || {};

    document.querySelectorAll("[data-copy]").forEach((element) => {
      const value = copy[element.dataset.copy];
      if (value !== undefined) element.innerHTML = value;
    });
  }

  applyInlineCopy() {
    document.querySelectorAll("[data-lang-ru][data-lang-en]").forEach((element) => {
      const value = this.lang === "en" ? element.dataset.langEn : element.dataset.langRu;
      if (value === undefined) return;

      if (element.hasAttribute("data-lang-html")) {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    });
  }

  syncButtons() {
    document.querySelectorAll("[data-lang-button]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.langButton === this.lang));
    });
  }
}
