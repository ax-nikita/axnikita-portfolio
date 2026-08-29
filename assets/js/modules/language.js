import { PAGE_COPY } from "../copy.js";

const normalizeLang = (lang) => (lang === "en" ? "en" : "ru");

export class LanguageController {
  constructor() {
    this.lang = this.read();
    this.bound = false;
  }

  read() {
    try {
      return normalizeLang(localStorage.getItem("portfolio-lang"));
    } catch (_) {
      return "ru";
    }
  }

  write() {
    try {
      localStorage.setItem("portfolio-lang", this.lang);
    } catch (_) {}
  }

  bind() {
    if (this.bound) return;
    this.bound = true;

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-lang-button]");
      if (!button) return;
      this.apply(button.dataset.langButton);
      this.write();
    });
  }

  apply(lang = this.lang) {
    this.lang = normalizeLang(lang);
    document.documentElement.lang = this.lang;
    document.documentElement.dataset.lang = this.lang;

    const pageKey = document.querySelector("main[data-page-key]")?.dataset.pageKey || "about";
    const copy = PAGE_COPY[pageKey]?.[this.lang] || {};

    document.querySelectorAll("[data-copy]").forEach((element) => {
      const value = copy[element.dataset.copy];
      if (value !== undefined) element.innerHTML = value;
    });

    document.querySelectorAll("[data-lang-ru][data-lang-en]").forEach((element) => {
      const value = this.lang === "en" ? element.dataset.langEn : element.dataset.langRu;
      if (value !== undefined) element.textContent = value;
    });

    document.querySelectorAll("[data-lang-button]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.langButton === this.lang));
    });
  }
}
