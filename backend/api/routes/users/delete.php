<?php
/**
 * @openapi
 * /users/delete.php:
 *   post:
 *     summary: Delete a user
 *     description: Deletes a user based on the provided user ID. Accepts either form-data or raw JSON.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user to delete
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted or operation result
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
 *                   example: User deleted successfully
 *       400:
 *         description: Invalid input or user not found
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
 *                   example: user_id is required
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
 *                   example: Method Not Allowed
 */

require_once '../../initialize.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$data = $_POST;

// If form-data is empty, try JSON input
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

if (empty($data['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'user_id is required']);
    exit;
}

$user = users::findUserById($data['user_id']);
if (!$user) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit;
}

$response = $user->userDelete();
echo json_encode($response);
exit;
