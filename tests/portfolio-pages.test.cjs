const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

const read = (path) => fs.readFileSync(path, "utf8");

test("production pages keep styles and scripts out of page source", () => {
  ["src/pages/index.astro", "src/pages/web.astro", "src/pages/gamedev.astro"].forEach((path) => {
    const source = read(path);
    assert.doesNotMatch(source, /<style\b/i);
    assert.doesNotMatch(source, /<script\b/i);
    assert.doesNotMatch(source, /portfolio_(about|web|gamedev)/);
    assert.doesNotMatch(source, /\b(src|data-lightbox)="assets\//);
  });
});

test("legacy data-copy markers are backed by data-lang attributes", () => {
  ["src/pages/index.astro", "src/pages/web.astro", "src/pages/gamedev.astro"].forEach((path) => {
    const source = read(path);
    const missing = [...source.matchAll(/data-copy="([^"]+)"(?![^>]*data-lang-ru)/g)].map((match) => match[1]);
    assert.deepEqual(missing, []);
  });
});

test("scss uses modules instead of deprecated imports", () => {
  const files = fs.readdirSync("src/styles", { recursive: true })
    .filter((path) => String(path).endsWith(".scss"))
    .map((path) => `src/styles/${path}`);

  files.forEach((path) => {
    assert.doesNotMatch(read(path), /@import\b/);
  });
});

test("portfolio runtime source and public asset stay synchronized", () => {
  assert.equal(
    read("src/scripts/portfolio-runtime.js"),
    read("public/assets/js/portfolio-runtime.js")
  );
});
