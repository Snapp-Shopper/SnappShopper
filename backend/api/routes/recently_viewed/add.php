<?php
/**
 * @openapi
 * /recently_viewed/add.php:
 *   post:
 *     summary: Add a recently viewed product
 *     tags:
 *       - RecentlyViewed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - product_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Recently viewed item added
 *       400:
 *         description: Invalid data
 */
require_once '../../initialize.php';

$data = $_POST;
if (empty($data)) {
    $rawInput = file_get_contents('php://input');
    // Try to decode JSON
    $decoded = json_decode($rawInput, true);
    
    if (json_last_error() === JSON_ERROR_NONE) {
        $data = $decoded;
    } else {
        // Try to auto-fix bad JSON (unquoted keys)
       $data = fixBrokenJson($rawData);
    }
}

if (!$data || empty($data['user_id']) || empty($data['product_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'user_id and product_id are required']);
    exit;
}

// Optionally delete previous instance
recentlyViewedItem::deleteByUserAndProduct($data['user_id'], $data['product_id']);

// Save new view
$view = new recentlyViewedItem([
    'user_id' => $data['user_id'],
    'product_id' => $data['product_id'],
    'viewed_at' => date('Y-m-d H:i:s')
]);

$response = $view->saveRecentlyViewedItem();
echo json_encode($response);
exit;
