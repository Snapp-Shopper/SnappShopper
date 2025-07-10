<?php
/**
 * @openapi
 * /cart/update.php:
 *   put:
 *     summary: Update the quantity of a product in the user's cart
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
 *               - quantity
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Quantity updated successfully
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
 *                   example: Quantity updated
 *       400:
 *         description: Invalid input or missing data
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
 *                   example: Missing user_id, product_id, or quantity
 *       404:
 *         description: Cart or product not found
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
 *                   example: Product not found in cart
 */

require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$user_id = $data['user_id'] ?? null;
$product_id = $data['product_id'] ?? null;
$quantity = $data['quantity'] ?? null;

if (!$user_id || !$product_id || !$quantity) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing user_id, product_id, or quantity'
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

$response = $cart->updateItemQuantity($product_id, $quantity);

echo json_encode($response);
exit;
