<?php
/**
 * @openapi
 * /orders/process-payment.php:
 *   post:
 *     summary: Process payment and create the order after successful payment
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - total_amount
 *               - payment_method
 *               - payment_status
 *               - order_items
 *             properties:
 *               user_id:
 *                 type: integer
 *               total_amount:
 *                 type: number
 *               discount_code:
 *                 type: string
 *               payment_method:
 *                 type: string
 *                 enum: [Credit Card, PayPal, Bank Transfer]
 *               payment_status:
 *                 type: string
 *                 enum: [Completed]
 *               address_id:
 *                 type: integer
 *               estimated_delivery_start_date:
 *                 type: string
 *               estimated_delivery_end_date:
 *                 type: string
 *               order_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - quantity
 *                     - price_at_purchase
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     price_at_purchase:
 *                       type: number
 *     responses:
 *       200:
 *         description: Order and payment saved successfully
 */

require_once '../../initialize.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// Parse input (JSON or form-data)
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
if (empty($data)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No valid data received.'
    ]);
    exit;
}

// === Extract & Validate Input ===
$user_id         = $data['user_id'] ?? null;
$total_amount    = $data['total_amount'] ?? null;
$payment_method  = $data['payment_method'] ?? null;
$payment_status  = $data['payment_status'] ?? 'Pending';
$discount_code   = $data['discount_code'] ?? null;
$order_items     = $data['order_items'] ?? [];
$start_date      = $data['estimated_delivery_start_date'];
$end_date        = $data['estimated_delivery_end_date'];

if (!$user_id || !$total_amount || !$payment_method || empty($order_items)) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

// === DISCOUNT HANDLING ===
$discount_amount = 0;
$discount = null;
if ($discount_code) {
    $discount = discount::isValidDiscount($discount_code);
    if ($discount) {
        $discount_amount = ($total_amount * $discount->discount_percentage / 100);
        $total_amount -= $discount_amount;
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid or expired discount code']);
        exit;
    }
}

// === STOCK CHECK ===
foreach ($order_items as $item) {
    $inventory = inventory::findByProductId($item['product_id']);
    if (!$inventory || $inventory->quantity_available < $item['quantity']) {
        echo json_encode([
            'status' => 'error',
            'message' => "Insufficient stock for product ID {$item['product_id']}"
        ]);
        exit;
    }
}

// === CREATE ORDER ===
$order = new orders([
    'user_id' => $user_id,
    'order_date' => date('Y-m-d H:i:s'),
    'status' => 'Pending',
    'total_amount' => $total_amount
]);
$order_response = $order->saveOrder();

if ($order_response['status'] !== 'success') {
    echo json_encode($order_response);
    exit;
}

// === CREATE ORDER ITEMS ===
foreach ($order_items as $item_data) {
    $item_data['order_id'] = $order->order_id;
    $item = new order_Item($item_data);
    $save_item = $item->saveOrderItem();

    // Handle save failure
    if ($save_item['status'] !== 'success') {
        echo json_encode([
            'status' => 'error',
            'message' => "Failed to save item for product ID {$item_data['product_id']}"
        ]);
        exit;
    }
}

// === DECREMENT DISCOUNT USAGE ===
if ($discount) {
    $discount->decrementUsageLimit();
}

// === SAVE PAYMENT ===
$payment = new Payment([
    'order_id'       => $order->order_id,
    'amount'         => $total_amount,
    'payment_date'   => date('Y-m-d H:i:s'),
    'payment_method' => $payment_method,
    'status'         => $payment_status,
    'created_at'     => date('Y-m-d H:i:s')
]);

$payment_result = $payment->savePayment();

// === HANDLE PAYMENT FAILURE ===
if ($payment_result['status'] !== 'success') {
    // Revert order and stock
    $order->status = 'Cancelled';
    $order->saveOrder();

    foreach ($order_items as $item_data) {
        $product = products::findById($item_data['product_id']);
        if ($product) {
            $product->stock += $item_data['quantity'];
            $product->save();
        }
    }

    // Log the failed payment
    $fail_log = new auditLog([
        'user_id' => $user_id,
        'action' => 'failed_order_payment',
        'action_date' => date('Y-m-d H:i:s'),
        'description' => "Order #{$order->order_id} payment failed with method {$payment_method}"
    ]);
    $fail_log->saveAuditLog();

    echo json_encode([
        'status' => 'error',
        'message' => 'Payment failed. Order cancelled.',
        'details' => $payment_result
    ]);
    exit;
}

// === CREATE SHIPPING RECORD ===
if (!empty($data['address_id'])) {
    
    $shipping = new shipping([
        'order_id' => $order->order_id,
        'address_id' => $data['address_id'],
        'shipping_status' => 'Pending',
        'tracking_number' => '', // To be updated later after DHL call
        'estimated_delivery_start_date' => $start_date,
        'estimated_delivery_end_date' => $end_date,
        'created_at' => date('Y-m-d H:i:s')
    ]);

    $shipping->saveShipping();


    // Log shipping creation
    $log = new auditLog([
        'user_id' => $user_id,
        'action' => 'shipping_created',
        'action_date' => date('Y-m-d H:i:s'),
        'description' => "Shipping created for order #{$order->order_id}"
    ]);
    $log->saveAuditLog();
}


// === AUDIT SUCCESSFUL ORDER ===
$log = new auditLog([
    'user_id' => $user_id,
    'action' => 'complete_order_payment',
    'action_date' => date('Y-m-d H:i:s'),
    'description' => "Order #{$order->order_id} placed successfully using {$payment_method}"
]);
$log->saveAuditLog();
// send notification to user
notification::notify($user_id, "Your order #{$order->order_id} has been placed successfully.", 'Order');
$deviceToken = DeviceToken::getTokenByUserId($user_id);
if ($deviceToken) {
    PushNotifier::sendToDevice(
        $deviceToken,
        "Order Confirmation",
        "Your order #{$order->order_id} has been placed successfully.",
        ['order_id' => $order->order_id, 'status' => 'Pending']
    );
}
echo json_encode([
    'status' => 'success',
    'message' => 'Order placed and payment recorded',
    'order_id' => $order->order_id,
    'order_no' => $order->order_no,
    'estimated_delivery' => [
        'start' => $start_date,
        'end' => $end_date
    ]
]);
// === END OF PROCESSING ===
