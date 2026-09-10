const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'whyhudsonhelm.html'), 'utf8');
const failures = [];

function requireMatch(label, pattern) {
  if (!pattern.test(page)) failures.push(`missing ${label}`);
}

function forbid(label, pattern) {
  if (pattern.test(page)) failures.push(`obsolete ${label} remains`);
}

requireMatch('semantic main content', /<main>/);
requireMatch('approved hero', /<section class="hh-why-hero"[\s\S]*?<h1 id="why-hudson-helm">A smaller MSP by design, so your business never feels like a ticket number\.<\/h1>/);
requireMatch('approved hero image', /src="images\/benefits\/2\.jpg"/);
requireMatch('differentiator section', /<section class="hh-why-differentiators"/);
requireMatch('Responsive support', /<h4 class="pq-icon-box-title">Responsive support<\/h4>/);
requireMatch('Practical security', /<h4 class="pq-icon-box-title">Practical security<\/h4>/);
requireMatch('Right-sized IT', /<h4 class="pq-icon-box-title">Right-sized IT<\/h4>/);
requireMatch('Ownership', /<h4 class="pq-icon-box-title">Ownership<\/h4>/);
requireMatch('trust statement', /<h2 id="why-trust-title">We are not trying to be the biggest shop in the room\. We are trying to be the one you trust\.<\/h2>/);
requireMatch('light three-column treatment', /<section class="hh-why-principles"[\s\S]*?Direct communication[\s\S]*?A cleaner, calmer IT environment[\s\S]*?Advice with your budget in mind/);
requireMatch('approved closing CTA', /<section class="hh-why-closing"[\s\S]*?If your current IT feels slow, reactive, overpriced, or just harder than it should be, that is fixable\.[\s\S]*?href="starthere\.html"/);

const cards = (page.match(/class="pq-icon-box pq-style-2 hh-why-card"/g) || []).length;
if (cards !== 4) failures.push(`expected 4 differentiator cards, found ${cards}`);

const principles = (page.match(/class="hh-why-principle"/g) || []).length;
if (principles !== 3) failures.push(`expected 3 compact principles, found ${principles}`);

const h1Count = (page.match(/<h1(?:\s|>)/g) || []).length;
if (h1Count !== 1) failures.push(`expected one H1, found ${h1Count}`);

forbid('second large stock photograph', /images\/tabs\/4\.jpg/);
forbid('eyebrow label markup', /<span class="pq-section-sub-title"/);
forbid('Why Hudson Helm Rough Notation dependency', /js\/rough-(?:script|notation\.iife|custom)\.js/);
forbid('Why Hudson Helm Owl Carousel dependency', /owl\.carousel\.min\.(?:css|js)/);
forbid('external legacy jQuery dependency', /ajax\.googleapis\.com\/ajax\/libs\/jquery/);

if (failures.length) {
  console.error('Phase 4 Why Hudson Helm checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Phase 4 Why Hudson Helm checks passed.');
}
