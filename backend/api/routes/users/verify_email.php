<?php
/**
 * @openapi
 * /users/verify_email.php:
 *   get:
 *     summary: Verify email
 *     description: Verifies a user's email address by validating a token sent via email.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token sent to the user's email
 *     responses:
 *       200:
 *         description: Email verified successfully
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
 *                   example: Email verified successfully
 *       400:
 *         description: Token not provided or invalid
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
 *                   example: No token provided
 *       404:
 *         description: Invalid or expired token
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
 *                   example: Invalid or expired token
 *       500:
 *         description: Failed to update verification status
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
 *                   example: Verification failed
 */

require_once '../../initialize.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit;
}

if (!isset($_GET['token']) || empty($_GET['token'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No token provided']);
    exit;
}

$token = $_GET['token'];
$user = users::findByToken($token);

if (!$user) {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'Invalid or expired token']);
    exit;
}

$user->is_verified = 1;
$user->verification_token = null;

if ($user->save()) {
    echo json_encode(['status' => 'success', 'message' => 'Email verified successfully']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Verification failed']);
}
