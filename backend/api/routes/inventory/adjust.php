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
    auditLog::audit($data["user_id"] ?? 0, 'inventory_adjust', "Adjusted inventory for product ID $product_id by $change", $change);
}

echo json_encode($success
    ? ['status' => 'success', 'message' => 'Quantity adjusted']
    : ['status' => 'error', 'message' => 'Failed to adjust quantity']
);
