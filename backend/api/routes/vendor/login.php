<?php
/**
 * @openapi
 * /vendor/login.php:
 *   post:
 *     summary: Vendor login
 *     tags:
 *       - Vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing or invalid data
 */

require_once '../../initialize.php';
require_once '../../src/header.php'; // CORS + JSON headers

// Only allow POST requests
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
if (empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Email and password are required.'
    ]);
    exit;
}

// Attempt vendor login
$response = Vendor::login($data['email'], $data['password']);

// Return result
if ($response['status'] === 'success') {
    http_response_code(200);
} else {
    http_response_code(401); // Unauthorized
}
echo json_encode($response);
exit;
