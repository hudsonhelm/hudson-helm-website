const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'starthere.html'), 'utf8');
const client = fs.readFileSync(path.join(root, 'js', 'start-here.js'), 'utf8');
const mail = fs.readFileSync(path.join(root, 'mail.php'), 'utf8');
const configEndpoint = fs.readFileSync(path.join(root, 'form-config.php'), 'utf8');
const environmentExample = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
const phpmailerVersion = fs.readFileSync(path.join(root, 'PHPMailer', 'VERSION'), 'utf8').trim();
const failures = [];

function requireMatch(label, content, pattern) {
  if (!pattern.test(content)) failures.push(`missing ${label}`);
}

function forbid(label, content, pattern) {
  if (pattern.test(content)) failures.push(`obsolete or unsafe ${label} remains`);
}

requireMatch('meta description', page, /<meta name="description" content="[^"]+">/);
requireMatch('semantic main content', page, /<main>[\s\S]*<\/main>/);
requireMatch('single Start Here H1', page, /<h1[^>]+id="start-here-title"[^>]*>Start Here<\/h1>/);
requireMatch('approved service area', page, /Serving New Jersey &amp; New York/);
requireMatch('approved response commitment', page, /We'll usually respond within one business day\./);
requireMatch('two-column layout', page, /class="col-12 col-lg-5"[\s\S]*class="col-12 col-lg-7"/);
requireMatch('name field label', page, /<label for="contact-name">Name/);
requireMatch('company field', page, /name="company"[^>]+required/);
requireMatch('email field', page, /name="email"[^>]+required/);
requireMatch('optional phone field', page, /name="phone"[^>]+maxlength="50"(?![^>]+required)/);
requireMatch('message field', page, /name="message"[^>]+maxlength="5000"[^>]+required/);
requireMatch('honeypot field', page, /name="website"[^>]+tabindex="-1"/);
requireMatch('Turnstile container', page, /id="turnstile-widget"/);
requireMatch('Turnstile API', page, /challenges\.cloudflare\.com\/turnstile\/v0\/api\.js/);
requireMatch('page-specific form client', page, /src="js\/start-here\.js"/);
requireMatch('accessible live response', page, /class="pq-form-response[^>]+role="status"[^>]+aria-live="polite"/);

const h1Count = (page.match(/<h1(?:\s|>)/g) || []).length;
if (h1Count !== 1) failures.push(`expected one H1, found ${h1Count}`);

forbid('placeholder office address', page, /Office Address|Address coming soon/i);
forbid('user-editable subject', page, /name="subject"|id="subject"/);
forbid('legacy shared form binding', page, /pq-applyform/);
forbid('Rough Notation dependency', page, /rough-(?:script|notation|custom)/);

requireMatch('configuration endpoint fetch', client, /fetch\('form-config\.php'/);
requireMatch('duplicate submission guard', client, /if \(submitting \|\| !validateForm\(\)\)/);
requireMatch('sending state', client, /Sending\.\.\./);
requireMatch('success handling', client, /is-success/);
requireMatch('failure handling', client, /is-error/);
requireMatch('Turnstile explicit rendering', client, /turnstile\.render/);
requireMatch('Turnstile reset', client, /turnstile\.reset/);

requireMatch('PHPMailer namespaced loader', mail, /PHPMailer\\PHPMailer\\PHPMailer/);
requireMatch('server-side Turnstile endpoint', mail, /challenges\.cloudflare\.com\/turnstile\/v0\/siteverify/);
requireMatch('server-side Turnstile secret', mail, /hh_config\('TURNSTILE_SECRET_KEY'\)/);
requireMatch('generated website-lead subject', mail, /\[WEBSITE LEAD\] Website Info Request from/);
requireMatch('high importance header', mail, /addCustomHeader\('Importance', 'High'\)/);
requireMatch('high X priority', mail, /Priority = 1/);
requireMatch('high Microsoft priority', mail, /addCustomHeader\('X-MSMail-Priority', 'High'\)/);
requireMatch('authenticated SMTP default', mail, /hh_config_bool\('SMTP_AUTH', true\)/);
requireMatch('HTML escaping', mail, /htmlspecialchars\(/);
requireMatch('header newline removal', mail, /preg_replace\('\/\[\\r\\n\\t\]\+\//);
requireMatch('honeypot short circuit', mail, /if \(\$website !== ''\)[\s\S]*respond\(true/);
requireMatch('request size cap', mail, /\$contentLength > 25000/);
forbid('embedded SMTP password', mail, /->Password\s*=\s*['"][^'"]+['"]/);
forbid('PHP mail transport', mail, /\bmail\s*\(/);

requireMatch('public sitekey endpoint', configEndpoint, /TURNSTILE_SITE_KEY/);
requireMatch('no-store configuration response', configEndpoint, /Cache-Control: no-store/);
requireMatch('documented SMTP auth setting', environmentExample, /SMTP_AUTH=true/);
requireMatch('documented Turnstile hostnames', environmentExample, /TURNSTILE_ALLOWED_HOSTNAMES=hudsonhelm\.com,www\.hudsonhelm\.com/);

if (phpmailerVersion !== '7.1.0') {
  failures.push(`expected PHPMailer 7.1.0, found ${phpmailerVersion}`);
}

if (failures.length) {
  console.error('Phase 7 Start Here checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Phase 7 Start Here checks passed.');
}
