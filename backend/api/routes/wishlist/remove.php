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


$wishlist = new wishlist($data);
$response = $wishlist->removeFromWishlist();
echo json_encode($response);
exit;
