<?php
// Description: Developer endpoint for viewing and clearing cache (requires auth token)

require_once '../../initialize.php';
require_once '../../helpers/CacheHelper.php';

header('Content-Type: application/json');

// === AUTH CHECK ===
$headers = getallheaders();
$providedToken = $headers['Authorization'] ?? ($_GET['token'] ?? '');

if ($providedToken !== ADMIN_API_TOKEN) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}


// === ROUTING ===
$action = $_GET['action'] ?? null;
$key = $_GET['key'] ?? null;

switch ($action) {
    case 'list':
        echo json_encode([
            'status' => 'success',
            'cache_keys' => CacheHelper::listKeys()
        ]);
        break;

    case 'get':
        if (!$key) {
            echo json_encode(['status' => 'error', 'message' => 'Missing key']);
            break;
        }
        $data = CacheHelper::get($key);
        echo json_encode([
            'status' => $data ? 'success' : 'expired_or_missing',
            'data' => $data
        ]);
        break;

    case 'clear':
        if ($key) {
            CacheHelper::clear($key);
            echo json_encode(['status' => 'success', 'message' => "Cleared $key"]);
        } else {
            CacheHelper::clearAll();
            echo json_encode(['status' => 'success', 'message' => "All cache cleared"]);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
        break;
}
