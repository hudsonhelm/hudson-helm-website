const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'whoweare.html'), 'utf8');
const failures = [];

function requireMatch(label, pattern) {
  if (!pattern.test(page)) failures.push(`missing ${label}`);
}

requireMatch('semantic main content', /<main>/);
requireMatch('single page hero', /<section class="hh-team-hero"[\s\S]*?<h1 id="who-we-are-title">/);
requireMatch('approved lean positioning', /Hudson Helm is deliberately lean\./);
requireMatch('compact lead profile width', /\.hh-lead-profile\s*\{[\s\S]*?max-width:\s*900px;/);
requireMatch('compact lead portrait height', /\.hh-lead-photo\s*\{[\s\S]*?min-height:\s*400px;/);
requireMatch('Nelson Abreu lead profile', /<article class="hh-lead-profile">[\s\S]*?<h2 id="team-title">Nelson Abreu<\/h2>[\s\S]*?<span class="hh-profile-role">Technical Director<\/span>/);
requireMatch('Nelson Abreu portrait', /<img class="hh-lead-photo" src="images\/team\/nelson-abreu\.jpg" alt="Nelson Abreu">/);
requireMatch('founder identification', /Hudson Helm's founder and Technical Director/);
requireMatch('network engineer profile', /<h3>Benjamin<\/h3>[\s\S]*?<span class="hh-profile-role">Network Engineer<\/span>[\s\S]*?Benjamin focuses/);
requireMatch('systems engineer profile', /<h3>Emilia<\/h3>[\s\S]*?<span class="hh-profile-role">Systems Engineer<\/span>[\s\S]*?Emilia works/);
requireMatch('cybersecurity specialist profile', /<h3>Emilia<\/h3>[\s\S]*?<span class="hh-profile-role">Cybersecurity Specialist<\/span>[\s\S]*?Emilia concentrates/);
requireMatch('placeholder photo labels', /Placeholder Photo/);
requireMatch('shared placeholder image', /images\/team\/2\.jpg/);
requireMatch('closing Start Here CTA', /<section class="hh-team-closing"[\s\S]*?href="starthere\.html"/);

const h1Count = (page.match(/<h1(?:\s|>)/g) || []).length;
if (h1Count !== 1) failures.push(`expected one H1, found ${h1Count}`);

const profileCount = (page.match(/<article class="hh-(?:lead-profile|profile-card)"/g) || []).length;
if (profileCount !== 4) failures.push(`expected four profiles, found ${profileCount}`);

const imageUses = (page.match(/src="images\/team\/2\.jpg"/g) || []).length;
if (imageUses !== 3) failures.push(`expected the shared placeholder image three times, found ${imageUses}`);

const placeholderPhotoLabels = (page.match(/Placeholder Photo/g) || []).length;
if (placeholderPhotoLabels !== 3) failures.push(`expected three placeholder photo labels, found ${placeholderPhotoLabels}`);

if (/data-pending-page="true" href="whoweare\.html"/.test(page)) {
  failures.push('Who We Are remains marked as a pending destination');
}

if (/Team profiles in progress:|hh-team-notice/.test(page)) {
  failures.push('removed page-level temporary-content notice is present');
}

if (/Hudson Helm is deliberately small\.|Temporary photograph|Temporary stock portrait for Nelson Abreu|Placeholder profile|Cameron|Morgan|Jordan/.test(page)) {
  failures.push('superseded Who We Are profile content is present');
}

if (/rough-(?:script|notation\.iife|custom)\.js|owl\.carousel\.min\.(?:css|js)/.test(page)) {
  failures.push('obsolete page-specific dependency is present');
}

if (failures.length) {
  console.error('Phase 5 Who We Are checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Phase 5 Who We Are checks passed.');
}
