(function () {
    'use strict';

    var form = document.querySelector('.hh-contact-form');
    if (!form) {
        return;
    }

    var responseBox = form.querySelector('.pq-form-response');
    var submitButton = form.querySelector('.form-btn');
    var submitLabel = submitButton.querySelector('.pq-button-text');
    var turnstileWrap = document.querySelector('.hh-turnstile-wrap');
    var turnstileStatus = document.getElementById('turnstile-status');
    var turnstileError = document.getElementById('turnstile-error');
    var widgetId = null;
    var turnstileToken = '';
    var turnstileInitStarted = false;
    var submitting = false;

    var fields = {
        name: {
            element: document.getElementById('contact-name'),
            error: document.getElementById('contact-name-error'),
            requiredMessage: 'Please enter your name.'
        },
        company: {
            element: document.getElementById('contact-company'),
            error: document.getElementById('contact-company-error'),
            requiredMessage: 'Please enter your company name.'
        },
        email: {
            element: document.getElementById('contact-email'),
            error: document.getElementById('contact-email-error'),
            requiredMessage: 'Please enter your email address.'
        },
        phone: {
            element: document.getElementById('contact-phone'),
            error: document.getElementById('contact-phone-error')
        },
        message: {
            element: document.getElementById('contact-message'),
            error: document.getElementById('contact-message-error'),
            requiredMessage: 'Please tell us how we can help.'
        }
    };

    function setResponse(message, type) {
        responseBox.classList.remove('is-success', 'is-error');
        if (type) {
            responseBox.classList.add(type === 'success' ? 'is-success' : 'is-error');
        }
        responseBox.textContent = message;
    }

    function setSuccessResponse() {
        var lead = document.createElement('strong');
        lead.textContent = 'Thanks, your request has been sent.';
        responseBox.classList.remove('is-error');
        responseBox.classList.add('is-success');
        responseBox.textContent = '';
        responseBox.appendChild(lead);
        responseBox.appendChild(document.createTextNode(" We'll be back with you soon."));
    }

    function setFieldError(field, message) {
        field.error.textContent = message || '';
        if (message) {
            field.element.setAttribute('aria-invalid', 'true');
        } else {
            field.element.removeAttribute('aria-invalid');
        }
    }

    function clearErrors() {
        Object.keys(fields).forEach(function (key) {
            setFieldError(fields[key], '');
        });
        turnstileError.textContent = '';
    }

    function validateForm() {
        clearErrors();
        var firstInvalid = null;

        ['name', 'company', 'email', 'message'].forEach(function (key) {
            var field = fields[key];
            if (field.element.value.trim() === '') {
                setFieldError(field, field.requiredMessage);
                firstInvalid = firstInvalid || field.element;
            }
        });

        if (fields.email.element.value.trim() !== '' && !fields.email.element.validity.valid) {
            setFieldError(fields.email, 'Please enter a valid email address.');
            firstInvalid = firstInvalid || fields.email.element;
        }

        if (!turnstileToken) {
            turnstileError.textContent = 'Please complete the spam-protection check.';
            firstInvalid = firstInvalid || document.getElementById('turnstile-widget');
        }

        if (firstInvalid && typeof firstInvalid.focus === 'function') {
            firstInvalid.focus();
        }

        return !firstInvalid;
    }

    function setSubmitting(isSubmitting) {
        submitting = isSubmitting;
        submitButton.disabled = isSubmitting || !turnstileToken;
        submitLabel.textContent = isSubmitting ? 'Sending...' : 'Submit';
    }

    function resetTurnstile() {
        turnstileToken = '';
        submitButton.disabled = true;
        if (widgetId !== null && window.turnstile) {
            window.turnstile.reset(widgetId);
        }
    }

    function showTurnstileUnavailable() {
        turnstileStatus.textContent = 'The online form is temporarily unavailable. Please email info@hudsonhelm.com.';
        turnstileError.textContent = 'Spam protection could not be loaded.';
        turnstileWrap.classList.add('is-unavailable');
        submitButton.disabled = true;
    }

    async function initializeTurnstile() {
        if (turnstileInitStarted || !window.turnstile) {
            return;
        }
        turnstileInitStarted = true;

        try {
            var configResponse = await fetch('form-config.php', {
                method: 'GET',
                credentials: 'same-origin',
                headers: { 'Accept': 'application/json' },
                cache: 'no-store'
            });
            var config = await configResponse.json();

            if (!configResponse.ok || !config.turnstileSiteKey) {
                throw new Error('Turnstile configuration is unavailable.');
            }

            turnstileWrap.classList.remove('is-unavailable');
            widgetId = window.turnstile.render('#turnstile-widget', {
                sitekey: config.turnstileSiteKey,
                action: 'contact',
                theme: 'dark',
                callback: function (token) {
                    turnstileToken = token;
                    turnstileStatus.textContent = 'Spam protection complete.';
                    turnstileError.textContent = '';
                    submitButton.disabled = submitting;
                },
                'expired-callback': function () {
                    turnstileToken = '';
                    turnstileStatus.textContent = 'Spam protection expired. Please try again.';
                    submitButton.disabled = true;
                },
                'error-callback': function () {
                    turnstileToken = '';
                    turnstileStatus.textContent = 'Spam protection could not be completed. Please try again.';
                    turnstileError.textContent = 'The spam-protection check failed.';
                    submitButton.disabled = true;
                }
            });
            turnstileStatus.textContent = 'Complete the spam-protection check to send your request.';
        } catch (error) {
            showTurnstileUnavailable();
        }
    }

    window.onTurnstileLoad = initializeTurnstile;
    if (window.turnstile) {
        initializeTurnstile();
    }

    Object.keys(fields).forEach(function (key) {
        fields[key].element.addEventListener('input', function () {
            setFieldError(fields[key], '');
        });
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (submitting || !validateForm()) {
            if (!submitting) {
                setResponse('Please correct the highlighted fields and try again.', 'error');
            }
            return;
        }

        setSubmitting(true);
        setResponse('Sending your request...', '');

        var abortController = new AbortController();
        var timeoutId = window.setTimeout(function () {
            abortController.abort();
        }, 20000);
        var serverMessage = '';

        try {
            var request = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                credentials: 'same-origin',
                headers: { 'Accept': 'application/json' },
                signal: abortController.signal
            });
            var response;
            try {
                response = await request.json();
            } catch (parseError) {
                throw new Error('The server returned an unexpected response.');
            }

            if (!request.ok || !response.success) {
                serverMessage = response && response.message ? response.message : '';
                throw new Error('The request was not accepted.');
            }

            form.reset();
            clearErrors();
            setSuccessResponse();
        } catch (error) {
            var message = error && error.name === 'AbortError'
                ? 'The request took too long. Please check your connection and try again.'
                : (serverMessage || 'Sorry, your request could not be sent right now. Please email info@hudsonhelm.com.');
            setResponse(message, 'error');
        } finally {
            window.clearTimeout(timeoutId);
            resetTurnstile();
            setSubmitting(false);
        }
    });
}());
