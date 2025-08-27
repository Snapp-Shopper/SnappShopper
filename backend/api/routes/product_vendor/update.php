<?php
/**
 * @openapi
 * /product_vendor/update.php:
 *   post:
 *     summary: Update an existing product vendor association
 *     tags:
 *       - ProductVendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_vendor_id
 *             properties:
 *               product_vendor_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               vendor_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product vendor association updated successfully
 *       400:
 *         description: Invalid data provided
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
if (!$data || empty($data['product_vendor_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'product_vendor_id is required']);
    exit;
}

$productVendor = new productVendor([
    'product_vendor_id' => $data['product_vendor_id'] ?? null,
    'product_id' => $data['product_id'] ?? null,
    'vendor_id' => $data['vendor_id'] ?? null
]);

$response = $productVendor->updateProductVendor();

echo json_encode($response);
?>
