<?php
/**
 * @openapi
 * /users/apple-login.php:
 *   post:
 *     summary: Apple login
 *     description: Authenticates a user using an Apple identity token. Registers the user if not already present.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identity_token
 *             properties:
 *               identity_token:
 *                 type: string
 *                 description: Identity token from Apple Sign-In
 *               first_name:
 *                 type: string
 *                 description: User's first name (optional, usually provided on first sign-in)
 *               last_name:
 *                 type: string
 *                 description: User's last name (optional, usually provided on first sign-in)
 *     responses:
 *       200:
 *         description: Apple login successful
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
 *                   example: Apple login successful
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Missing or invalid identity token
 *       500:
 *         description: Internal error or verification failure
 */

require_once '../../initialize.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\JWK;

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Parse JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!isset($data['identity_token'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing Apple identity token']);
    exit;
}

$identityToken = $data['identity_token'];

try {
    // Step 1: Fetch Apple public keys
    $appleKeys = json_decode(file_get_contents(APPLE_KEY_URL), true);

    // Step 2: Decode and verify identity token
    $decodedToken = JWT::decode($identityToken, JWK::parseKeySet($appleKeys), ['RS256']);

    $email = $decodedToken->email ?? null;
    $userId = $decodedToken->sub ?? null;

    if (!$email || !$userId) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid Apple token']);
        exit;
    }

    $firstName = $data['first_name'] ?? '';
    $lastName = $data['last_name'] ?? '';

    $existingUser = users::findByEmail($email);

    if (!$existingUser) {
        // Create new user
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

    // Generate token
    $tokenData = [
        'user_id' => $user->user_id,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name
    ];
    $jwt = JWT::generateToken($tokenData);

    echo json_encode([
        'status' => 'success',
        'message' => 'Apple login successful',
        'user' => $user,
        'token' => $jwt
    ]);
    exit;

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Apple login failed', 'error' => $e->getMessage()]);
    exit;
}
