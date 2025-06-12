<?php
/**
 * @openapi
 * /admin/cache.php:
 *   get:
 *     summary: Manage cache keys (list, get, clear)
 *     tags:
 *       - Developer
 *     parameters:
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           enum: [list, get, clear]
 *         required: true
 *         description: The cache action to perform
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *         required: false
 *         description: The cache key to get or clear (required for get and optional for clear)
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin API token for authorization
 *     responses:
 *       200:
 *         description: Cache operation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation
 *                   example: success
 *                 cache_keys:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of cache keys (only for list action)
 *                 data:
 *                   type: object
 *                   description: Cache data (only for get action)
 *                 message:
 *                   type: string
 *                   description: Operation message
 *       400:
 *         description: Missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Missing key
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Invalid action parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid action
 */

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
