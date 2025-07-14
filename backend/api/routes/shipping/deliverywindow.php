<?php
/**
 * @openapi
 * /shipping/deliverywindow.php:
 *   post:
 *     summary: Estimate delivery window for user's cart during checkout
 *     tags:
 *       - Shipping
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - address_id
 *               - items
 *             properties:
 *               user_id:
 *                 type: integer
 *               address_id:
 *                 type: integer
 *               items:
 *                 type: array
 *                 description: List of items with product_id and quantity
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - quantity
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Estimated delivery window generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     estimated_range:
 *                       type: string
 *                       example: 3 - 5 days
 *                     start:
 *                       type: string
 *                       format: date
 *                     end:
 *                       type: string
 *                       format: date
 *                     level_summary:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: regional
 */

require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Parse request
$input = json_decode(file_get_contents("php://input"), true);
$user_id = $input['user_id'] ?? null;
$address_id = $input['address_id'] ?? null;
$order_items = $input['items'] ?? [];

if (!$user_id || !$address_id || empty($order_items)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'user_id, address_id, and items are required'
    ]);
    exit;
}

// Load shipping address
$shipping_address = address::findAddressById($address_id);
if (!$shipping_address) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Shipping address not found'
    ]);
    exit;
}

// Estimate delivery window
$deliveryEstimate = ShipperEstimator::estimateDeliveryWindow($order_items, $shipping_address);

echo json_encode([
    'status' => 'success',
    'delivery_window' => $deliveryEstimate
]);
exit;
