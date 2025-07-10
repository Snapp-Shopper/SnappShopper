<?php
/**
 * @openapi
 * /recently_viewed/delete.php:
 *   delete:
 *     summary: Delete a recently viewed item by user and product
 *     tags:
 *       - RecentlyViewed
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *       - name: product_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       400:
 *         description: Missing parameters
 */
require_once '../../initialize.php';
header('Content-Type: application/json');

$user_id = $_GET['user_id'] ?? null;
$product_id = $_GET['product_id'] ?? null;

if (!$user_id || !$product_id) {
    echo json_encode(['status' => 'error', 'message' => 'user_id and product_id are required']);
    exit;
}

$deleted = recentlyViewedItem::deleteByUserAndProduct($user_id, $product_id);
echo json_encode([
    'status' => $deleted ? 'success' : 'error',
    'message' => $deleted ? 'Item deleted' : 'Deletion failed'
]);
exit;
