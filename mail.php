<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailerException;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

require __DIR__ . '/includes/contact-config.php';
require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

function respond(bool $success, string $message, int $statusCode = 200): never
{
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message,
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

function input_value(string $key): string
{
    $value = $_POST[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function single_line(string $value): string
{
    $value = preg_replace('/[\r\n\t]+/', ' ', $value) ?? '';
    $value = preg_replace('/[\x00-\x1F\x7F]+/', '', $value) ?? '';
    return trim(preg_replace('/\s{2,}/', ' ', $value) ?? '');
}

function message_text(string $value): string
{
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    return trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value) ?? '');
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function turnstile_is_valid(string $token): bool
{
    $secret = hh_config('TURNSTILE_SECRET_KEY');
    if ($secret === null || !function_exists('curl_init')) {
        throw new RuntimeException('Turnstile server configuration is unavailable.');
    }

    $payload = [
        'secret' => $secret,
        'response' => $token,
    ];
    if (!empty($_SERVER['REMOTE_ADDR'])) {
        $payload['remoteip'] = $_SERVER['REMOTE_ADDR'];
    }

    $request = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    if ($request === false) {
        throw new RuntimeException('Turnstile verification could not be initialized.');
    }

    curl_setopt_array($request, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($payload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Accept: application/json'],
    ]);

    $rawResponse = curl_exec($request);
    $statusCode = (int) curl_getinfo($request, CURLINFO_RESPONSE_CODE);
    unset($request);

    if (!is_string($rawResponse) || $statusCode !== 200) {
        throw new RuntimeException('Turnstile verification did not return a usable response.');
    }

    $verification = json_decode($rawResponse, true);
    if (!is_array($verification) || empty($verification['success'])) {
        return false;
    }

    $expectedAction = hh_config('TURNSTILE_ACTION', 'contact');
    if (!empty($verification['action']) && $verification['action'] !== $expectedAction) {
        return false;
    }

    $allowedHostnames = array_filter(array_map(
        'trim',
        explode(',', hh_config('TURNSTILE_ALLOWED_HOSTNAMES', 'hudsonhelm.com,www.hudsonhelm.com') ?? '')
    ));
    if (!empty($verification['hostname']) && !in_array($verification['hostname'], $allowedHostnames, true)) {
        return false;
    }

    return true;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 'Invalid request method.', 405);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 25000) {
    respond(false, 'The request is too large.', 413);
}

$name = single_line(input_value('name'));
$company = single_line(input_value('company'));
$email = single_line(input_value('email'));
$phone = single_line(input_value('phone'));
$message = message_text(input_value('message'));
$website = input_value('website');
$turnstileToken = input_value('cf-turnstile-response');

if ($website !== '') {
    respond(true, 'Thanks. Your request has been sent.');
}

if ($name === '' || $company === '' || $email === '' || $message === '') {
    respond(false, 'Please complete all required fields.', 422);
}

if (
    text_length($name) > 100
    || text_length($company) > 150
    || text_length($email) > 254
    || text_length($phone) > 50
    || text_length($message) > 5000
) {
    respond(false, 'One or more fields are too long.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

if ($turnstileToken === '' || strlen($turnstileToken) > 2048) {
    respond(false, 'Please complete the spam-protection check and try again.', 403);
}

try {
    if (!turnstile_is_valid($turnstileToken)) {
        respond(false, 'The spam-protection check could not be verified. Please try again.', 403);
    }
} catch (RuntimeException $exception) {
    error_log('Hudson Helm contact form: Turnstile verification unavailable.');
    respond(false, 'The form is temporarily unavailable. Please email info@hudsonhelm.com.', 503);
}

$smtpUsername = hh_config('SMTP_USERNAME');
$smtpPassword = hh_config('SMTP_PASSWORD');
$smtpHost = hh_config('SMTP_HOST', 'smtp.migadu.com');
$smtpPort = (int) (hh_config('SMTP_PORT', '465') ?? '465');
$smtpEncryption = strtolower(hh_config('SMTP_ENCRYPTION', 'smtps') ?? 'smtps');
$smtpAuth = hh_config_bool('SMTP_AUTH', true);
$fromEmail = hh_config('SMTP_FROM_EMAIL', $smtpUsername);
$fromName = hh_config('SMTP_FROM_NAME', 'Hudson Helm');
$toEmail = hh_config('SMTP_TO_EMAIL', 'info@hudsonhelm.com');

if (
    $smtpHost === null
    || $smtpPort < 1
    || $smtpPort > 65535
    || $fromEmail === null
    || $toEmail === null
    || (!$smtpAuth && hh_config('APP_ENV') !== 'testing')
    || ($smtpAuth && ($smtpUsername === null || $smtpPassword === null))
    || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)
    || !filter_var($toEmail, FILTER_VALIDATE_EMAIL)
) {
    error_log('Hudson Helm contact form: SMTP configuration unavailable.');
    respond(false, 'The form is temporarily unavailable. Please email info@hudsonhelm.com.', 503);
}

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeCompany = htmlspecialchars($company, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safePhone = htmlspecialchars($phone, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
$subject = '[WEBSITE LEAD] Website Info Request from ' . $company;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    $mail->SMTPAuth = $smtpAuth;
    $mail->Timeout = 10;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;

    if ($smtpAuth) {
        $mail->Username = $smtpUsername;
        $mail->Password = $smtpPassword;
    }

    if ($smtpEncryption === 'smtps' || $smtpEncryption === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($smtpEncryption === 'tls' || $smtpEncryption === 'starttls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } elseif ($smtpEncryption === 'none' && hh_config('APP_ENV') === 'testing') {
        $mail->SMTPSecure = '';
        $mail->SMTPAutoTLS = false;
    } else {
        throw new RuntimeException('Unsupported SMTP encryption setting.');
    }

    $mail->setFrom($fromEmail, $fromName ?? 'Hudson Helm');
    $mail->addAddress($toEmail, 'Hudson Helm');
    $mail->addReplyTo($email, $name);
    $mail->Priority = 1;
    $mail->addCustomHeader('Importance', 'High');
    $mail->addCustomHeader('X-MSMail-Priority', 'High');
    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body = ''
        . '<h2>New inquiry from HudsonHelm.com</h2>'
        . '<p><strong>Name:</strong> ' . $safeName . '</p>'
        . '<p><strong>Company:</strong> ' . $safeCompany . '</p>'
        . '<p><strong>Email:</strong> ' . $safeEmail . '</p>'
        . '<p><strong>Phone:</strong> ' . ($safePhone !== '' ? $safePhone : 'Not provided') . '</p>'
        . '<p><strong>How can we help?</strong><br>' . $safeMessage . '</p>';
    $mail->AltBody = "New inquiry from HudsonHelm.com\n\n"
        . "Name: {$name}\n"
        . "Company: {$company}\n"
        . "Email: {$email}\n"
        . 'Phone: ' . ($phone !== '' ? $phone : 'Not provided') . "\n\n"
        . "How can we help?\n{$message}\n";

    $mail->send();
    respond(true, 'Thanks. Your request has been sent.');
} catch (MailerException | RuntimeException $exception) {
    error_log('Hudson Helm contact form: email delivery failed.');
    respond(false, 'Sorry, your request could not be sent right now. Please email info@hudsonhelm.com.', 500);
}
