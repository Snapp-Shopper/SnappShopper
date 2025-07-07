<?php
/**
 * @openapi
 * /wishlist/remove.php:
 *   post:
 *     summary: Remove a product from the user's wishlist
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
 *         description: Product removed from wishlist
 *       400:
 *         description: Validation error
 */

require_once '../../initialize.php';

$data = json_decode(file_get_contents('php://input'), true);

$wishlist = new wishlist($data);
$response = $wishlist->removeFromWishlist();
echo json_encode($response);
exit;
