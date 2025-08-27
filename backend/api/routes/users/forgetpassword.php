<?php
/**
 * @openapi
 * /users/forgetpassword.php:
 *   post:
 *     summary: Forgot password
 *     description: Accepts an email address and initiates a password reset process.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - EMAIL
 *             properties:
 *               EMAIL:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: The email address of the user requesting a password reset
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - EMAIL
 *             properties:
 *               EMAIL:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset process initiated or status message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Password reset link sent
 *       400:
 *         description: Missing or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No valid data received.
 *       405:
 *         description: Method Not Allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid request method.
 */

require_once '../../initialize.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// Try to get form-data first
$data = $_POST;

// If $_POST is empty, try raw JSON input
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

if (empty($data) || empty($data['EMAIL'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No valid data received.'
    ]);
    exit;
}

// Proceed with forgot password
$response = users::forgotPassword($data['EMAIL']);
echo json_encode($response);
exit;
