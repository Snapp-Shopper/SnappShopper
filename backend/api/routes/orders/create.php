<?php
/**
 * @openapi
 * /orders/create.php:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - total_amount
 *             properties:
 *               user_id:
 *                 type: integer
 *               total_amount:
 *                 type: number
 *                 format: float
 *               order_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     price_at_purchase:
 *                       type: number
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Validation error
 */

require_once '../../initialize.php';
// Only POST allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// Get form-data or JSON body
$data = $_POST;

if (empty($data)) {
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);
}

$order = new orders($data);
$response = $order->saveOrder();

if ($response['status'] === 'success' && !empty($data['order_items'])) {
    foreach ($data['order_items'] as $itemData) {
        $itemData['order_id'] = $order->order_id;
        $item = new order_Item($itemData);
        $item->saveOrderItem();
    }
}

echo json_encode($response);