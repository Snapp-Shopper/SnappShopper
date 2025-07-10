<?php
/**
 * @openapi
 * /orders/update_status.php:
 *   post:
 *     summary: Update the status of an order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - status
 *             properties:
 *               order_id:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [Pending, Shipped, Delivered, Cancelled]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Validation failed or order not found
 *       500:
 *         description: Server error
 */
require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['order_id']) || empty($data['status'])) {
    echo json_encode(['status' => 'error', 'message' => 'order_id and status are required.']);
    exit;
}

$order = orders::findOrderById($data['order_id']);

if (!$order) {
    echo json_encode(['status' => 'error', 'message' => 'Order not found']);
    exit;
}

$response = $order->updateStatus($data['status']);
echo json_encode($response);
exit;
