<?php
/**
 * @openapi
 * /inventory/save.php:
 *   post:
 *     summary: Create or update inventory record
 *     tags:
 *       - Inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               quantity_available:
 *                 type: number
 *               quantity_sold:
 *                 type: number
 *             required:
 *               - product_id
 *     responses:
 *       200:
 *         description: Inventory saved successfully
 *       400:
 *         description: Validation error
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
if (empty($data)) {
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
    exit;
}

$inventory = inventory::findByProductId($data['product_id']) ?? new inventory($data);
$inventory->quantity_available = $data['quantity_available'] ?? $inventory->quantity_available;
$inventory->quantity_sold = $data['quantity_sold'] ?? $inventory->quantity_sold;
$inventory->last_updated = date('Y-m-d H:i:s');

$response = $inventory->saveInventory();
if ($response['status'] === 'success') {
    auditLog::audit($data["user_id"] ?? 0, 'inventory_save', "Saved inventory for product ID {$data['product_id']}", $data);
}
echo json_encode($response);
