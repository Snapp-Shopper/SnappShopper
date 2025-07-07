<?php
/**
 * @openapi
 * /users/change_password.php:
 *   post:
 *     summary: Change user password
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - old_password
 *               - new_password
 *             properties:
 *               user_id:
 *                 type: integer
 *               old_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Missing fields or invalid input
 *       401:
 *         description: Invalid old password
 *       500:
 *         description: Failed to update password
 */

require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['user_id']) || empty($data['old_password']) || empty($data['new_password'])) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

// Proceed with user update
$response = users::changePassword($$data['user_id'], $data['old_password'], $data['new_password']);
echo json_encode($response);    
exit;
