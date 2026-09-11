const assert = require('node:assert/strict');
const fs = require('node:fs');
const net = require('node:net');
const path = require('node:path');
const { spawn } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const phpBin = process.env.PHP_BIN;
const caBundle = process.env.PHP_CA_BUNDLE;

if (!phpBin || !fs.existsSync(phpBin)) {
  throw new Error('Set PHP_BIN to a PHP 8.1+ executable before running this test.');
}

const passSiteKey = '1x00000000000000000000AA';
const passSecret = '1x0000000000000000000000000000000AA';
const failSecret = '2x0000000000000000000000000000000AA';
const duplicateSecret = '3x0000000000000000000000000000000AA';
const dummyToken = 'XXXX.DUMMY.TOKEN.XXXX';

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

async function waitForServer(url, child, stderr) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`PHP server exited early (${child.exitCode}): ${stderr.join('')}`);
    }
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error(`PHP server did not start: ${stderr.join('')}`);
}

async function withPhpServer(secret, callback) {
  const port = await getFreePort();
  const stderr = [];
  const phpRoot = path.dirname(phpBin);
  const child = spawn(phpBin, [
    '-d', `extension_dir=${path.join(phpRoot, 'ext')}`,
    '-d', 'extension=curl',
    '-d', 'extension=openssl',
    ...(caBundle ? ['-d', `curl.cainfo=${caBundle}`, '-d', `openssl.cafile=${caBundle}`] : []),
    '-S', `127.0.0.1:${port}`,
    '-t', root,
  ], {
    cwd: root,
    env: {
      ...process.env,
      APP_ENV: 'testing',
      TURNSTILE_SITE_KEY: passSiteKey,
      TURNSTILE_SECRET_KEY: secret,
      SUPPORT_TURNSTILE_ACTION: 'support',
      TURNSTILE_ALLOWED_HOSTNAMES: 'example.com,localhost',
    },
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  child.stderr.on('data', (chunk) => stderr.push(String(chunk)));
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await waitForServer(`${baseUrl}/support-config.php`, child, stderr);
    await callback(baseUrl);
  } finally {
    child.kill();
  }
}

async function verify(baseUrl, body) {
  const response = await fetch(`${baseUrl}/support-verify.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const json = await response.json();
  return { response, json };
}

async function run() {
  await withPhpServer(passSecret, async (baseUrl) => {
    const configResponse = await fetch(`${baseUrl}/support-config.php`);
    assert.equal(configResponse.status, 200);
    assert.deepEqual(await configResponse.json(), { turnstileSiteKey: passSiteKey });

    const methodResponse = await fetch(`${baseUrl}/support-verify.php`);
    assert.equal(methodResponse.status, 405);

    const missing = await verify(baseUrl, new URLSearchParams());
    assert.equal(missing.response.status, 422);
    assert.equal(missing.json.success, false);

    const credentialLeak = await verify(baseUrl, new URLSearchParams({
      'cf-turnstile-response': dummyToken,
      username: 'must-not-reach-server',
      password: 'must-not-reach-server',
    }));
    assert.equal(credentialLeak.response.status, 400);
    assert.equal(credentialLeak.json.success, false);

    const accepted = await verify(baseUrl, new URLSearchParams({
      'cf-turnstile-response': dummyToken,
    }));
    assert.equal(accepted.response.status, 200);
    assert.deepEqual(accepted.json, { success: true, message: 'Security verification accepted.' });
  });

  await withPhpServer(failSecret, async (baseUrl) => {
    const rejected = await verify(baseUrl, new URLSearchParams({
      'cf-turnstile-response': dummyToken,
    }));
    assert.equal(rejected.response.status, 403);
    assert.equal(rejected.json.success, false);
  });

  await withPhpServer(duplicateSecret, async (baseUrl) => {
    const duplicate = await verify(baseUrl, new URLSearchParams({
      'cf-turnstile-response': dummyToken,
    }));
    assert.equal(duplicate.response.status, 403);
    assert.equal(duplicate.json.success, false);
  });

  console.log('Phase 8 token-only Turnstile endpoint tests passed.');
}

run().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
