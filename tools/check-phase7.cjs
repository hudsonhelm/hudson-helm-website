const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'starthere.html'), 'utf8');
const client = fs.readFileSync(path.join(root, 'js', 'start-here.js'), 'utf8');
const mail = fs.readFileSync(path.join(root, 'mail.php'), 'utf8');
const configEndpoint = fs.readFileSync(path.join(root, 'form-config.php'), 'utf8');
const configLoader = fs.readFileSync(path.join(root, 'includes', 'contact-config.php'), 'utf8');
const configDenyRule = fs.readFileSync(path.join(root, 'includes', '.htaccess'), 'utf8');
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
requireMatch('revised introduction', page, /Tell us a little about your business, your current technology environment, and what's getting in the way\. Whether you need reliable day-to-day IT support, stronger cybersecurity, or a fresh set of eyes on your existing setup, we'll review your request and follow up with practical next steps\./);
requireMatch('approved service area', page, /Serving New Jersey &amp; New York\./);
requireMatch('inline response commitment', page, /practical next steps\. <span class="hh-response-time">We'll usually respond within one business day\.<\/span><\/p>/);
requireMatch('single form workflow', page, /<div class="form-div">[\s\S]*id="start-here-title"[\s\S]*class="hh-response-time"[\s\S]*<form[^>]+aria-labelledby="start-here-title"[\s\S]*<div class="hh-direct-contact"/);
requireMatch('wider desktop card', page, /\.hh-start-page \.container\s*\{[\s\S]*max-width: 1160px/);
requireMatch('direct email prompt', page, /Prefer to e-mail us directly\?/);
requireMatch('direct email action', page, /href="mailto:info@hudsonhelm\.com">Click Here to e-mail Info@HudsonHelm\.com<\/a>/);
requireMatch('Submit-Turnstile-email action row', page, /class="hh-form-actions"[\s\S]*class="hh-submit-action"[\s\S]*class="hh-turnstile-wrap"[\s\S]*id="turnstile-widget"[\s\S]*class="hh-email-action"/);
requireMatch('compact action-row spacing', page, /\.hh-form-actions\s*\{[\s\S]*grid-template-columns: auto auto 1fr auto;[\s\S]*column-gap: 24px;[\s\S]*margin-top: 4px;/);
requireMatch('emphasized wider Submit action', page, /\.hh-submit-action \.form-btn\s*\{\s*min-width: 136px;[\s\S]*\.hh-submit-action \.pq-button-text\s*\{[\s\S]*font-size: 17px;[\s\S]*font-weight: 700;/);
requireMatch('left-aligned email prompt', page, /\.hh-email-prompt\s*\{[\s\S]*margin: 0 0 10px;[\s\S]*font-size: 18px;[\s\S]*text-align: left;/);
requireMatch('matching email button typography', page, /\.hh-email-button\s*\{[\s\S]*font-size: 17px;[\s\S]*font-weight: 700;/);
requireMatch('locality and phone lower row', page, /<div class="hh-direct-contact"[^>]*>\s*<p><strong>Serving New Jersey &amp; New York\.<\/strong> Call <a href="tel:\+18622328023">862-232-8023<\/a>\.<\/p>\s*<\/div>/);
requireMatch('centered service area', page, /\.hh-direct-contact\s*\{[\s\S]*text-align: center/);
requireMatch('mobile back-to-top offset', page, /@media \(max-width: 575px\)[\s\S]*#back-to-top\s*\{[\s\S]*bottom: 12px/);
requireMatch('name field label', page, /<label for="contact-name">Name/);
requireMatch('company field', page, /name="company"[^>]+required/);
requireMatch('email field', page, /name="email"[^>]+required/);
requireMatch('optional phone field', page, /name="phone"[^>]+maxlength="50"(?![^>]+required)/);
requireMatch('message field', page, /name="message"[^>]+maxlength="5000"[^>]+required/);
requireMatch('shorter message field', page, /\.hh-start-page \.pq-contactform textarea\s*\{[\s\S]*height: 88px;[\s\S]*min-height: 88px/);
requireMatch('shorter message rows', page, /name="message"[^>]+rows="4"/);
requireMatch('honeypot field', page, /name="website"[^>]+tabindex="-1"/);
requireMatch('Turnstile container', page, /id="turnstile-widget"/);
requireMatch('visually hidden Turnstile status', page, /id="turnstile-status"[^>]*class="[^"]*hh-turnstile-copy|class="[^"]*hh-turnstile-copy[^"]*"[^>]*id="turnstile-status"/);
requireMatch('orange email action', page, /\.hh-orange-action\s*\{[\s\S]*min-height: 44px;[\s\S]*background: #ff4b1f[\s\S]*class="pq-button hh-orange-action hh-email-button"/);
requireMatch('header-matched blue Submit', page, /\.hh-submit-button\s*\{[\s\S]*background: linear-gradient\(180deg, #4a8fdc 0%, #2d6fb8 100%\);[\s\S]*box-shadow: 0 10px 24px rgba\(32, 83, 145, 0\.32\);[\s\S]*class="pq-button form-btn hh-submit-button"/);
requireMatch('header-matched Submit hover', page, /\.hh-submit-button:hover,[\s\S]*\.hh-submit-button:focus\s*\{[\s\S]*background: linear-gradient\(180deg, #5a9ae2 0%, #347ac6 100%\)/);
requireMatch('Turnstile API', page, /challenges\.cloudflare\.com\/turnstile\/v0\/api\.js/);
requireMatch('page-specific form client', page, /src="js\/start-here\.js"/);
requireMatch('accessible live response', page, /class="pq-form-response[^>]+role="status"[^>]+aria-live="polite"/);

const h1Count = (page.match(/<h1(?:\s|>)/g) || []).length;
if (h1Count !== 1) failures.push(`expected one H1, found ${h1Count}`);

forbid('placeholder office address', page, /Office Address|Address coming soon/i);
forbid('user-editable subject', page, /name="subject"|id="subject"/);
forbid('legacy shared form binding', page, /pq-applyform/);
forbid('Rough Notation dependency', page, /rough-(?:script|notation|custom)/);
forbid('duplicate form heading', page, /Start the Conversation/i);
forbid('standalone contact labels', page, />Service Area<|>Email Address<|>Phone Number</i);
forbid('legacy split contact columns', page, /col-12 col-lg-(?:5|7)/);
forbid('retired direct-contact copy', page, /Prefer to reach us directly|hh-direct-options/);
forbid('removed action-row logo', page, /hh-action-logo/);

requireMatch('configuration endpoint fetch', client, /fetch\('form-config\.php'/);
requireMatch('duplicate submission guard', client, /if \(submitting \|\| !validateForm\(\)\)/);
requireMatch('sending state', client, /Sending\.\.\./);
requireMatch('Submit idle state', client, /isSubmitting \? 'Sending\.\.\.' : 'Submit'/);
requireMatch('unavailable Turnstile collapse', client, /turnstileWrap\.classList\.add\('is-unavailable'\)/);
requireMatch('success handling', client, /is-success/);
requireMatch('approved success response', client, /Thanks, your request has been sent\.[\s\S]*We'll be back with you soon\./);
requireMatch('failure handling', client, /is-error/);
requireMatch('Turnstile explicit rendering', client, /turnstile\.render/);
requireMatch('Turnstile reset', client, /turnstile\.reset/);

requireMatch('PHPMailer namespaced loader', mail, /PHPMailer\\PHPMailer\\PHPMailer/);
requireMatch('server success response', mail, /Thanks, your request has been sent\. We'll be back with you soon\./);
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
requireMatch('guarded production config fallback', configLoader, /contact-production\.php/);
requireMatch('production config web deny rule', configDenyRule, /<Files "contact-production\.php">[\s\S]*Require all denied/);
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
