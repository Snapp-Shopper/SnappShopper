<?php
/**
 * @openapi
 * /product_vendor/create.php:
 *   post:
 *     summary: Create a new product vendor association
 *     tags:
 *       - ProductVendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - vendor_id
 *             properties:
 *               product_id:
 *                 type: integer
 *               vendor_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product vendor association created successfully
 *       400:
 *         description: Invalid data provided
 */
require_once '../../initialize.php';

// Get JSON input
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
if (!$data || empty($data['product_id']) || empty($data['vendor_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'product_id and vendor_id are required']);
    exit;
}

$productVendor = new productVendor([
    'product_id' => $data['product_id'] ?? null,
    'vendor_id' => $data['vendor_id'] ?? null,
    'created_at' => date('Y-m-d H:i:s')
]);

$response = $productVendor->saveProductVendor();

echo json_encode($response);
?>
