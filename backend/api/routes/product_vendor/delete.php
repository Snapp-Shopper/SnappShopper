<?php
/**
 * @openapi
 * /product_vendor/delete.php:
 *   get:
 *     summary: Delete a product vendor association
 *     tags:
 *       - ProductVendor
 *     parameters:
 *       - name: product_vendor_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product vendor association deleted successfully
 *       400:
 *         description: Invalid product_vendor_id provided
 */
require_once '../../initialize.php';

$product_vendor_id = $_GET['product_vendor_id'] ?? null;

if (!$product_vendor_id) {
    echo json_encode(['status' => 'error', 'message' => 'Product Vendor ID is required']);
    exit;
}

$deleted = productVendor::deleteById($product_vendor_id);

echo json_encode($deleted
    ? ['status' => 'success', 'message' => 'Deleted successfully']
    : ['status' => 'error', 'message' => 'Failed to delete']
);
?>
