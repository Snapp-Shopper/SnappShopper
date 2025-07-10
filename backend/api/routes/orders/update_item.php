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

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

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