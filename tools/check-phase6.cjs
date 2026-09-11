const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'areweagoodfit.html'), 'utf8');
const failures = [];

function requireMatch(label, pattern) {
  if (!pattern.test(page)) failures.push(`missing ${label}`);
}

function forbid(label, pattern) {
  if (pattern.test(page)) failures.push(`obsolete ${label} remains`);
}

requireMatch('meta description', /<meta name="description" content="[^"]+">/);
requireMatch('semantic main content', /<main>/);
requireMatch('compact text and image hero', /<section class="hh-fit-hero"[\s\S]*?<h1 id="fit-page-title">Are we a good fit\?<\/h1>[\s\S]*?class="hh-fit-hero-image"/);
requireMatch('blue hero heading', /\.hh-fit-hero h1\s*\{[^}]*color:\s*#4a8fdc;/);
requireMatch('larger hero description', /\.hh-fit-hero p\s*\{[^}]*font-size:\s*calc\(17px \+ 2pt\);/);
requireMatch('good-fit section', /<section class="hh-fit-criteria"[\s\S]*?<h2 id="fit-criteria-title">We may be a good fit if\.\.\.<\/h2>/);
requireMatch('revised fit introduction', /We tend to be a strong match for professional offices and established small businesses that want real support, not just ticket taking - leading to the productive long-term relationships\./);
requireMatch('employee range', /You have 5-50 employees/);
requireMatch('technology reliance criterion', /Your business depends on technology every day/);
requireMatch('responsive support criterion', /You value responsive support/);
requireMatch('security criterion', /You take security seriously/);
requireMatch('practical advice criterion', /You prefer practical advice/);
requireMatch('ongoing relationship criterion', /You want an ongoing relationship/);
requireMatch('lowered short not-fit cards', /hh-fit-not-card hh-fit-not-card--lower/g);
requireMatch('orange mobile navigation toggle', /header#pq-header \.pq-bottom-header \.navbar-toggler\s*\{[^}]*background:\s*#fd4a18;/);
requireMatch('not-fit section', /<section class="hh-fit-not"[\s\S]*?<h2 id="not-fit-title">We May Not Be The Right Fit If\.\.\.<\/h2>/);
requireMatch('closing Start Here CTA', /<section class="hh-fit-closing"[\s\S]*?href="starthere\.html"[\s\S]*?>Start Here</);

const h1Count = (page.match(/<h1(?:\s|>)/g) || []).length;
if (h1Count !== 1) failures.push(`expected one H1, found ${h1Count}`);

const fitCardCount = (page.match(/<article class="hh-fit-card">/g) || []).length;
if (fitCardCount !== 6) failures.push(`expected six fit-criteria cards, found ${fitCardCount}`);

const notFitCount = (page.match(/<li class="hh-fit-not-card(?: hh-fit-not-card--lower)?">/g) || []).length;
if (notFitCount !== 4) failures.push(`expected four not-fit items, found ${notFitCount}`);

const loweredNotFitCount = (page.match(/class="hh-fit-not-card hh-fit-not-card--lower"/g) || []).length;
if (loweredNotFitCount !== 2) failures.push(`expected two lowered not-fit items, found ${loweredNotFitCount}`);

forbid('blog article wrapper', /class="(?:blog-single|pq-blog-post|pq-blog-contain)"/);
forbid('removed hero subheading', /The Kind Of Business We Serve Best/);
forbid('old strong-fit heading', /When The Fit Is Especially Strong/);
forbid('external legacy jQuery dependency', /ajax\.googleapis\.com\/ajax\/libs\/jquery/);

if (failures.length) {
  console.error('Phase 6 Are We a Good Fit checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Phase 6 Are We a Good Fit checks passed.');
}
