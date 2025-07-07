<?php
/**
 * @openapi
 * /wishlist/add.php:
 *   post:
 *     summary: Add a product to the user's wishlist
 *     tags:
 *       - Wishlist
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
 *         description: Product added to wishlist
 *       400:
 *         description: Validation error or already exists
 */

require_once '../../initialize.php';

$data = json_decode(file_get_contents('php://input'), true);
if (wishlist::isProductInWishlist($data['user_id'], $data['product_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Product already in wishlist']);
    exit;
}

$wishlist = new wishlist($data);
$response = $wishlist->addToWishlist();
echo json_encode($response);
exit;
