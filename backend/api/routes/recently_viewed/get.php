<?php
/**
 * @openapi
 * /recently_viewed/get.php:
 *   get:
 *     summary: Get recently viewed items by user
 *     tags:
 *       - RecentlyViewed
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of recently viewed items
 *       400:
 *         description: Missing user_id
 */
require_once '../../initialize.php';

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['status' => 'error', 'message' => 'user_id is required']);
    exit;
}

$items = recentlyViewedItem::findByUserId($user_id);
echo json_encode([
    'status' => 'success',
    'items' => $items
]);
exit;
