const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'support.html'), 'utf8');
const client = fs.readFileSync(path.join(root, 'js', 'support.js'), 'utf8');
const verifier = fs.readFileSync(path.join(root, 'support-verify.php'), 'utf8');
const configEndpoint = fs.readFileSync(path.join(root, 'support-config.php'), 'utf8');
const environmentExample = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
const failures = [];

function requireMatch(label, content, pattern) {
  if (!pattern.test(content)) failures.push(`missing ${label}`);
}

function forbid(label, content, pattern) {
  if (pattern.test(content)) failures.push(`unsafe or prohibited ${label} remains`);
}

requireMatch('portal title', page, /<title>Client Support Portal - Hudson Helm<\/title>/);
requireMatch('meta description', page, /<meta name="description" content="[^"]+">/);
requireMatch('semantic main content', page, /<main class="hh-support-main">[\s\S]*<\/main>/);
requireMatch('single portal H1', page, /<h1 id="support-title"><span>Client<\/span><span>Support<\/span><span>Portal<\/span><\/h1>/);
requireMatch('versioned aligned Support stylesheet', page, /css\/hudson-helm\.css\?v=20260911-support-align/);
requireMatch('username field', page, /<input id="support-username" type="text"[^>]+autocomplete="username"[^>]+required/);
requireMatch('password field', page, /<input id="support-password" type="password"[^>]+autocomplete="current-password"[^>]+required/);
requireMatch('Sign In action', page, /id="support-sign-in"[^>]+type="submit"[\s\S]*>Sign In</);
requireMatch('native fallback guard', page, /<form id="support-login"[^>]+onsubmit="return false"/);
requireMatch('active-customer text', page, /Client portal access is provided to active Hudson Helm customers\./);
requireMatch('Turnstile widget', page, /id="support-turnstile-widget"/);
requireMatch('Turnstile API', page, /challenges\.cloudflare\.com\/turnstile\/v0\/api\.js\?onload=onSupportTurnstileLoad/);
requireMatch('page-specific client', page, /src="js\/support\.js"/);
requireMatch('accessible response', page, /id="support-login-response"[^>]+role="status"[^>]+aria-live="polite"/);
requireMatch('Support active navigation', page, /current-menu-item"><a aria-current="page" href="support\.html">Support<\/a>/);

const h1Count = (page.match(/<h1(?:\s|>)/g) || []).length;
if (h1Count !== 1) failures.push(`expected one H1, found ${h1Count}`);

forbid('credential field names', page, /id="support-(?:username|password)"[^>]+\bname=/);
forbid('form action', page, /<form id="support-login"[^>]+\baction=/);
forbid('form method', page, /<form id="support-login"[^>]+\bmethod=/);
forbid('prohibited workflow text', page, /Forgot Password|Registration|Password reset|Ticket creation/i);
forbid('visible placeholder messaging', page, /Coming Soon|Under Construction|Ticketing system not available/i);
forbid('removed browser-storage note', page, /Your sign-in details stay in this browser during this access check\.|support-form-note/);

requireMatch('configuration endpoint fetch', client, /fetch\('support-config\.php'/);
requireMatch('verification endpoint fetch', client, /fetch\('support-verify\.php'/);
requireMatch('explicit Turnstile rendering', client, /turnstile\.render/);
requireMatch('support action', client, /action: 'support'/);
requireMatch('disabled hidden response field', client, /'response-field': false/);
requireMatch('token-only request body', client, /const body = new URLSearchParams\(\);\s*body\.set\('cf-turnstile-response', turnstileToken\)/);
requireMatch('local generic rejection', client, /setResponse\('Invalid username or password\.', 'error'\)/);
requireMatch('password clearing', client, /password\.value = ''/);
requireMatch('Turnstile reset', client, /turnstile\.reset/);
forbid('form serialization', client, /new FormData\s*\(\s*form\s*\)/);
forbid('credential persistence', client, /localStorage|sessionStorage|document\.cookie|indexedDB/);

requireMatch('token-only allowlist', verifier, /\$allowedFields = \['cf-turnstile-response'\]/);
requireMatch('unexpected-field rejection', verifier, /array_diff\(array_keys\(\$_POST\), \$allowedFields\)[\s\S]*support_respond\(false, 'Invalid request\.', 400\)/);
requireMatch('token length cap', verifier, /strlen\(\$token\) > 2048/);
requireMatch('server-side Siteverify', verifier, /challenges\.cloudflare\.com\/turnstile\/v0\/siteverify/);
requireMatch('protected secret lookup', verifier, /hh_config\('TURNSTILE_SECRET_KEY'\)/);
requireMatch('action validation', verifier, /SUPPORT_TURNSTILE_ACTION/);
requireMatch('hostname validation', verifier, /TURNSTILE_ALLOWED_HOSTNAMES/);
requireMatch('no-store response', verifier, /Cache-Control: no-store/);
forbid('credential handling on server', verifier, /username|password/i);

requireMatch('public sitekey endpoint', configEndpoint, /hh_config\('TURNSTILE_SITE_KEY'\)/);
requireMatch('no-store public config', configEndpoint, /Cache-Control: no-store/);
requireMatch('documented support action', environmentExample, /SUPPORT_TURNSTILE_ACTION=support/);

const sharedStyles = fs.readFileSync(path.join(root, 'css', 'hudson-helm.css'), 'utf8');
requireMatch('top-aligned Support columns', sharedStyles, /\.hh-support-shell\s*\{[^}]*align-items:\s*start;/);
requireMatch('one-word Support heading lines', sharedStyles, /\.hh-support-intro h1 span\s*\{[^}]*display:\s*block;/);

if (failures.length) {
  console.error('Phase 8 Support Portal checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Phase 8 Support Portal checks passed.');
}
