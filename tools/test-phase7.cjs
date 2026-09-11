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

function startSmtpSink() {
  return new Promise((resolve, reject) => {
    const messages = [];
    const server = net.createServer((socket) => {
      socket.setEncoding('utf8');
      socket.write('220 localhost test sink\r\n');
      let buffer = '';
      let dataMode = false;
      let message = '';

      socket.on('data', (chunk) => {
        buffer += chunk;

        while (buffer.includes('\r\n')) {
          const lineEnd = buffer.indexOf('\r\n');
          const line = buffer.slice(0, lineEnd);
          buffer = buffer.slice(lineEnd + 2);

          if (dataMode) {
            if (line === '.') {
              messages.push(message);
              message = '';
              dataMode = false;
              socket.write('250 2.0.0 queued\r\n');
            } else {
              message += `${line}\r\n`;
            }
            continue;
          }

          const command = line.toUpperCase();
          if (command.startsWith('EHLO') || command.startsWith('HELO')) {
            socket.write('250-localhost\r\n250 8BITMIME\r\n');
          } else if (command.startsWith('MAIL FROM') || command.startsWith('RCPT TO') || command === 'RSET' || command === 'NOOP') {
            socket.write('250 2.0.0 ok\r\n');
          } else if (command === 'DATA') {
            dataMode = true;
            socket.write('354 End data with <CR><LF>.<CR><LF>\r\n');
          } else if (command === 'QUIT') {
            socket.write('221 2.0.0 bye\r\n');
            socket.end();
          } else {
            socket.write('250 2.0.0 ok\r\n');
          }
        }
      });
    });

    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port, messages }));
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

async function withPhpServer(secret, smtpPort, callback) {
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
      SMTP_HOST: '127.0.0.1',
      SMTP_PORT: String(smtpPort),
      SMTP_ENCRYPTION: 'none',
      SMTP_AUTH: 'false',
      SMTP_FROM_EMAIL: 'info@hudsonhelm.com',
      SMTP_FROM_NAME: 'Hudson Helm',
      SMTP_TO_EMAIL: 'info@hudsonhelm.com',
      TURNSTILE_SITE_KEY: passSiteKey,
      TURNSTILE_SECRET_KEY: secret,
      TURNSTILE_ACTION: 'contact',
      TURNSTILE_ALLOWED_HOSTNAMES: 'example.com,localhost',
    },
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  child.stderr.on('data', (chunk) => stderr.push(String(chunk)));
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await waitForServer(`${baseUrl}/form-config.php`, child, stderr);
    await callback(baseUrl);
  } finally {
    child.kill();
  }
}

function formBody(overrides = {}) {
  return new URLSearchParams({
    name: 'Alex Rivera',
    company: 'Acme Services',
    email: 'alex@example.com',
    phone: '',
    message: 'We need help with Microsoft 365 and security.',
    website: '',
    'cf-turnstile-response': dummyToken,
    ...overrides,
  });
}

async function post(baseUrl, body) {
  const response = await fetch(`${baseUrl}/mail.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (error) {
    throw new Error(`Expected JSON from mail.php (${response.status}), received: ${text}`, { cause: error });
  }
  return { response, json };
}

async function run() {
  const smtp = await startSmtpSink();

  try {
    await withPhpServer(passSecret, smtp.port, async (baseUrl) => {
      const configResponse = await fetch(`${baseUrl}/form-config.php`);
      assert.equal(configResponse.status, 200);
      assert.deepEqual(await configResponse.json(), { turnstileSiteKey: passSiteKey });

      const methodResponse = await fetch(`${baseUrl}/mail.php`);
      assert.equal(methodResponse.status, 405);

      const missing = await post(baseUrl, formBody({ company: '' }));
      assert.equal(missing.response.status, 422);
      assert.equal(missing.json.success, false);

      const invalidEmail = await post(baseUrl, formBody({ email: 'not-an-email' }));
      assert.equal(invalidEmail.response.status, 422);

      const honeypot = await post(baseUrl, formBody({ website: 'bot.example' }));
      assert.equal(honeypot.response.status, 200);
      assert.equal(honeypot.json.success, true);
      assert.equal(smtp.messages.length, 0);
    });

    await withPhpServer(failSecret, smtp.port, async (baseUrl) => {
      const rejected = await post(baseUrl, formBody());
      assert.equal(rejected.response.status, 403);
      assert.equal(rejected.json.success, false);
    });

    await withPhpServer(duplicateSecret, smtp.port, async (baseUrl) => {
      const duplicate = await post(baseUrl, formBody());
      assert.equal(duplicate.response.status, 403);
      assert.equal(duplicate.json.success, false);
    });

    await withPhpServer(passSecret, smtp.port, async (baseUrl) => {
      const sent = await post(baseUrl, formBody({
        company: 'Acme\r\nInjected: no',
        message: '<script>alert("no")</script> Please help.',
      }));
      assert.equal(sent.response.status, 200);
      assert.equal(sent.json.success, true);
    });

    assert.equal(smtp.messages.length, 1);
    const message = smtp.messages[0];
    assert.match(message, /Subject: \[WEBSITE LEAD\] Website Info Request from Acme Injected: no/);
    assert.match(message, /Importance: High/);
    assert.match(message, /X-Priority: 1/);
    assert.match(message, /X-MSMail-Priority: High/);
    assert.doesNotMatch(message, /\r\nInjected: no\r\n/);
    const htmlPart = message.split('Content-Type: text/html')[1] || '';
    assert.doesNotMatch(htmlPart, /<script>/i);
    assert.match(htmlPart, /&lt;script&gt;/i);

    console.log('Phase 7 PHP, Turnstile, SMTP-sink, validation, and header tests passed.');
  } finally {
    await new Promise((resolve) => smtp.server.close(resolve));
  }
}

run().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
