const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pages = [
  'index.html',
  'whatwedo.html',
  'whyhudsonhelm.html',
  'whoweare.html',
  'areweagoodfit.html',
  'starthere.html',
  'support.html',
  'privacy.html',
  '404.html',
];
const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

for (const file of pages) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0];
  if (!footer) {
    fail(file, 'global footer is missing');
    continue;
  }

  for (const required of [
    'class="hh-footer-main"',
    'class="hh-footer-grid"',
    'Serving New Jersey &amp; New York',
    'mailto:info@hudsonhelm.com',
    'href="starthere.html"',
    'href="support.html"',
    'Royal Court Holdings, LLC dba Hudson Helm',
    'href="privacy.html"',
  ]) {
    if (!footer.includes(required)) fail(file, `footer is missing ${required}`);
  }

  if (!/css\/hudson-helm\.css\?v=20260911-phase9/.test(html)) {
    fail(file, 'Phase 9 shared stylesheet version is missing');
  }

  if (/954[- ]?225[- ]?6560|tel:9542256560|Northern New Jersey|\bNYC\b|Philadelphia/i.test(html)) {
    fail(file, 'temporary phone or superseded locality copy remains');
  }
}

const privacy = fs.readFileSync(path.join(root, 'privacy.html'), 'utf8');
for (const required of [
  '<title>Privacy Policy - Hudson Helm</title>',
  'Effective date:</strong> September 11, 2026',
  'Information you provide',
  'Client Support Portal',
  'Cloudflare Turnstile',
  'Migadu',
  'Cookies and analytics',
  'How information is shared',
  'Retention and security',
  'mailto:info@hudsonhelm.com',
]) {
  if (!privacy.includes(required)) fail('privacy.html', `missing ${required}`);
}
if ((privacy.match(/<h1(?:\s|>)/g) || []).length !== 1) fail('privacy.html', 'must contain exactly one H1');

const notFound = fs.readFileSync(path.join(root, '404.html'), 'utf8');
for (const required of [
  '<title>Page Not Found - Hudson Helm</title>',
  '<meta name="robots" content="noindex, follow">',
  'We couldn\'t find that page.',
  'Back to Home',
  'What We Do',
  'Start Here',
]) {
  if (!notFound.includes(required)) fail('404.html', `missing ${required}`);
}
if ((notFound.match(/<h1(?:\s|>)/g) || []).length !== 1) fail('404.html', 'must contain exactly one H1');
if (/Techrix|Oops! This Page|404 Error/.test(notFound)) fail('404.html', 'legacy template copy remains');

const sharedCss = fs.readFileSync(path.join(root, 'css', 'hudson-helm.css'), 'utf8');
for (const required of ['.hh-footer-grid', '.hh-footer-legal-row', '.hh-legal-copy', '.hh-not-found']) {
  if (!sharedCss.includes(required)) fail('css/hudson-helm.css', `missing ${required}`);
}

if (failures.length) {
  console.error('Phase 9 Global Completion checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Phase 9 Global Completion checks passed for ${pages.length} pages.`);
