const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

const read = (path) => fs.readFileSync(path, "utf8");

const pageEntries = [
  ["about", "index.html"],
  ["web", "web/index.html"],
  ["gamedev", "gamedev/index.html"],
];

const expectedRoutes = [
  "/axnikita-portfolio/",
  "/axnikita-portfolio/web/",
  "/axnikita-portfolio/gamedev/",
];

const readGeneratedCopy = () => {
  const source = read("assets/js/modules/page-copy.js");
  const json = source.match(/export const PAGE_COPY = ([\s\S]*);\s*$/)?.[1];
  assert.ok(json, "page-copy.js exports PAGE_COPY as generated JSON");
  return JSON.parse(json);
};

test("production pages keep inline styles and scripts out of page source", () => {
  pageEntries.forEach(([, path]) => {
    const source = read(path);
    const inlineScripts = [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
      .map((match) => match[1].trim())
      .filter(Boolean);

    assert.doesNotMatch(source, /<style\b/i);
    assert.deepEqual(inlineScripts, []);
  });
});

test("page mains are ported from reference with generated page metadata", () => {
  pageEntries.forEach(([pageKey, path]) => {
    const source = read(path);
    const main = source.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || "";

    assert.match(main, new RegExp(`data-page-key="${pageKey}"`));
    assert.match(main, /data-page-title="/);
    assert.match(main, /data-footer-title-ru="/);
  });
});

test("image references use organized assets/images paths", () => {
  pageEntries.forEach(([, path]) => {
    const source = read(path);

    assert.doesNotMatch(source, /\b(?:src|data-lightbox)="(?:\.\.\/)?assets\/(?:about|web|gamedev)\//);
    assert.doesNotMatch(source, /\b(?:src|data-lightbox)="reference\//);
    assert.doesNotMatch(source, /\b(?:src|data-lightbox)="\/assets\//);
    assert.match(source, /(?:src|data-lightbox)="(?:\.\.\/)?assets\/images\//);
  });
});

test("shared header uses GitHub Pages hrefs and preserves native spa links", () => {
  const header = read("templates/header.html");

  expectedRoutes.forEach((href) => {
    assert.match(header, new RegExp(`href="${href}"\\s+spa`));
  });

  assert.doesNotMatch(header, /href="\/(?:web|gamedev)?\/?"/);
});

test("static page asset paths resolve inside the GitHub Pages subdirectory", () => {
  const about = read("index.html");
  const web = read("web/index.html");
  const gamedev = read("gamedev/index.html");

  assert.match(about, /href="assets\/css\/main\.css"/);
  assert.match(about, /src="assets\/js\/site-runtime\.js"/);
  assert.match(web, /href="\.\.\/assets\/css\/main\.css"/);
  assert.match(web, /src="\.\.\/assets\/js\/site-runtime\.js"/);
  assert.match(gamedev, /href="\.\.\/assets\/css\/main\.css"/);
  assert.match(gamedev, /src="\.\.\/assets\/js\/site-runtime\.js"/);
});

test("legacy data-copy markers are backed by generated reference copy", () => {
  const copy = readGeneratedCopy();

  pageEntries.forEach(([pageKey, path]) => {
    const source = read(path);
    const keys = [...source.matchAll(/data-copy="([^"]+)"/g)].map((match) => match[1]);
    const missing = keys.filter((key) => copy[pageKey]?.ru?.[key] === undefined || copy[pageKey]?.en?.[key] === undefined);

    assert.deepEqual(missing, []);
  });
});

test("scss uses modules instead of deprecated imports", () => {
  const files = fs.readdirSync("assets/scss", { recursive: true })
    .filter((path) => String(path).endsWith(".scss"))
    .map((path) => `assets/scss/${path}`);

  files.forEach((path) => {
    assert.doesNotMatch(read(path), /@import\b/);
  });
});

test("shared case styles are owned by components, not the WEB page partial", () => {
  const webScss = read("assets/scss/pages/_web.scss");

  [
    ".web-hero",
    ".case-index",
    ".case-inner",
    ".case-head",
    ".case-title",
    ".case-lead",
    ".case-info",
    ".gallery",
    ".stack",
    ".lightbox",
  ].forEach((selector) => {
    assert.doesNotMatch(webScss, new RegExp(`^\\s*${selector.replace(".", "\\.")}\\b`, "m"));
  });

  assert.match(read("assets/scss/components/_hero.scss"), /\.web-hero/);
  assert.match(read("assets/scss/components/_case-index.scss"), /\.case-index/);
  assert.match(read("assets/scss/components/_case.scss"), /\.case-inner/);
  assert.match(read("assets/scss/components/_gallery.scss"), /\.gallery/);
  assert.match(read("assets/scss/components/_lightbox.scss"), /\.lightbox/);
});
