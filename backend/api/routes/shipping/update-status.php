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
auditLog::audit(0, 'shipping_status_update', "Order #{$order_id} status updated to {$status}");

echo json_encode($response);
