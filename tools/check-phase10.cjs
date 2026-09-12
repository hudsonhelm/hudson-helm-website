const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const indexablePages = [
  ['index.html', 'https://hudsonhelm.com/'],
  ['whatwedo.html', 'https://hudsonhelm.com/whatwedo.html'],
  ['whyhudsonhelm.html', 'https://hudsonhelm.com/whyhudsonhelm.html'],
  ['whoweare.html', 'https://hudsonhelm.com/whoweare.html'],
  ['areweagoodfit.html', 'https://hudsonhelm.com/areweagoodfit.html'],
  ['starthere.html', 'https://hudsonhelm.com/starthere.html'],
  ['support.html', 'https://hudsonhelm.com/support.html'],
  ['privacy.html', 'https://hudsonhelm.com/privacy.html'],
];
const publicPages = [...indexablePages.map(([file]) => file), '404.html'];
const failures = [];
const titles = new Map();
const descriptions = new Map();
const forbiddenPluginAssets = /(?:progressbar|isotope\.pkgd|magnific-popup|jquery\.countTo|wow\.min|owl\.carousel|rev-custom|rbtools|rs6\.min)/i;

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? (match[1] ?? match[2]) : undefined;
}

function plainText(value) {
  return value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

for (const [file, canonical] of indexablePages) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const title = plainText(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
  const descriptionTag = html.match(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i)?.[0] || '';
  const description = attribute(descriptionTag, 'content');

  if (!title) fail(file, 'title is missing');
  else if (titles.has(title)) fail(file, `title duplicates ${titles.get(title)}`);
  else titles.set(title, file);
  if (!description) fail(file, 'meta description is missing');
  else if (descriptions.has(description)) fail(file, `meta description duplicates ${descriptions.get(description)}`);
  else descriptions.set(description, file);

  if (!html.includes(`rel="canonical" href="${canonical}"`) && !html.includes(`href="${canonical}" rel="canonical"`)) {
    fail(file, `canonical URL must be ${canonical}`);
  }
  for (const required of ['og:type', 'og:title', 'og:description', 'og:url', 'og:site_name', 'og:image', 'og:image:alt']) {
    if (!new RegExp(`<meta\\b(?=[^>]*property=["']${required.replace(':', '\\:')}["'])[^>]*>`, 'i').test(html)) {
      fail(file, `${required} metadata is missing`);
    }
  }
  if (!/<meta\b(?=[^>]*name=["']twitter:card["'])(?=[^>]*content=["']summary_large_image["'])[^>]*>/i.test(html)) {
    fail(file, 'Twitter card metadata is missing');
  }
  if (!html.includes(`property="og:url"`) || !html.includes(`content="${canonical}"`)) {
    fail(file, 'Open Graph URL does not match the canonical URL');
  }
}

for (const file of publicPages) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const id of ids.filter((value, index) => ids.indexOf(value) !== index)) fail(file, `duplicate id ${id}`);

  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({ level: Number(match[1]), text: plainText(match[2]) }));
  if (headings.filter(({ level }) => level === 1).length !== 1) fail(file, 'must contain exactly one H1');
  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index].level > headings[index - 1].level + 1) {
      fail(file, `heading level skips from H${headings[index - 1].level} to H${headings[index].level} at ${headings[index].text}`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const alt = attribute(match[0], 'alt');
    if (alt === undefined) fail(file, `image lacks alt text: ${match[0].slice(0, 120)}`);
    if (/\balt=["']loading["']/i.test(match[0])) fail(file, 'legacy loading-image alt text remains');
  }

  for (const match of html.matchAll(/<(?:a|img|script|link|form)\b[^>]*>/gi)) {
    for (const name of ['href', 'src', 'action']) {
      const raw = attribute(match[0], name);
      if (!raw || /^(?:[a-z]+:|\/\/|#)/i.test(raw)) continue;
      const reference = raw.split(/[?#]/)[0];
      if (!fs.existsSync(path.resolve(root, reference))) fail(file, `missing local ${name}: ${reference}`);
    }
  }

  for (const match of html.matchAll(/href=["']#([^"']+)["']/gi)) {
    if (!ids.includes(match[1])) fail(file, `fragment target is missing: #${match[1]}`);
  }
  if (/\b(?:href|src)=["']http:\/\//i.test(html)) fail(file, 'mixed-content URL remains');
  if (forbiddenPluginAssets.test([...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]).join('\n'))) {
    fail(file, 'unused legacy plugin asset remains linked');
  }
  if (/954[- ]?225[- ]?6560|Northern New Jersey|greater New Jersey \/ New York \/ Philadelphia|rev_slider|rs6\.css/i.test(html)) {
    fail(file, 'stale phone, locality, or carousel content remains');
  }
}

const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const jsonLd = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1];
if (!jsonLd) fail('index.html', 'structured data is missing');
else {
  try {
    const data = JSON.parse(jsonLd);
    if (data['@context'] !== 'https://schema.org' || !Array.isArray(data['@graph'])) fail('index.html', 'structured data graph is incomplete');
  } catch (error) {
    fail('index.html', `structured data is invalid JSON: ${error.message}`);
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const [, canonical] of indexablePages) {
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) fail('sitemap.xml', `missing ${canonical}`);
}
if (sitemap.includes('404.html')) fail('sitemap.xml', '404 page must not be indexed');
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
if (!/^User-agent: \*$/m.test(robots) || !/^Allow: \/$/m.test(robots) || !/^Sitemap: https:\/\/hudsonhelm\.com\/sitemap\.xml$/m.test(robots)) {
  fail('robots.txt', 'crawler rules or sitemap declaration are incomplete');
}

const notFound = fs.readFileSync(path.join(root, '404.html'), 'utf8');
if (!/<meta\b(?=[^>]*name="robots")(?=[^>]*content="noindex, follow")[^>]*>/i.test(notFound)) fail('404.html', 'noindex directive is missing');

const support = fs.readFileSync(path.join(root, 'support.html'), 'utf8');
for (const id of ['support-username', 'support-password']) {
  const input = support.match(new RegExp(`<input\\b(?=[^>]*id=["']${id}["'])[^>]*>`, 'i'))?.[0] || '';
  if (/\bname=/i.test(input)) fail('support.html', `${id} must not have a submission name`);
}
const supportJs = fs.readFileSync(path.join(root, 'js', 'support.js'), 'utf8');
if (!/body\.set\('cf-turnstile-response', turnstileToken\)/.test(supportJs)) fail('js/support.js', 'token-only verification request is missing');
if (/body\.set\([^)]*(?:username|password)/i.test(supportJs)) fail('js/support.js', 'support credentials are added to a request');

const mail = fs.readFileSync(path.join(root, 'mail.php'), 'utf8');
for (const required of ['preg_replace', 'str_replace', 'turnstile_is_valid', 'SMTP_PASSWORD', 'setFrom', 'addReplyTo']) {
  if (!mail.includes(required)) fail('mail.php', `security control is missing: ${required}`);
}
const trackedSource = publicPages.concat(['mail.php', 'form-config.php', 'support-config.php', 'support-verify.php', 'includes/contact-config.php', 'js/start-here.js', 'js/support.js'])
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
if (/(?:TURNSTILE_SECRET_KEY|SMTP_PASSWORD)\s*[=:>]\s*["'][^"']{8,}["']/i.test(trackedSource)) {
  fail('tracked source', 'a credential-like literal may be present');
}

if (failures.length) {
  console.error('Phase 10 QA checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Phase 10 QA checks passed for ${publicPages.length} public pages.`);
