<?php
/**
 * @openapi
 * /wishlist/check.php:
 *   get:
 *     summary: Check if a product exists in the user's wishlist
 *     tags:
 *       - Wishlist
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
 *         description: Status of wishlist existence
 */

require_once '../../initialize.php';

$user_id = $_GET['user_id'] ?? null;
$product_id = $_GET['product_id'] ?? null;

if (!$user_id || !$product_id) {
    echo json_encode(['status' => 'error', 'message' => 'Missing user_id or product_id']);
    exit;
}

$isInWishlist = wishlist::isProductInWishlist($user_id, $product_id);
echo json_encode(['status' => 'success', 'in_wishlist' => $isInWishlist]);
exit;
