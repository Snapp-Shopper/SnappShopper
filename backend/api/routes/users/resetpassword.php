<?php
/**
 * @openapi
 * /users/resetpassword.php:
 *   post:
 *     summary: Reset password
 *     description: Resets a user's password using a valid reset token and a new password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - new_password
 *             properties:
 *               token:
 *                 type: string
 *                 example: abcd1234resetToken
 *               new_password:
 *                 type: string
 *                 format: password
 *                 example: newSecurePassword123
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - new_password
 *             properties:
 *               token:
 *                 type: string
 *                 example: abcd1234resetToken
 *               new_password:
 *                 type: string
 *                 format: password
 *                 example: newSecurePassword123
 *     responses:
 *       200:
 *         description: Password successfully reset
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
 *                   example: Password has been updated
 *       400:
 *         description: Invalid input or token
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
 *                   example: Invalid token or missing data
 *       405:
 *         description: Method not allowed
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

// If form-data is empty, try raw JSON input
if (empty($data)) {
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);
}

if (empty($data) || empty($data['token']) || empty($data['new_password'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No valid data received.'
    ]);
    exit;
}

// Proceed with reset password
$response = users::resetPassword($data['token'], $data['new_password']);
echo json_encode($response);
exit;
