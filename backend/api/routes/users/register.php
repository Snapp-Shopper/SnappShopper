<?php
/**
 * @openapi
 * /users/register.php:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Missing or invalid data
 */

require_once '../../initialize.php';

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method. Only POST allowed.'
    ]);
    exit;
}

// Handle both JSON and FormData
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

// Validate required fields
if (empty($data['email']) || empty($data['password']) || empty($data['first_name']) || empty($data['last_name'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Required fields: email, password, first_name, last_name'
    ]);
    exit;
}

// Register the user
$response = users::register($data);

// Return the response
echo json_encode($response);
exit;
