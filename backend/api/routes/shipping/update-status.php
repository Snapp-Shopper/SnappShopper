<?php
/**
 * @openapi
 * /shipping/update-status.php:
 *   put:
 *     summary: Update shipping status for an order
 *     tags:
 *       - Shipping
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - shipping_status
 *             properties:
 *               order_id:
 *                 type: integer
 *               shipping_status:
 *                 type: string
 *                 enum: [Pending, Shipped, Delivered]
 *     responses:
 *       200:
 *         description: Shipping status updated
 */

require_once '../../initialize.php';

$data = json_decode(file_get_contents('php://input'), true);
$order_id = $data['order_id'] ?? null;
$status = $data['shipping_status'] ?? null;

if (!$order_id || !$status) {
    echo json_encode(['status' => 'error', 'message' => 'Missing order ID or status']);
    exit;
}

$shippingList = shipping::findShippingByOrderId($order_id);
if (empty($shippingList)) {
    echo json_encode(['status' => 'error', 'message' => 'Shipping record not found']);
    exit;
}

$shipping = $shippingList[0];
$response = $shipping->updateShippingStatus($status);

// Log update
$log = new auditLog([
    'user_id' => $_POST['user_id'] ?? 0,
    'action' => 'shipping_status_update',
    'action_date' => date('Y-m-d H:i:s'),
    'description' => "Shipping status updated to '{$status}' for order ID {$order_id}"
]);
$log->saveAuditLog();

echo json_encode($response);
