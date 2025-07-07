<?php
/**
 * @openapi
 * /wishlist/get.php:
 *   get:
 *     summary: Get all products in a user's wishlist
 *     tags:
 *       - Wishlist
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of wishlist items
 *       404:
 *         description: No wishlist found
 */

require_once '../../initialize.php';

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['status' => 'error', 'message' => 'user_id is required']);
    exit;
}

$items = wishlist::findWishlistByUserId($user_id);
if (!empty($items)) {
    echo json_encode(['status' => 'success', 'wishlist' => $items]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Wishlist is empty']);
}
exit;
