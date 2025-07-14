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
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
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
    $log = new auditLog([
        'user_id' => $_POST['user_id'] ?? 0, // or get from token/session if available
        'action' => 'inventory_save',
        'action_date' => date('Y-m-d H:i:s'),
        'description' => "Inventory saved for product_id {$inventory->product_id}"
    ]);
    $log->saveAuditLog();
}
echo json_encode($response);
