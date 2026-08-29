export function syncShell(language) {
  const main = document.querySelector("main[data-page-key]");
  if (!main) return;

  const pageKey = main.dataset.pageKey;
  document.body.dataset.page = pageKey;

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    const active = link.dataset.pageLink === pageKey;
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const role = document.querySelector("[data-shell-role]");
  if (role) {
    role.dataset.langRu = main.dataset.roleRu || "";
    role.dataset.langEn = main.dataset.roleEn || "";
  }

  const eyebrow = document.querySelector("[data-shell-footer-eyebrow]");
  if (eyebrow) {
    eyebrow.dataset.langRu = main.dataset.footerEyebrowRu || "";
    eyebrow.dataset.langEn = main.dataset.footerEyebrowEn || "";
  }

  const footerText = document.querySelector("[data-shell-footer-text]");
  if (footerText) {
    footerText.dataset.langRu = main.dataset.footerTextRu || "";
    footerText.dataset.langEn = main.dataset.footerTextEn || "";
  }

  const title = document.querySelector("[data-shell-footer-title]");
  if (title) {
    const value = language.lang === "en" ? main.dataset.footerTitleEn : main.dataset.footerTitleRu;
    if (value !== undefined) title.innerHTML = value;
  }

  const version = document.querySelector("[data-shell-footer-version]");
  if (version) version.textContent = main.dataset.footerVersion || "PORTFOLIO";

  language.apply();
}

export function waitForShell(language) {
  const ready = () => document.querySelector("[data-site-header]") && document.querySelector("[data-site-footer]");
  if (ready()) {
    syncShell(language);
    return;
  }

  const observer = new MutationObserver(() => {
    if (!ready()) return;
    observer.disconnect();
    syncShell(language);
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
