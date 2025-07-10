<?php
/**
 * @openapi
 * /orders/get_order_byuser.php:
 *   get:
 *     summary: Get orders by user ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       404:
 *         description: No orders found
 */

// Example: routes/orders/user.php
require_once '../../initialize.php';

$user_id = $_GET['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(['status' => 'error', 'message' => 'User ID is required']);
    exit;
}

$orders = orders::findOrdersByUserId($user_id);
echo json_encode(['status' => 'success', 'orders' => $orders]);
