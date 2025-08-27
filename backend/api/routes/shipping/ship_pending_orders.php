<?php

define('APP_INITIALIZED', true);
require_once __DIR__ . '../../initialize.php';

echo "=== Starting DHL Shipment Batch Job ===\n";
auditLog::audit(0, 'dhl_shipment_batch_start', 'DHL shipment batch job started');

$pendingShipments = shipping::findPendingWithoutTracking();

if (empty($pendingShipments)) {
    echo "No pending shipments to process.\n";
    exit;
}

foreach ($pendingShipments as $shipping) {
    $order = orders::findOrderById($shipping->order_id);
    $user = users::findById($order->user_id);
    $address = address::getById($shipping->address_id);
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

        auditLog::audit($user->user_id, 'dhl_shipment', "Order #{$order->order_id} shipped via DHL - Tracking: {$dhlResult['tracking_number']}");

        echo "✅ Order #{$order->order_id} shipped via DHL - Tracking: {$dhlResult['tracking_number']}\n";
    } else {
        echo "❌ Failed to ship order #{$order->order_id}: {$dhlResult['message']}\n";
        auditLog::audit($user->user_id, 'dhl_shipment_failed', "Order #{$order->order_id} shipment failed: {$dhlResult['message']}");
    }
}

echo "=== DHL Shipment Batch Complete ===\n";
auditLog::audit(0, 'dhl_shipment_batch_complete', 'DHL shipment batch job completed');
