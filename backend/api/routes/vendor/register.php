<?php
/**
 * @openapi
 * /vendor/register.php:
 *   post:
 *     summary: Register a new vendor
 *     tags:
 *       - Vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone_number
 *               - state
 *               - country
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
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
 *         description: Vendor registered successfully
 *       400:
 *         description: Missing or invalid data
 */

require_once '../../initialize.php';
require_once '../../src/header.php'; // CORS + JSON headers

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method. Only POST allowed.'
    ]);
    exit;
}

// Get input JSON
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

// Validate input
$required = ['name', 'email', 'password', 'phone_number', 'state', 'country'];
$missing = array_filter($required, fn($field) => empty($data[$field]));

if (!empty($missing)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required fields: ' . implode(', ', $missing)
    ]);
    exit;
}

// Check if vendor already exists
$existingVendor = Vendor::findByEmail($data['email']);
if ($existingVendor) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Email already exists'
    ]);
    exit;
}

// Hash password
$passwordHash = new passwordHash();
$data['password_hash'] = $passwordHash->hash($data['password']);
unset($data['password']); // Remove raw password

// Create vendor instance
$vendor = new Vendor($data);
$vendor->created_at = date('Y-m-d H:i:s');
$vendor->updated_at = date('Y-m-d H:i:s');

// Validate
$errors = $vendor->validate();
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

// Save vendor
if ($vendor->save()) {
    auditLog::audit($vendor->vendor_id, 'register_vendor', "Vendor registered with email {$vendor->email}");
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Vendor registered successfully',
        'vendor_id' => $vendor->vendor_id
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to register vendor'
    ]);
}
exit;
