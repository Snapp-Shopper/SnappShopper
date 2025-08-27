<?php
/**
 * @openapi
 * /cart/add.php:
 *   post:
 *     summary: Add a product to the user's cart
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
 *         description: Product added or updated in cart
 */
// routes/cart/add.php
require_once '../../initialize.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// Parse input (JSON or form-data)
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
// Validate required fields
if (empty($data['user_id']) || empty($data['product_id']) || empty($data['quantity'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields.']);
    exit;
}

$cart = cart::findByUserId($data['user_id']) ?? new cart(['user_id' => $data['user_id']]);
if (!$cart->cart_id) $cart->save();

$result = $cart->addToCart($data['product_id'], $data['quantity'], $data['price_at_addition'] ?? null);
echo json_encode($result);
