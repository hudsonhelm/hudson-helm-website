<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');

require __DIR__ . '/includes/contact-config.php';

function support_respond(bool $success, string $message, int $statusCode = 200): never
{
    http_response_code($statusCode);
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    support_respond(false, 'Invalid request method.', 405);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 4096) {
    support_respond(false, 'The request is too large.', 413);
}

$allowedFields = ['cf-turnstile-response'];
$unexpectedFields = array_diff(array_keys($_POST), $allowedFields);
if ($unexpectedFields !== []) {
    support_respond(false, 'Invalid request.', 400);
}

$token = trim((string) ($_POST['cf-turnstile-response'] ?? ''));
if ($token === '' || strlen($token) > 2048) {
    support_respond(false, 'Security verification is required.', 422);
}

$secret = hh_config('TURNSTILE_SECRET_KEY');
if ($secret === null) {
    support_respond(false, 'Portal verification is temporarily unavailable.', 503);
}

$payload = [
    'secret' => $secret,
    'response' => $token,
];
$remoteAddress = $_SERVER['REMOTE_ADDR'] ?? '';
if (filter_var($remoteAddress, FILTER_VALIDATE_IP)) {
    $payload['remoteip'] = $remoteAddress;
}

$request = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
if ($request === false) {
    support_respond(false, 'Portal verification is temporarily unavailable.', 503);
}

curl_setopt_array($request, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
]);
$rawResponse = curl_exec($request);
$curlError = curl_errno($request);
$httpStatus = (int) curl_getinfo($request, CURLINFO_HTTP_CODE);

if ($curlError !== 0 || !is_string($rawResponse) || $httpStatus < 200 || $httpStatus >= 300) {
    support_respond(false, 'Security verification could not be completed.', 503);
}

$verification = json_decode($rawResponse, true);
if (!is_array($verification) || ($verification['success'] ?? false) !== true) {
    support_respond(false, 'Security verification was not accepted.', 403);
}

$isTestEnvironment = hh_config('APP_ENV') === 'testing';
$expectedAction = hh_config('SUPPORT_TURNSTILE_ACTION', 'support');
if (!$isTestEnvironment && ($verification['action'] ?? '') !== $expectedAction) {
    support_respond(false, 'Security verification was not accepted.', 403);
}

$allowedHostnames = array_values(array_filter(array_map(
    static fn (string $hostname): string => strtolower(trim($hostname)),
    explode(',', hh_config('TURNSTILE_ALLOWED_HOSTNAMES', 'hudsonhelm.com,www.hudsonhelm.com') ?? '')
)));
$verifiedHostname = strtolower((string) ($verification['hostname'] ?? ''));
if (!$isTestEnvironment && ($verifiedHostname === '' || !in_array($verifiedHostname, $allowedHostnames, true))) {
    support_respond(false, 'Security verification was not accepted.', 403);
}

support_respond(true, 'Security verification accepted.');
