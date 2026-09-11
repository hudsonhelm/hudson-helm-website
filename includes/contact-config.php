<?php

declare(strict_types=1);

if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    http_response_code(404);
    exit;
}

/**
 * Load optional production values from a PHP file one directory above the
 * public site root. A guarded in-root fallback supports FTP accounts that are
 * chrooted to the public directory. Environment variables take precedence.
 */
function hh_private_config(): array
{
    static $config;

    if (is_array($config)) {
        return $config;
    }

    $config = [];
    $privateConfigPaths = [
        dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'hudson-helm-config.php',
        __DIR__ . DIRECTORY_SEPARATOR . 'contact-production.php',
    ];

    foreach ($privateConfigPaths as $privateConfigPath) {
        if (is_readable($privateConfigPath)) {
            $loaded = require $privateConfigPath;
            if (is_array($loaded)) {
                $config = $loaded;
                break;
            }
        }
    }

    return $config;
}

function hh_config(string $key, ?string $default = null): ?string
{
    $environmentValue = getenv($key);
    if ($environmentValue !== false && $environmentValue !== '') {
        return $environmentValue;
    }

    $privateConfig = hh_private_config();
    if (isset($privateConfig[$key]) && is_scalar($privateConfig[$key])) {
        $value = (string) $privateConfig[$key];
        if ($value !== '') {
            return $value;
        }
    }

    return $default;
}

function hh_config_bool(string $key, bool $default): bool
{
    $value = hh_config($key);
    if ($value === null) {
        return $default;
    }

    $filtered = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    return $filtered ?? $default;
}
