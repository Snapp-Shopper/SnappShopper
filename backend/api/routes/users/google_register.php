<?php
require_once '../../initialize.php'; // your setup file
require_once '../../vendor/autoload.php'; // for Google client (if using Composer)


header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

if (!isset($data['token'])) {
    echo json_encode(['status' => 'error', 'message' => 'No token provided']);
    exit;
}

$token = $data['token'];

try {
    // Validate token with Google
    $client = new \Google_Client(['client_id' => 'YOUR_GOOGLE_CLIENT_ID']);
    $payload = $client->verifyIdToken($token);

    if ($payload) {
        $email = $payload['email'];
        $firstName = $payload['given_name'] ?? '';
        $lastName = $payload['family_name'] ?? '';

        $existingUser = users::findByEmail($email);

        if (!$existingUser) {
            // New user → Register them
            $userData = [
                'email' => $email,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'password_hash' => '', // No password required for Google login
                'is_verified' => 1
            ];

            $user = new users($userData);
            $user->created_at = date('Y-m-d H:i:s');
            $user->save();
        } else {
            $user = $existingUser;
        }

        // Generate JWT
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
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid Google token']);
        exit;
    }

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Token validation failed', 'error' => $e->getMessage()]);
    exit;
}
