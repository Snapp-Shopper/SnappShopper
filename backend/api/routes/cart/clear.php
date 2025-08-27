<?php
/**
 * @openapi
 * /cart/clear.php:
 *   delete:
 *     summary: Clear all items from a user's cart
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose cart should be cleared
 *     responses:
 *       200:
 *         description: Cart cleared successfully
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
 *                   example: Cart cleared successfully
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
        'message' => 'Cart not found for this user'
    ]);
    exit;
}

$items = $cart->getItemsInCart();
$response = cart::clearCart($items, $user_id);
echo json_encode($response);
exit;
