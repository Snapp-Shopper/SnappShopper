<?php
/**
 * @openapi
 * /users/google_register.php:
 *   post:
 *     summary: Google login
 *     description: Authenticates a user using a Google ID token. If the user doesn't exist, they are registered.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Google ID token obtained after login
 *     responses:
 *       200:
 *         description: Google login successful
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
 *                   example: Google login successful
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid input or token
 *       500:
 *         description: Internal server error
 */

require_once '../../initialize.php'; // Initialization
require_once '../../vendor/autoload.php'; // Google SDK

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

if (!isset($data['token'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No token provided']);
    exit;
}

$token = $data['token'];

try {
    // Validate token with Google
    $client = new \Google_Client(['client_id' => GOOGLE_CLIENT_ID]); // Must match frontend client
    $payload = $client->verifyIdToken($token);

    if (!$payload) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid Google token']);
        exit;
    }

    $email = $payload['email'];
    $firstName = $payload['given_name'] ?? '';
    $lastName = $payload['family_name'] ?? '';

    $existingUser = users::findByEmail($email);

    if (!$existingUser) {
        // Register new user
        $user = new users([
            'email' => $email,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'password_hash' => '',
            'is_verified' => 1
        ]);
        $user->created_at = date('Y-m-d H:i:s');
        $user->save();
    } else {
        $user = $existingUser;
    }

    // Generate token for app use
    $tokenData = [
        'user_id' => $user->user_id,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name
    ];
    $jwt = JWT::generateToken($tokenData);

    echo json_encode([
        'status' => 'success',
        'message' => 'Google login successful',
        'user' => $user,
        'token' => $jwt
    ]);
    exit;

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Token validation failed',
        'error' => $e->getMessage()
    ]);
    exit;
}
