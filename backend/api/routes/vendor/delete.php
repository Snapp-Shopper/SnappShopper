<?php
/**
 * @openapi
 * /vendor/delete.php:
 *   delete:
 *     summary: Delete a vendor
 *     tags:
 *       - Vendor
 *     parameters:
 *       - name: vendor_id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
 *       400:
 *         description: Invalid vendor_id provided
 */
require_once '../../initialize.php';

// Allow only DELETE or POST
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method. Only DELETE or POST allowed.'
    ]);
    exit;
}

// Get data from body (for DELETE we read php://input)
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

// Vendor ID is required
if (empty($data['vendor_id'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Vendor ID is required']);
    exit;
}

// Find vendor
$vendor = Vendor::findVendorById($data['vendor_id']);
if (!$vendor) {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'Vendor not found']);
    exit;
}

// Delete vendor
if (Vendor::deleteById($vendor->vendor_id)) {
    // Log action
    auditLog::audit($vendor->vendor_id, 'delete_vendor', "Vendor ID {$vendor->vendor_id} deleted");
    echo json_encode(['status' => 'success', 'message' => 'Vendor deleted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete vendor']);
}
