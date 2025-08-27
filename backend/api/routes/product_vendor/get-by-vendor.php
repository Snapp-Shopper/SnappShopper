<?php
/**
 * @openapi
 * /product_vendor/get-by-vendor.php:
 *   get:
 *     summary: Get product by vendor ID
 *     tags:
 *       - ProductVendor
 *     parameters:
 *       - name: vendor_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found for the vendor
 *       400:
 *         description: Missing vendor_id
 */
require_once '../../initialize.php';

$vendor_id = $_GET['vendor_id'] ?? null;

if (!$vendor_id) {
    echo json_encode(['status' => 'error', 'message' => 'Vendor ID is required']);
    exit;
}

$product = productVendor::findByVendorId($vendor_id);

if ($product) {
    echo json_encode(['status' => 'success', 'data' => $product]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No product found for this vendor']);
}
?>
