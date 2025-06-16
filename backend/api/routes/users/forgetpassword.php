<?php
/**
 * @openapi
 * /users/forgotpassword.php:
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

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

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
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);
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
