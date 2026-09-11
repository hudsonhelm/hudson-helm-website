<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

require __DIR__ . '/includes/contact-config.php';

function support_config_respond(array $payload, int $statusCode = 200): never
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET');
    support_config_respond(['error' => 'Invalid request method.'], 405);
}

$siteKey = hh_config('TURNSTILE_SITE_KEY');
if ($siteKey === null) {
    support_config_respond(['error' => 'Portal configuration is unavailable.'], 503);
}

support_config_respond(['turnstileSiteKey' => $siteKey]);
