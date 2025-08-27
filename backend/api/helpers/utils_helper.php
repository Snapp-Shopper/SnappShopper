<?php

/**
 * Fixes broken JSON strings where object keys are not quoted.
 *
 * @param string $json The malformed JSON string.
 * @return array|false Returns the fixed array if successful, or false on failure.
 */
function fixBrokenJson($json) {
    // Fix unquoted keys: email: "value" => "email": "value"
    $fixed = preg_replace('/([{,]\s*)([a-zA-Z0-9_]+)(\s*):/', '$1"$2"$3:', $json);

    // Attempt to decode
    $decoded = json_decode($fixed, true);

    return json_last_error() === JSON_ERROR_NONE ? $decoded : false;
}
