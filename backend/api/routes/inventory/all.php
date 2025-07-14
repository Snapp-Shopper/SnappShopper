<?php
/**
 * @openapi
 * /inventory/all.php:
 *   get:
 *     summary: Get all inventory records
 *     tags:
 *       - Inventory
 *     responses:
 *       200:
 *         description: List of inventory records
 */
require_once '../../initialize.php';
header('Content-Type: application/json');

$all = inventory::allInventory();

echo json_encode([
    'status' => 'success',
    'records' => $all
]);
