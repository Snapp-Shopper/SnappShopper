<?php
/**
 * @openapi
 * /cart/total.php:
 *   get:
 *     summary: Get the total price of all items in a user's cart
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose cart total is being requested
 *     responses:
 *       200:
 *         description: Total price of cart items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 total:
 *                   type: number
 *                   format: float
 *                   example: 1450.50
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
header('Access-Control-Allow-Methods: GET');
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
        'message' => 'Cart not found for this user'
    ]);
    exit;
}

$total = $cart->getTotalPrice();

echo json_encode([
    'status' => 'success',
    'total' => $total
]);
exit;
