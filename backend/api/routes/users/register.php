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
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Missing or invalid data
 */

// Description: This endpoint handles user registration by accepting user info and returning a status message.

require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// Parse input (JSON or form-data)
$data = $_POST;

if (empty($data)) {
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);
}

if (empty($data)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No valid data received.'
    ]);
    exit;
}

// Validate required fields
if (empty($data['email']) || empty($data['password'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Email and password are required.'
    ]);
    exit;
}

// Register the user
$response = users::register($data);

// Return the response
echo json_encode($response);
exit;
