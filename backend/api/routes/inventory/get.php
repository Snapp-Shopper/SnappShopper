<?php
/**
 * @openapi
 * /inventory/get.php:
 *   get:
 *     summary: Get inventory details by product ID
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: query
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory retrieved
 *       404:
 *         description: Inventory not found
 */
require_once '../../initialize.php';
header('Content-Type: application/json');

$product_id = $_GET['product_id'] ?? null;

if (!$product_id) {
    echo json_encode(['status' => 'error', 'message' => 'Product ID is required']);
    exit;
}

$inventory = inventory::findByProductId($product_id);

if ($inventory) {
    echo json_encode(['status' => 'success', 'inventory' => $inventory]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Inventory not found']);
}
