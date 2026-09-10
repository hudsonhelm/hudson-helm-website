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
requireMatch('compact text and image hero', /<section class="hh-fit-hero"[\s\S]*?<h1 id="fit-page-title">Are We a Good Fit\?<\/h1>[\s\S]*?<h2>The Kind Of Business We Serve Best<\/h2>[\s\S]*?class="hh-fit-hero-image"/);
requireMatch('strong-fit section', /<section class="hh-fit-criteria"[\s\S]*?<h2 id="fit-criteria-title">When The Fit Is Especially Strong<\/h2>/);
requireMatch('employee range', /About 5–50 employees/);
requireMatch('technology reliance criterion', /Technology matters every day/);
requireMatch('responsive support criterion', /Responsive support has value/);
requireMatch('security criterion', /Security is taken seriously/);
requireMatch('practical advice criterion', /Practical advice comes first/);
requireMatch('ongoing relationship criterion', /You want an ongoing relationship/);
requireMatch('not-fit section', /<section class="hh-fit-not"[\s\S]*?<h2 id="not-fit-title">We May Not Be The Right Fit If\.\.\.<\/h2>/);
requireMatch('closing Start Here CTA', /<section class="hh-fit-closing"[\s\S]*?href="starthere\.html"[\s\S]*?>Start Here</);

const h1Count = (page.match(/<h1(?:\s|>)/g) || []).length;
if (h1Count !== 1) failures.push(`expected one H1, found ${h1Count}`);

const fitCardCount = (page.match(/<article class="hh-fit-card">/g) || []).length;
if (fitCardCount !== 6) failures.push(`expected six fit-criteria cards, found ${fitCardCount}`);

const notFitCount = (page.match(/<li class="hh-fit-not-card">/g) || []).length;
if (notFitCount !== 4) failures.push(`expected four not-fit items, found ${notFitCount}`);

forbid('blog article wrapper', /class="(?:blog-single|pq-blog-post|pq-blog-contain)"/);
forbid('redundant good-fit section', /We may be a good fit if/i);
forbid('external legacy jQuery dependency', /ajax\.googleapis\.com\/ajax\/libs\/jquery/);

if (failures.length) {
  console.error('Phase 6 Are We a Good Fit checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Phase 6 Are We a Good Fit checks passed.');
}
