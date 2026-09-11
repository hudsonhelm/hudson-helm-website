(() => {
  'use strict';

  const form = document.getElementById('support-login');
  const username = document.getElementById('support-username');
  const password = document.getElementById('support-password');
  const submitButton = document.getElementById('support-sign-in');
  const response = document.getElementById('support-login-response');
  const turnstileStatus = document.getElementById('support-turnstile-status');
  const turnstileError = document.getElementById('support-turnstile-error');
  const widgetContainer = document.getElementById('support-turnstile-widget');

  if (!form || !username || !password || !submitButton || !response || !turnstileStatus || !turnstileError || !widgetContainer) {
    return;
  }

  let widgetId = null;
  let turnstileToken = '';
  let submitting = false;
  let publicConfig = null;

  function setFieldError(field, message) {
    const error = document.getElementById(`${field.id}-error`);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message;
  }

  function setResponse(message, state = '') {
    response.textContent = message;
    response.classList.toggle('is-error', state === 'error');
    response.classList.toggle('is-working', state === 'working');
  }

  function setSubmitting(isSubmitting) {
    submitting = isSubmitting;
    submitButton.disabled = isSubmitting;
    submitButton.querySelector('.pq-button-text').textContent = isSubmitting ? 'Verifying...' : 'Sign In';
  }

  function resetTurnstile() {
    turnstileToken = '';
    if (widgetId !== null && window.turnstile) {
      window.turnstile.reset(widgetId);
    }
  }

  function validateCredentialsLocally() {
    const usernameMissing = username.value.trim() === '';
    const passwordMissing = password.value === '';
    setFieldError(username, usernameMissing ? 'Enter your username.' : '');
    setFieldError(password, passwordMissing ? 'Enter your password.' : '');
    if (usernameMissing) username.focus();
    else if (passwordMissing) password.focus();
    return !usernameMissing && !passwordMissing;
  }

  async function loadConfiguration() {
    const configResponse = await fetch('support-config.php', {
      method: 'GET',
      credentials: 'same-origin',
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!configResponse.ok) throw new Error('configuration unavailable');
    const config = await configResponse.json();
    if (!config.turnstileSiteKey) throw new Error('site key unavailable');
    publicConfig = config;
    renderTurnstile();
  }

  function renderTurnstile() {
    if (!publicConfig || !window.turnstile || widgetId !== null) return;
    widgetId = window.turnstile.render(widgetContainer, {
      sitekey: publicConfig.turnstileSiteKey,
      action: 'support',
      theme: 'dark',
      appearance: 'always',
      'response-field': false,
      callback(token) {
        turnstileToken = token;
        turnstileError.textContent = '';
        turnstileStatus.textContent = 'Security verification complete.';
      },
      'expired-callback'() {
        turnstileToken = '';
        turnstileStatus.textContent = 'Security verification expired.';
      },
      'error-callback'() {
        turnstileToken = '';
        turnstileStatus.textContent = 'Security verification could not load.';
        turnstileError.textContent = 'Security verification is unavailable. Please try again.';
      },
    });
    turnstileStatus.textContent = 'Security verification is ready.';
  }

  window.onSupportTurnstileLoad = renderTurnstile;

  username.addEventListener('input', () => setFieldError(username, ''));
  password.addEventListener('input', () => setFieldError(password, ''));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitting || !validateCredentialsLocally()) return;

    if (!turnstileToken) {
      turnstileError.textContent = 'Complete the security verification before signing in.';
      return;
    }

    setSubmitting(true);
    setResponse('Verifying secure access...', 'working');

    try {
      const body = new URLSearchParams();
      body.set('cf-turnstile-response', turnstileToken);
      const verificationResponse = await fetch('support-verify.php', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body,
      });
      const result = await verificationResponse.json();
      if (!verificationResponse.ok || result.success !== true) {
        throw new Error('verification failed');
      }

      password.value = '';
      setFieldError(password, '');
      setResponse('Invalid username or password.', 'error');
      resetTurnstile();
      password.focus();
    } catch {
      password.value = '';
      setResponse('Security verification could not be completed. Please try again.', 'error');
      resetTurnstile();
      password.focus();
    } finally {
      setSubmitting(false);
    }
  });

  loadConfiguration().catch(() => {
    turnstileStatus.textContent = 'Security verification is unavailable.';
    turnstileError.textContent = 'Security verification is unavailable. Please try again later.';
    submitButton.disabled = true;
  });
})();
