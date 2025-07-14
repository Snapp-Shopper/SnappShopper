<?php
/**
 * @openapi
 * /discounts/apply-discount.php:
 *   post:
 *     summary: Apply a discount code to an order amount
 *     tags:
 *       - Discounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - amount
 *             properties:
 *               code:
 *                 type: string
 *                 description: Discount code to apply
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: Total order amount before discount
 *     responses:
 *       200:
 *         description: Discount applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 original_amount:
 *                   type: number
 *                   format: float
 *                   example: 5000
 *                 discount_percentage:
 *                   type: number
 *                   format: float
 *                   example: 10
 *                 discounted_amount:
 *                   type: number
 *                   format: float
 *                   example: 4500
 *       400:
 *         description: Invalid or expired discount code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid discount code
 */

require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$code = $data['code'] ?? null;
$amount = $data['amount'] ?? null;

if (!$code || !$amount || !is_numeric($amount)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Discount code and valid amount are required.'
    ]);
    exit;
}

// Check if discount is valid
$discount = discount::isValidDiscount($code);

if (!$discount) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid or expired discount code.'
    ]);
    exit;
}

$discountAmount = ($discount->discount_percentage / 100) * $amount;
$discountedTotal = $amount - $discountAmount;

echo json_encode([
    'status' => 'success',
    'original_amount' => (float) $amount,
    'discount_percentage' => (float) $discount->discount_percentage,
    'discounted_amount' => round($discountedTotal, 2)
]);
exit;
