<?php
/**
 * @openapi
 * /cart/get.php:
 *   get:
 *     summary: Retrieve cart and its items by user ID
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user whose cart is being retrieved
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 cart:
 *                   type: object
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Missing user ID
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
 *                   example: User ID is required
 */

require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User ID is required'
    ]);
    exit;
}

$cart = cart::findByUserId($user_id);

if (!$cart) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No cart found for this user.'
    ]);
    exit;
}

$items = $cart->getItemsInCart();

echo json_encode([
    'status' => 'success',
    'cart' => $cart,
    'items' => $items
]);
exit;
