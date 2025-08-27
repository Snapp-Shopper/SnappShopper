<?php
/**
 * @openapi
 * /vendor/update.php:
 *   post:
 *     summary: Update vendor profile
 *     tags:
 *       - Vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vendor_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               address:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vendor updated successfully
 */
require_once '../../initialize.php';

// Allow only POST or PUT
if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method. Only POST or PUT allowed.']);
    exit;
}

// Get request payload
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

// Validate vendor_id
if (empty($data['vendor_id'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Vendor ID is required']);
    exit;
}

// Create vendor object
$vendor = new Vendor([
    'vendor_id' => $data['vendor_id'],
    'name' => $data['name'] ?? null,
    'email' => $data['email'] ?? null,
    'phone_number' => $data['phone_number'] ?? null,
    'address' => $data['address'] ?? null,
    'state' => $data['state'] ?? null,
    'country' => $data['country'] ?? null
]); 
// Update vendor profile
$response = $vendor->updateVendor();
echo json_encode($response);
exit;
