<?php
/**
 * @openapi
 * /product_vendor/get-by-product.php:
 *   get:
 *     summary: Get vendor by product ID
 *     tags:
 *       - ProductVendor
 *     parameters:
 *       - name: product_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vendor found for the product
 *       400:
 *         description: Missing product_id
 */
require_once '../../initialize.php';
require_once '../../src/header.php';

$product_id = $_GET['product_id'] ?? null;

if (!$product_id) {
    echo json_encode(['status' => 'error', 'message' => 'Product ID is required']);
    exit;
}

$vendor = productVendor::findByProductId($product_id);

if ($vendor) {
    echo json_encode(['status' => 'success', 'data' => $vendor]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No vendor found for this product']);
}
?>
