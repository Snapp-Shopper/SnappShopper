<?php
/**
 * @openapi
 * /shipping/initiate-dhl.php:
 *   post:
 *     summary: Initiate DHL shipping for a paid order
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
 *             properties:
 *               order_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: DHL shipping created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: DHL shipping failed
 */

require_once '../../initialize.php';

header('Content-Type: application/json');

// Read input
$data = json_decode(file_get_contents("php://input"), true);
$order_id = $data['order_id'] ?? null;

if (!$order_id) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing order_id']);
    exit;
}

// Fetch shipping record
$shipping = shipping::findShippingByOrderId($order_id);
if (!$shipping || empty($shipping[0])) {
    echo json_encode(['status' => 'error', 'message' => 'Shipping record not found for this order']);
    exit;
}
$shipping = $shipping[0];

// Fetch order + user
$order = orders::findOrderById($order_id);
$user = users::findById($order->user_id);
$address = address::findAddressById($shipping->address_id);
$orderItems = order_Item::findOrderItemsByOrderId($order_id);

// Estimate payload for DHL
$dhlPayload = [
    'recipient' => [
        'name' => "{$user->first_name} {$user->last_name}",
        'address' => $address->address_line1,
        'city' => $address->city,
        'state' => $address->state,
        'zip' => $address->zip_code,
        'country' => $address->country,
        'phone' => $user->phone_number ?? '',
        'email' => $user->email
    ],
    'items' => array_map(function ($item) {
        $product = products::findById($item->product_id);
        return [
            'name' => $product->name,
            'quantity' => $item->quantity,
            'weight' => 0.5, // Optional: if you track weight per product
        ];
    }, $orderItems),
    'order_no' => $order->order_id,
];

// Send request to DHLService
$response = DHLService::createShipment($dhlPayload);

if ($response['status'] !== 'success') {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'DHL shipment failed',
        'details' => $response['message'] ?? 'Unknown error'
    ]);
    $log = new auditLog([
        'user_id' => $user->user_id,
        'action' => 'dhl_shipment_failed',
        'action_date' => date('Y-m-d H:i:s'),
        'description' => "DHL shipment failed for order #{$order->order_id}: {$response['message']}"
    ]);
    $log->saveAuditLog();
    exit;
}

// Update shipping record
$shipping->shipping_status = 'Shipped';
$shipping->tracking_number = $response['tracking_number'];
$shipping->shipping_date = date('Y-m-d H:i:s');
$shipping->save();

if (!$shipping->save()) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to update shipping record']);
    $log = new auditlog([
        'user_id' => $user->user_id,
        'action' => 'dhl_shipment_failed',
        'action_date' => date('Y-m-d H:i:s'),
        'description' => 'Failed to update shipping record after DHL shipment'
    ]);
    $log->saveAuditLog();
    exit;
}

// Log audit
$log = new auditLog([
    'user_id' => $user->user_id,
    'action' => 'dhl_shipment_initiated',
    'action_date' => date('Y-m-d H:i:s'),
    'description' => "DHL shipment initiated for order #{$order->order_id}, tracking number: {$response['tracking_number']}"
]);
$log->saveAuditLog();

$log = new auditLog([
    'user_id' => $user->user_id,
    'action' => 'dhl_shipment_created',
    'action_date' => date('Y-m-d H:i:s'),
    'description' => "DHL shipment successfully created for order #{$order->order_id}"
]);
$log->saveAuditLog();

echo json_encode([
    'status' => 'success',
    'message' => 'DHL shipment successfully created',
    'tracking_number' => $response['tracking_number'],
    'estimated_delivery' => [
        'start' => $response['start'],
        'end' => $response['end']
    ]
]);
