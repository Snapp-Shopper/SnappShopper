<?php
/**
 * @openapi
 * /shipping/track.php:
 *   get:
 *     summary: Get shipping details by order ID
 *     tags:
 *       - Shipping
 *     parameters:
 *       - in: query
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shipping record found
 *       404:
 *         description: Not found
 */

require_once '../../initialize.php';

$order_id = $_GET['order_id'] ?? null;
if (!$order_id) {
    echo json_encode(['status' => 'error', 'message' => 'Order ID is required']);
    exit;
}

$shipping = shipping::findShippingByOrderId($order_id);
if (!$shipping || empty($shipping)) {
    echo json_encode(['status' => 'error', 'message' => 'Shipping info not found']);
    exit;
}

echo json_encode([
    'status' => 'success',
    'shipping' => $shipping[0]
]);
