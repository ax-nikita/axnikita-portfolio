const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

const read = (path) => fs.readFileSync(path, "utf8");
const pages = ["index.html", "web/index.html", "gamedev/index.html"];

test("shared shell is single-source and uses native axnikitaJS loaders", () => {
  const header = read("templates/header.html");
  const footer = read("templates/footer.html");
  const runtime = read("assets/js/site-runtime.js");
  const config = read("tools/site-config.mjs");

  assert.equal((header.match(/<header\b/g) || []).length, 1);
  assert.equal((footer.match(/<footer\b/g) || []).length, 1);
  assert.match(header, /\sspa(?:\s|>)/);
  assert.doesNotMatch(header, /data-portfolio-spa/);
  assert.match(runtime, /end_load_spa/);
  assert.doesNotMatch(runtime, /class\s+PortfolioRouter/);
  assert.match(config, /SITE_BASE = "\/axnikita-portfolio\/"/);
});

test("page sources do not duplicate header or footer markup", () => {
  pages.forEach((path) => {
    const source = read(path);

    assert.doesNotMatch(source, /class="site-header"/);
    assert.doesNotMatch(source, /<footer\b/);
    assert.match(source, /domLoader="(?:\.\.\/)?templates\/header\.html" cacheTime="86400"/);
    assert.match(source, /domLoader="(?:\.\.\/)?templates\/footer\.html" cacheTime="86400"/);
  });
});

test("generated pages use one compiled stylesheet and one shared runtime", () => {
  pages.forEach((path) => {
    const source = read(path);

    assert.match(source, /assets\/css\/main\.css/);
    assert.match(source, /assets\/js\/site-runtime\.js/);
    assert.doesNotMatch(source, /assets\/css\/(?:about|web|gamedev)\.css/);
    assert.doesNotMatch(source, /assets\/js\/(?:about|web|gamedev)\.js/);
  });
});

test("build treats production HTML as source files", () => {
  const build = read("tools/build-static-site.mjs");
  const packageJson = JSON.parse(read("package.json"));

  assert.doesNotMatch(build, /generate-static-site/);
  assert.doesNotMatch(build, /reference/);
  assert.equal(packageJson.scripts.generate, undefined);
});
