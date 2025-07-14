<?php

define('APP_INITIALIZED', true);
require_once __DIR__ . '../../initialize.php';

echo "=== Starting DHL Shipment Batch Job ===\n";
$log = new auditLog([
    'user_id' => 0, // System job
    'action' => 'dhl_shipment_batch',
    'action_date' => date('Y-m-d H:i:s'),
    'description' => 'DHL shipment batch job started'
]);
$log->saveAuditLog();

$pendingShipments = shipping::findPendingWithoutTracking();

if (empty($pendingShipments)) {
    echo "No pending shipments to process.\n";
    exit;
}

foreach ($pendingShipments as $shipping) {
    $order = orders::findOrderById($shipping->order_id);
    $user = users::findById($order->user_id);
    $address = address::findAddressById($shipping->address_id);
    $orderItems = order_Item::findOrderItemsByOrderId($order->order_id);

    $payload = [
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
                'weight' => 0.5
            ];
        }, $orderItems),
        'order_no' => $order->order_id,
    ];

    echo "Processing Order #{$order->order_id}...\n";
    $dhlResult = DHLService::createShipment($payload);

    if ($dhlResult['status'] === 'success') {
        $shipping->shipping_status = 'Shipped';
        $shipping->tracking_number = $dhlResult['tracking_number'];
        $shipping->shipping_date = date('Y-m-d H:i:s');
        $shipping->save();

        $log = new auditLog([
            'user_id' => $user->user_id,
            'action' => 'dhl_shipment_auto',
            'action_date' => date('Y-m-d H:i:s'),
            'description' => "Auto-shipment created for order #{$order->order_id}"
        ]);
        $log->saveAuditLog();

        echo "✅ Order #{$order->order_id} shipped via DHL - Tracking: {$dhlResult['tracking_number']}\n";
    } else {
        echo "❌ Failed to ship order #{$order->order_id}: {$dhlResult['message']}\n";
        $log = new auditLog([
            'user_id' => $user->user_id,
            'action' => 'dhl_shipment_failed',
            'action_date' => date('Y-m-d H:i:s'),
            'description' => "DHL shipment failed for order #{$order->order_id}: {$dhlResult['message']}"
        ]);
        $log->saveAuditLog();
    }
}

echo "=== DHL Shipment Batch Complete ===\n";
$log = new auditLog([
    'user_id' => 0,
    'action' => 'dhl_shipment_batch_complete',
    'action_date' => date('Y-m-d H:i:s'),
    'description' => 'DHL shipment batch job completed'
]);
$log->saveAuditLog();
