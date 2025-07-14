<?php
/**
 * @openapi
 * /inventory/adjust.php:
 *   patch:
 *     summary: Adjust inventory quantity for a product
 *     tags:
 *       - Inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - change
 *             properties:
 *               product_id:
 *                 type: integer
 *               change:
 *                 type: number
 *                 description: Quantity to add/subtract from available inventory
 *     responses:
 *       200:
 *         description: Quantity adjusted
 *       400:
 *         description: Invalid input
 */
require_once '../../initialize.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$product_id = $data['product_id'] ?? null;
$change = $data['change'] ?? 0;

if (!$product_id) {
    echo json_encode(['status' => 'error', 'message' => 'Product ID is required']);
    exit;
}

$inventory = inventory::findByProductId($product_id);
if (!$inventory) {
    echo json_encode(['status' => 'error', 'message' => 'Inventory not found']);
    exit;
}

$success = $inventory->adjustQuantity($change);
if ($success) {
    $log = new auditLog([
        'user_id' => $_POST['user_id'] ?? 0, // or get from token/session if available
        'action' => 'inventory_adjust',
        'action_date' => date('Y-m-d H:i:s'),
        'description' => "Adjusted inventory for product_id {$product_id} by {$change}"
    ]);
    $log->saveAuditLog();
}

echo json_encode($success
    ? ['status' => 'success', 'message' => 'Quantity adjusted']
    : ['status' => 'error', 'message' => 'Failed to adjust quantity']
);
