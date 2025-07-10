<?php
/**
 * @openapi
 * /orders/get_orderitem_byid.php:
 *   get:
 *     summary: Get a specific order item by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: order_item_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order item found
 *       404:
 *         description: Order item not found
 */
require_once '../../initialize.php';

header('Content-Type: application/json');
$id = $_GET['order_item_id'] ?? null;

if (!$id) {
    echo json_encode(['status' => 'error', 'message' => 'order_item_id is required']);
    exit;
}

$item = order_Item::findOrderItemById($id);
echo json_encode($item ? ['status' => 'success', 'order_item' => $item] : ['status' => 'error', 'message' => 'Order item not found']);
exit;
