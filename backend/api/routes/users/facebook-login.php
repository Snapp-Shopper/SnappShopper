<?php
require_once '../../initialize.php';
require_once '../../vendor/autoload.php'; // for Facebook SDK

use Facebook\Facebook;

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!isset($data['accessToken'])) {
    echo json_encode(['status' => 'error', 'message' => 'Access token missing']);
    exit;
}

$fbAccessToken = $data['accessToken'];

try {
    $fb = new Facebook([
        'app_id' => 'YOUR_FACEBOOK_APP_ID',
        'app_secret' => 'YOUR_FACEBOOK_APP_SECRET',
        'default_graph_version' => 'v18.0',
    ]);

    // Get user info
    $response = $fb->get('/me?fields=id,first_name,last_name,email', $fbAccessToken);
    $fbUser = $response->getGraphUser();

    $email = $fbUser['email'] ?? '';
    $firstName = $fbUser['first_name'] ?? '';
    $lastName = $fbUser['last_name'] ?? '';

    if (!$email) {
        echo json_encode(['status' => 'error', 'message' => 'Email not available from Facebook']);
        exit;
    }

    $existingUser = users::findByEmail($email);

    if (!$existingUser) {
        // Register new user
        $userData = [
            'email' => $email,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'password_hash' => '', // Facebook login — no password
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
        'message' => 'Facebook login successful',
        'user' => $user,
        'token' => $jwt
    ]);
    exit;

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Facebook login failed', 'error' => $e->getMessage()]);
    exit;
}
