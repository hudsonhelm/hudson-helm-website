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
    'class="hh-footer-legal-row"',
    'class="hh-footer-logo"',
    'class="hh-footer-brand-logo"',
    'class="hh-footer-locality"',
    'class="hh-footer-phone"',
    'Serving New Jersey &amp; New York',
    'href="tel:+18622328023"',
    '862-232-8023',
    'Royal Court Holdings, LLC dba Hudson Helm',
    'href="privacy.html"',
  ]) {
    if (!footer.includes(required)) fail(file, `footer is missing ${required}`);
  }

  for (const removed of ['hh-footer-main', 'hh-footer-grid', 'hh-footer-summary', '>Explore<', '>Connect<', 'hh-footer-email', 'hh-footer-actions', 'Experienced, responsive IT support and practical technology guidance for small businesses.']) {
    if (footer.includes(removed)) fail(file, `removed upper-footer content remains: ${removed}`);
  }

  if (!/css\/hudson-helm\.css\?v=20260911-back-to-top/.test(html)) {
    fail(file, 'back-to-top shared stylesheet version is missing');
  }

  if (!html.includes('id="back-to-top"')) fail(file, 'back-to-top control is missing');
  if (!html.includes('aria-label="Back to top"') || !html.includes('id="top"')) {
    fail(file, 'back-to-top control is not wired or accessibly labeled');
  }
  if (html.includes('id="#top"')) fail(file, 'invalid back-to-top target remains');

  if (/954[- ]?225[- ]?6560|tel:9542256560|Northern New Jersey|\bNYC\b|Philadelphia/i.test(html)) {
    fail(file, 'temporary phone or superseded locality copy remains');
  }
}

const privacy = fs.readFileSync(path.join(root, 'privacy.html'), 'utf8');
for (const required of [
  '<title>Privacy Policy - Hudson Helm</title>',
  'Effective date:</strong> September 10, 2026',
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
if (privacy.includes('How Royal Court Holdings, LLC dba Hudson Helm handles information submitted through this website.')) {
  fail('privacy.html', 'explanatory hero subtitle remains');
}

const notFound = fs.readFileSync(path.join(root, '404.html'), 'utf8');
const apacheConfig = fs.readFileSync(path.join(root, '.htaccess'), 'utf8');
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
if (!/^ErrorDocument 404 \/404\.html\s*$/m.test(apacheConfig)) fail('.htaccess', 'custom 404 routing is missing');

const sharedCss = fs.readFileSync(path.join(root, 'css', 'hudson-helm.css'), 'utf8');
for (const required of ['.hh-footer-legal-row', '.hh-footer-logo', '.hh-footer-brand-logo', '.hh-footer-locality', '.hh-footer-phone', '.hh-legal-copy', '.hh-not-found', '#back-to-top .top', 'border: 2px solid #fd4a18']) {
  if (!sharedCss.includes(required)) fail('css/hudson-helm.css', `missing ${required}`);
}

if (failures.length) {
  console.error('Phase 9 Global Completion checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Phase 9 Global Completion checks passed for ${pages.length} pages.`);
