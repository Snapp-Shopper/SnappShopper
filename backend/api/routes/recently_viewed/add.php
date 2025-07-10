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
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

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
