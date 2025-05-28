<?php
// Description: This endpoint handles Apple login by verifying the identity token received from the client.
require_once '../../initialize.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\JWK;

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!isset($data['identity_token'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing Apple identity token']);
    exit;
}

$identityToken = $data['identity_token'];

try {
    // Step 1: Fetch Apple public keys
    $appleKeyUrl = 'https://appleid.apple.com/auth/keys';
    $appleKeys = json_decode(file_get_contents($appleKeyUrl), true);

    // Step 2: Decode & verify JWT with Apple public keys
    $decodedToken = JWT::decode($identityToken, JWK::parseKeySet($appleKeys), ['RS256']);

    $email = $decodedToken->email ?? null;
    $userId = $decodedToken->sub ?? null;

    if (!$email || !$userId) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid Apple token']);
        exit;
    }

    // Optional: first/last name can be sent separately from frontend
    $firstName = $data['first_name'] ?? '';
    $lastName = $data['last_name'] ?? '';

    $existingUser = users::findByEmail($email);

    if (!$existingUser) {
        // New user → register
        $userData = [
            'email' => $email,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'password_hash' => '',
            'is_verified' => 1
        ];
        $user = new users($userData);
        $user->created_at = date('Y-m-d H:i:s');
        $user->save();
    } else {
        $user = $existingUser;
    }

    // Generate JWT for your app
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
    echo json_encode(['status' => 'error', 'message' => 'Apple login failed', 'error' => $e->getMessage()]);
    exit;
}
