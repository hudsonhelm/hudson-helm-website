const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const failures = [];

function requireMatch(label, pattern) {
  if (!pattern.test(home)) failures.push(`missing ${label}`);
}

function forbid(label, pattern) {
  if (pattern.test(home)) failures.push(`obsolete ${label} remains`);
}

requireMatch('static homepage hero', /<section class="hh-home-hero">/);
requireMatch('approved hero heading', /<h1>Dependable IT Support For Small Business<\/h1>/);
requireMatch('first-slide foreground image', /src="rev\/assets\/bg-1\.jpg"/);
requireMatch('first-slide circuit background', /url\("rev\/assets\/2-2\.jpg"\)/);
requireMatch('Cloud & Email service', /<h3 class="pq-icon-box-title">Cloud &amp; Email<\/h3>/);
requireMatch('approved Cloud & Email description', /Email, calendars, licensing, and cloud administration for the tools your business relies on\./);
requireMatch('approved Network & Wi-Fi description', /Setup, troubleshooting, and improvement for firewalls, switches, Wi-Fi, and connectivity\./);
requireMatch('compact Why Hudson Helm section', /<section class="hh-home-why">/);
requireMatch('Why Hudson Helm destination', /<a class="pq-button hh-blue-btn" href="whyhudsonhelm\.html">/);

const serviceCards = (home.match(/<div class="pq-icon-box pq-style-2">/g) || []).length;
if (serviceCards !== 8) failures.push(`expected 8 service cards, found ${serviceCards}`);

const differentiators = (home.match(/<li><i aria-hidden="true" class="ion ion-android-done-all"><\/i>/g) || []).length;
if (differentiators !== 4) failures.push(`expected 4 homepage differentiators, found ${differentiators}`);

const h1Count = (home.match(/<h1(?:\s|>)/g) || []).length;
if (h1Count !== 1) failures.push(`expected one H1, found ${h1Count}`);

forbid('Revolution Slider markup', /<\/?rs-(?:module|module-wrap|slides?|layer|static-layers)\b/i);
forbid('Revolution Slider stylesheet/script', /(?:rev\/css\/rs6\.css|rev\/js\/(?:rbtools|rs6)\.min\.js|js\/rev-custom\.js)/);
forbid('homepage carousel dependency', /owl\.carousel\.min\.(?:css|js)/);
forbid('homepage Rough Notation dependency', /js\/rough-(?:script|notation\.iife|custom)\.js/);
forbid('hero Read More button', />Read More\s*</);

if (failures.length) {
  console.error('Phase 2 homepage checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Phase 2 homepage checks passed.');
}
