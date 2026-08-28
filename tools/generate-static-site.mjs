import { copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const referenceDir = join(root, "reference");

const pages = [
  {
    key: "about",
    source: join(referenceDir, "about.html"),
    out: join(root, "index.html"),
    assetPrefix: "assets/",
    templatePrefix: "",
    title: "Zonov Nikita / axnikita - Portfolio",
    description:
      "Portfolio of Zonov Nikita: full-stack WEB development, WordPress, PHP, JavaScript, REST API, SPA, GameDev and modding projects.",
    role: {
      ru: "Full-stack WEB developer · PHP / JavaScript / WordPress",
      en: "Full-stack WEB developer · PHP / JavaScript / WordPress",
    },
    footerVersion: "PORTFOLIO / ABOUT V1.8",
  },
  {
    key: "web",
    source: join(referenceDir, "web.html"),
    out: join(root, "web", "index.html"),
    assetPrefix: "../assets/",
    templatePrefix: "../",
    title: "Zonov Nikita / axnikita - WEB Portfolio",
    description:
      "WEB portfolio cases by Zonov Nikita: PHP, JavaScript, WordPress, REST API, production support and commercial full-stack development.",
    role: {
      ru: "Full-stack WEB developer · PHP / JavaScript / WordPress",
      en: "Full-stack WEB developer · PHP / JavaScript / WordPress",
    },
    footerVersion: "WEB PORTFOLIO / V1.9",
  },
  {
    key: "gamedev",
    source: join(referenceDir, "gamedev.html"),
    out: join(root, "gamedev", "index.html"),
    assetPrefix: "../assets/",
    templatePrefix: "../",
    title: "Zonov Nikita / axnikita - GameDev Portfolio",
    description:
      "GameDev and modding portfolio by Zonov Nikita: systems, balance, tooling, C++, JavaScript modding, PHP build pipelines and data-driven content.",
    role: {
      ru: "Developer · Game systems / balance / tooling",
      en: "Developer · Game systems / balance / tooling",
    },
    footerVersion: "GAMEDEV PORTFOLIO / V1.1",
  },
];

const emptyPixel =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const templateHeader = `<header class="site-header" data-site-header>
  <div class="header-inner">
    <a aria-label="Nikita - главная" class="brand" href="/" spa>
      <span aria-hidden="true" class="brand-mark"></span>
      <span>axnikita / Zonov Nikita</span>
    </a>
    <p class="site-role role" data-shell-field="role">Full-stack WEB developer · PHP / JavaScript / WordPress</p>
    <div class="header-actions">
      <nav aria-label="Основная навигация" class="site-nav">
        <ul>
          <li><a data-page-key="about" data-lang-ru="Обо мне" data-lang-en="About" href="/" spa>Обо мне</a></li>
          <li><a data-page-key="web" data-lang-ru="WEB" data-lang-en="WEB" href="/web/" spa>WEB</a></li>
          <li><a data-page-key="gamedev" data-lang-ru="GameDev" data-lang-en="GameDev" href="/gamedev/" spa>GameDev</a></li>
        </ul>
      </nav>
      <div aria-label="Выбор языка" class="language-switcher" role="group">
        <button aria-pressed="true" class="lang-button" data-lang-button="ru" type="button">RU</button>
        <button aria-pressed="false" class="lang-button" data-lang-button="en" type="button">EN</button>
      </div>
    </div>
  </div>
</header>
`;

const templateFooter = `<footer class="site-footer" id="contact" data-site-footer>
  <div class="footer-inner">
    <div class="footer-primary footer-grid">
      <div>
        <p class="footer-eyebrow" data-footer-field="eyebrow"></p>
        <h2 data-footer-field="title" data-lang-html></h2>
      </div>
      <div class="contact-panel footer-contact">
        <p data-footer-field="text"></p>
        <address class="contact-links">
          <a class="contact-link" href="https://kwork.ru/user/axnikita" rel="noopener noreferrer" target="_blank">
            <span data-lang-ru="Kwork / написать" data-lang-en="Kwork / contact">Kwork / написать</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a href="https://github.com/ax-nikita" rel="noopener noreferrer" target="_blank">GitHub ↗</a>
        </address>
      </div>
    </div>
    <div class="footer-meta footer-bottom">
      <span>© 2026 Zonov Nikita / axnikita</span>
      <span>WEB / GAMEDEV</span>
      <span data-footer-field="version"></span>
    </div>
  </div>
</footer>
`;

const getBlocks = (html, tagName) => {
  const re = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");
  return [...html.matchAll(re)].map((match) => match[1]);
};

const getTag = (html, tagName) => {
  const match = html.match(new RegExp(`<${tagName}\\b[^>]*>[\\s\\S]*?<\\/${tagName}>`, "i"));
  if (!match) throw new Error(`Missing <${tagName}> in reference HTML.`);
  return match[0];
};

const extractCopy = (html) => {
  const scripts = getBlocks(html, "script").join("\n\n");
  const match = scripts.match(/const\s+COPY\s*=\s*({[\s\S]*?});/);
  if (!match) throw new Error("Missing COPY map in reference script.");
  return Function(`"use strict"; return (${match[1]});`)();
};

const escapeAttr = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const rewriteAssetPaths = (html, page) =>
  html
    .replace(/\b(src|data-lightbox)="assets\/(about|web|gamedev)\//g, `$1="${page.assetPrefix}images/$2/`)
    .replaceAll('<img alt="" src=""/>', `<img alt="" src="${emptyPixel}"/>`);

const footerFromCopy = (copy, page) => ({
  eyebrow: {
    ru: copy.ru.footEye ?? copy.ru.footerEyebrow ?? "",
    en: copy.en.footEye ?? copy.en.footerEyebrow ?? "",
  },
  title: {
    ru: copy.ru.footTitle ?? copy.ru.footerTitle ?? "",
    en: copy.en.footTitle ?? copy.en.footerTitle ?? "",
  },
  text: {
    ru: copy.ru.footText ?? copy.ru.footerText ?? "",
    en: copy.en.footText ?? copy.en.footerText ?? "",
  },
  version: page.footerVersion,
});

const decorateMain = (main, page, copy) => {
  const footer = footerFromCopy(copy, page);
  const attributes = [
    `id="main"`,
    `data-page-key="${page.key}"`,
    `data-page-title="${escapeAttr(page.title)}"`,
    `data-page-description="${escapeAttr(page.description)}"`,
    `data-role-ru="${escapeAttr(page.role.ru)}"`,
    `data-role-en="${escapeAttr(page.role.en)}"`,
    `data-footer-eyebrow-ru="${escapeAttr(footer.eyebrow.ru)}"`,
    `data-footer-eyebrow-en="${escapeAttr(footer.eyebrow.en)}"`,
    `data-footer-title-ru="${escapeAttr(footer.title.ru)}"`,
    `data-footer-title-en="${escapeAttr(footer.title.en)}"`,
    `data-footer-text-ru="${escapeAttr(footer.text.ru)}"`,
    `data-footer-text-en="${escapeAttr(footer.text.en)}"`,
    `data-footer-version="${escapeAttr(footer.version)}"`,
  ].join(" ");

  return main.replace(/<main\b[^>]*>/i, `<main ${attributes}>`);
};

const renderPage = (page, main) => `<!doctype html>
<html lang="ru" data-lang="ru">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="description" content="${escapeAttr(page.description)}"/>
  <title>${escapeAttr(page.title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800;900&family=Unbounded:wght@400;500;600;700&display=swap"/>
  <link rel="stylesheet" href="${page.assetPrefix}css/main.css"/>
  <script src="${page.assetPrefix}js/axnikitaJS.js" defer></script>
  <script type="module" src="${page.assetPrefix}js/site-runtime.js"></script>
</head>
<body data-page="${page.key}">
  <a class="skip-link" data-lang-ru="Перейти к содержимому" data-lang-en="Skip to content" href="#main">Перейти к содержимому</a>
  <div class="site-shell">
    <div class="template-slot template-slot--header" domLoader="${page.templatePrefix}templates/header.html" requestWeight="0.5"></div>
    ${main}
    <div class="template-slot template-slot--footer" domLoader="${page.templatePrefix}templates/footer.html" requestWeight="0.5"></div>
  </div>
  <dialog aria-label="Просмотр изображения" class="lightbox" id="lightbox">
    <div class="lightbox-inner">
      <button aria-label="Закрыть" class="lightbox-close" data-lightbox-close type="button">×</button>
      <img alt="" src="${emptyPixel}"/>
    </div>
  </dialog>
</body>
</html>
`;

const writeGeneratedCopyModule = async (copyByPage) => {
  await mkdir(join(root, "assets", "js", "modules"), { recursive: true });
  await writeFile(
    join(root, "assets", "js", "modules", "page-copy.js"),
    `export const PAGE_COPY = ${JSON.stringify(copyByPage, null, 2)};\n`,
    "utf8"
  );
};

await mkdir(join(root, "templates"), { recursive: true });
await mkdir(join(root, "assets", "js"), { recursive: true });
await mkdir(join(root, "assets", "css"), { recursive: true });
await mkdir(join(root, "assets", "images"), { recursive: true });

await Promise.all([
  rm(join(root, "assets", "about"), { recursive: true, force: true }),
  rm(join(root, "assets", "web"), { recursive: true, force: true }),
  rm(join(root, "assets", "gamedev"), { recursive: true, force: true }),
  rm(join(root, "assets", "css", "about.css"), { force: true }),
  rm(join(root, "assets", "css", "web.css"), { force: true }),
  rm(join(root, "assets", "css", "gamedev.css"), { force: true }),
]);
await rm(join(root, "assets", "images"), { recursive: true, force: true });
await cp(join(referenceDir, "assets"), join(root, "assets", "images"), { recursive: true });
await copyFile(join(root, "vendor", "axnikitaJS", "axnikitaJS.js"), join(root, "assets", "js", "axnikitaJS.js"));
await writeFile(join(root, "templates", "header.html"), templateHeader, "utf8");
await writeFile(join(root, "templates", "footer.html"), templateFooter, "utf8");

const copyByPage = {};

for (const page of pages) {
  const sourceHtml = await readFile(page.source, "utf8");
  const copy = extractCopy(sourceHtml);
  const main = decorateMain(rewriteAssetPaths(getTag(sourceHtml, "main"), page), page, copy);

  copyByPage[page.key] = copy;

  await mkdir(dirname(page.out), { recursive: true });
  await writeFile(page.out, renderPage(page, main), "utf8");
}

await writeGeneratedCopyModule(copyByPage);
await writeFile(join(root, ".nojekyll"), "", "utf8");
