const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = [
  ['index.html', 'index.html'],
  ['whatwedo.html', 'whatwedo.html'],
  ['whyhudsonhelm.html', 'whyhudsonhelm.html'],
  ['whoweare.html', 'whoweare.html'],
  ['areweagoodfit.html', 'areweagoodfit.html'],
  ['starthere.html', 'starthere.html'],
  ['support.html', 'support.html'],
  ['404.html', null],
];
const expectedNavigation = [
  ['Home', 'index.html'],
  ['What We Do', 'whatwedo.html'],
  ['Why Hudson Helm', 'whyhudsonhelm.html'],
  ['Who We Are', 'whoweare.html'],
  ['Are We a Good Fit?', 'areweagoodfit.html'],
  ['Support', 'support.html'],
  ['Start Here', 'starthere.html'],
];

const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

function normalizeText(value) {
  return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

for (const [file, currentPage] of pages) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const header = html.match(/<header\b[\s\S]*?<\/header>/i)?.[0];
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0];
  const head = html.match(/<head\b[\s\S]*?<\/head>/i)?.[0];

  if (!header || !footer || !head) {
    fail(file, 'missing head, header, or footer');
    continue;
  }

  if (!/<link\b[^>]*href=["']css\/hudson-helm\.css["'][^>]*>/i.test(head)) {
    fail(file, 'does not load the shared Hudson Helm stylesheet');
  }

  if (!/<nav\b[^>]*aria-label=["']Primary navigation["']/i.test(header)) {
    fail(file, 'primary navigation is not labelled');
  }

  if (!header.includes('tel:9542256560') || !header.includes('mailto:info@hudsonhelm.com')) {
    fail(file, 'shared contact details are inconsistent');
  }

  const menu = header.match(/<ul\b[^>]*id=["']pq-main-menu["'][^>]*>([\s\S]*?)<\/ul>/i)?.[1];
  if (!menu) {
    fail(file, 'primary navigation list is missing');
  } else {
    const links = [...menu.matchAll(/<a\b([^>]*)href=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi)]
      .map((match) => ({
        attrs: `${match[1]} ${match[3]}`,
        href: match[2],
        text: normalizeText(match[4]),
      }));

    if (links.length !== expectedNavigation.length) {
      fail(file, `expected ${expectedNavigation.length} menu links, found ${links.length}`);
    }

    expectedNavigation.forEach(([text, href], index) => {
      const link = links[index];
      if (!link || link.text !== text || link.href !== href) {
        fail(file, `navigation item ${index + 1} should be ${text} -> ${href}`);
      }
    });

    const pendingLinks = links.filter((link) => /data-pending-page=["']true["']/.test(link.attrs));
    if (pendingLinks.length !== 0) {
      fail(file, 'temporary pending-page links remain in primary navigation');
    }
  }

  if (!/<a\b[^>]*class=["'][^"']*hh-desktop-cta[^"']*["'][^>]*href=["']starthere\.html["']/i.test(header)
      && !/<a\b[^>]*href=["']starthere\.html["'][^>]*class=["'][^"']*hh-desktop-cta/i.test(header)) {
    fail(file, 'desktop Start Here call to action is missing');
  }

  const currentCount = (header.match(/aria-current=["']page["']/gi) || []).length;
  const expectedCurrentCount = currentPage === 'starthere.html' ? 2 : currentPage ? 1 : 0;
  if (currentCount !== expectedCurrentCount) {
    fail(file, `expected ${expectedCurrentCount} current-page markers, found ${currentCount}`);
  }

  if (!footer.includes('Copyright 2026 Hudson Helm. All Rights Reserved.')) {
    fail(file, 'shared copyright text is inconsistent');
  }

  if (!footer.includes('images/logos/hudson-helm-logo-w-trans.png')) {
    fail(file, 'shared footer logo is inconsistent');
  }

  if (/peacefulqode|Los Angeles|Lorem Ipsum|Techtrix/i.test(`${header}${footer}`)) {
    fail(file, 'template residue remains in shared structure');
  }
}

const sharedCss = fs.readFileSync(path.join(root, 'css', 'hudson-helm.css'), 'utf8');
for (const requiredToken of [
  '--hh-space-section',
  ':focus-visible',
  '@media (max-width: 1199px)',
  '.hh-mobile-only',
  '.hh-desktop-cta',
]) {
  if (!sharedCss.includes(requiredToken)) {
    fail('css/hudson-helm.css', `missing ${requiredToken}`);
  }
}

if (!/header#pq-header \.hh-desktop-cta \.pq-button-text\s*\{[\s\S]*font-size: 17px;[\s\S]*font-weight: 700;[\s\S]*line-height: 1;/.test(sharedCss)) {
  fail('css/hudson-helm.css', 'header Start Here CTA typography does not match the form actions');
}

if (failures.length) {
  console.error('Phase 1 structural checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Phase 1 structural checks passed for ${pages.length} pages.`);
