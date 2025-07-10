<?php
/**
 * @openapi
 * /cart/remove.php:
 *   delete:
 *     summary: Remove an item from a user's cart
 *     tags:
 *       - Cart
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
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Product removed from cart
 *       400:
 *         description: Missing user ID or product ID
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
 *                   example: User ID and Product ID are required
 */

require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Content-Type: application/json');

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$user_id = $data['user_id'] ?? null;
$product_id = $data['product_id'] ?? null;

if (!$user_id || !$product_id) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User ID and Product ID are required'
    ]);
    exit;
}

$cart = cart::findByUserId($user_id);

if (!$cart) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Cart not found for this user'
    ]);
    exit;
}

$response = $cart->removeFromCart($product_id);
echo json_encode($response);
exit;
