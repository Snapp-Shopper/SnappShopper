<?php
/**
 * @openapi
 * /orders/update_item.php:
 *   put:
 *     summary: Update an existing order item
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_item_id
 *             properties:
 *               order_item_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               price_at_purchase:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *       400:
 *         description: Missing or invalid input
 *       404:
 *         description: Order item not found
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

if (empty($data['order_item_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'order_item_id is required']);
    exit;
}

$item = order_Item::findOrderItemById($data['order_item_id']);

if (!$item) {
    echo json_encode(['status' => 'error', 'message' => 'Order item not found']);
    exit;
}

$response = $item->updateItem($data);
echo json_encode($response);
exit;