const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'whatwedo.html'), 'utf8');
const failures = [];

function requireMatch(label, pattern) {
  if (!pattern.test(page)) failures.push(`missing ${label}`);
}

function forbid(label, pattern) {
  if (pattern.test(page)) failures.push(`obsolete ${label} remains`);
}

const services = [
  ['Managed IT Services', 'managed-it-services'],
  ['Responsive Support', 'responsive-support'],
  ['Cloud &amp; Email', 'cloud-email'],
  ['Cybersecurity', 'cybersecurity'],
  ['Backup &amp; Recovery', 'backup-recovery'],
  ['Network &amp; Wi-Fi', 'network-wifi'],
  ['Projects &amp; Consulting', 'projects-consulting'],
  ['Strategic IT Guidance', 'strategic-it-guidance'],
];

requireMatch('semantic main content', /<main>/);
requireMatch('approved hero', /<section class="hh-services-hero">[\s\S]*?<h1>Dependable IT Without Enterprise-Level Overhead<\/h1>/);
requireMatch('hero image', /src="images\/benefits\/1\.jpg"/);
requireMatch('eight-card service navigation', /<section aria-labelledby="service-overview-title" class="hh-service-nav">/);
requireMatch('single final Start Here CTA', /<section aria-labelledby="services-cta-title" class="hh-services-cta">[\s\S]*?href="starthere\.html"/);

for (const [label, id] of services) {
  requireMatch(`${label} jump link`, new RegExp(`href="#${id}"`));
  requireMatch(`${label} detailed section`, new RegExp(`<article class="hh-service-section" id="${id}" tabindex="-1">[\\s\\S]*?<h2>${label}<\\/h2>`));
}

const cards = (page.match(/class="hh-service-card"/g) || []).length;
if (cards !== 8) failures.push(`expected 8 service cards, found ${cards}`);

const details = (page.match(/<article class="hh-service-section"/g) || []).length;
if (details !== 8) failures.push(`expected 8 detailed sections, found ${details}`);

const h1Count = (page.match(/<h1(?:\s|>)/g) || []).length;
if (h1Count !== 1) failures.push(`expected one H1, found ${h1Count}`);

const ctaLinks = (page.match(/href="starthere\.html"/g) || []).length;
if (ctaLinks !== 4) failures.push(`expected header, mobile-menu, final CTA, and footer Start Here links; found ${ctaLinks}`);

forbid('Core Services navigation', /Core Services We Offer|class="pq-tabs-1"/);
forbid('service-detail Read more button', />Read more</i);
forbid('merged End-User Support category', /<h[23][^>]*>End-User Support<\/h[23]>/);
forbid('merged Help Desk category', /<h[23][^>]*>Help Desk<\/h[23]>/);
forbid('merged Microsoft 365 category', /<h[23][^>]*>Microsoft 365<\/h[23]>/);
forbid('merged Vendor Coordination category', /<h[23][^>]*>Vendor Coordination<\/h[23]>/);
forbid('combined Cybersecurity and Backups category', /<h[23][^>]*>Cybersecurity &amp; Backups<\/h[23]>/);
forbid('What We Do Rough Notation dependency', /js\/rough-(?:script|notation\.iife|custom)\.js/);
forbid('What We Do Owl Carousel dependency', /owl\.carousel\.min\.(?:css|js)/);

if (failures.length) {
  console.error('Phase 3 What We Do checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Phase 3 What We Do checks passed.');
}
