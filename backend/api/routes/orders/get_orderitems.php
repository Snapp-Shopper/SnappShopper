<?php 
/**
 * @openapi
 * /orders/get_orderitems.php:
 *   get:
 *     summary: Get all items in an order
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order items fetched successfully
 *       404:
 *         description: No items found
 */

// Example: routes/orders/items.php
require_once '../../initialize.php';

$order_id = $_GET['order_id'] ?? null;
if (!$order_id) {
    echo json_encode(['status' => 'error', 'message' => 'Order ID is required']);
    exit;
}

$items = order_Item::findOrderItemsByOrderId($order_id);
echo json_encode(['status' => 'success', 'order_items' => $items]);