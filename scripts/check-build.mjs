import {readFileSync,existsSync,readdirSync} from 'node:fs';import assert from 'node:assert/strict';
const routes=['','morse-code-alphabet/','morse-code-generator/','about/','privacy/'];
for(const locale of ['','zh/'])for(const route of routes){const html=readFileSync(`dist/${locale}${route}index.html`,'utf8');assert.equal((html.match(/<h1(?: |>)/g)??[]).length,1,`${locale}${route}: one h1`);assert.ok(html.includes(`https://dotsdashes.com/${locale}${route}`));assert.ok(html.includes('hreflang="en"'));assert.ok(html.includes('hreflang="zh-Hans"'));assert.ok(!html.includes('Signal Desk'));for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)){const path=decodeURI(match[1]);assert.ok(existsSync(`dist${path}`)||existsSync(`dist${path}/index.html`),`Broken asset/link ${path}`);}}
assert.ok(existsSync('dist/404.html'));assert.ok(!existsSync('dist/prototypes'));assert.ok(!existsSync('dist/spec'));const sitemap=readFileSync('dist/sitemap.xml','utf8');assert.equal((sitemap.match(/<loc>/g)??[]).length,10);console.log('10 localized pages: metadata, links, assets, sitemap and output isolation passed.');

// Validate every published text asset, including client bundles and metadata.
assert.ok(!existsSync('dist/build-info.json'), 'Build metadata must stay private to CI');
for (const file of readdirSync('dist', { recursive: true })) {
  if (!/\.(html|js|css|json|xml|txt|svg|map)$/.test(file)) continue;
  const body = readFileSync(`dist/${file}`, 'utf8');
  assert.ok(!/github\.com|xuyuji|yuji[ ._-]*xu|1987@gmail|0e406706300366fa2eb2edb388905b46/i.test(body), `Personal identity in ${file}`);
  const emails = body.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
  assert.ok(emails.every(email => email === 'contact@dotsdashes.com'), `Unexpected email in ${file}`);
  if (file.endsWith('.html')) assert.ok(body.includes('mailto:contact@dotsdashes.com'), `Contact missing in ${file}`);
}
console.log('Published identity and contact checks passed.');
