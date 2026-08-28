export const getCurrentPageKey = () =>
  document.querySelector("main[data-page-key]")?.dataset.pageKey || document.body.dataset.page || "about";

const setLangDataset = (element, ru, en) => {
  if (!element || ru === undefined || en === undefined) return;
  element.dataset.langRu = ru;
  element.dataset.langEn = en;
};

export function syncShell() {
  const main = document.querySelector("main[data-page-key]");
  if (!main) return;

  const pageKey = main.dataset.pageKey;
  document.body.dataset.page = pageKey;

  if (main.dataset.pageTitle) document.title = main.dataset.pageTitle;

  const description = document.querySelector('meta[name="description"]');
  if (description && main.dataset.pageDescription) {
    description.content = main.dataset.pageDescription;
  }

  setLangDataset(document.querySelector('[data-shell-field="role"]'), main.dataset.roleRu, main.dataset.roleEn);

  document.querySelectorAll(".site-nav [data-page-key]").forEach((link) => {
    const active = link.dataset.pageKey === pageKey;
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const skipLink = document.querySelector(".skip-link");
  if (skipLink) skipLink.href = "#main";

  setLangDataset(
    document.querySelector('[data-footer-field="eyebrow"]'),
    main.dataset.footerEyebrowRu,
    main.dataset.footerEyebrowEn
  );
  setLangDataset(
    document.querySelector('[data-footer-field="title"]'),
    main.dataset.footerTitleRu,
    main.dataset.footerTitleEn
  );
  setLangDataset(
    document.querySelector('[data-footer-field="text"]'),
    main.dataset.footerTextRu,
    main.dataset.footerTextEn
  );

  const footerVersion = document.querySelector('[data-footer-field="version"]');
  if (footerVersion && main.dataset.footerVersion) footerVersion.textContent = main.dataset.footerVersion;
}

export function formatFooterTitle() {
  document.querySelectorAll(".site-footer h2 span").forEach((span) => {
    span.classList.add("footer-title-accent");
  });
}
