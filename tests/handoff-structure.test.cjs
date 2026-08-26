const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const read = (path) => fs.readFileSync(path, 'utf8');

test('shared shell is single-source and header uses native spa', () => {
  const header = read('src/components/SiteHeader.astro');
  const footer = read('src/components/SiteFooter.astro');
  const runtime = read('src/scripts/portfolio-runtime.js');

  assert.equal((header.match(/<header/g) || []).length, 1);
  assert.equal((footer.match(/<footer/g) || []).length, 1);
  assert.match(header, /\sspa(?:\s|>)/);
  assert.doesNotMatch(header, /data-portfolio-spa/);
  assert.doesNotMatch(runtime, /class PortfolioRouter/);
  assert.match(runtime, /end_load_spa/);
});
