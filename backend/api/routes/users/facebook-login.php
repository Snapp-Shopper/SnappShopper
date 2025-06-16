<?php
/**
 * @openapi
 * /users/facebook-login.php:
 *   post:
 *     summary: Facebook login
 *     description: Authenticates a user using a Facebook access token. If the user does not exist, a new one is created.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accessToken
 *             properties:
 *               accessToken:
 *                 type: string
 *                 example: "EAAJZCdZC9u1oMBABZCbZB..."
 *     responses:
 *       200:
 *         description: Facebook login successful
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
 *                   example: Facebook login successful
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Access token missing or email not provided
 *       500:
 *         description: Internal server error or Facebook API error
 */

require_once '../../initialize.php';
require_once '../../vendor/autoload.php'; // Facebook SDK

use Facebook\Facebook;

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Get raw JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!isset($data['accessToken'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Access token missing']);
    exit;
}

$fbAccessToken = $data['accessToken'];

try {
    $fb = new Facebook([
        'app_id' => FACEBOOK_APP_ID,
        'app_secret' => FACEBOOK_APP_SECRET,
        'default_graph_version' => 'v18.0',
    ]);

    $response = $fb->get('/me?fields=id,first_name,last_name,email', $fbAccessToken);
    $fbUser = $response->getGraphUser();

    $email = $fbUser['email'] ?? '';
    $firstName = $fbUser['first_name'] ?? '';
    $lastName = $fbUser['last_name'] ?? '';

    if (empty($email)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Email not available from Facebook']);
        exit;
    }

    $existingUser = users::findByEmail($email);

    if (!$existingUser) {
        $userData = [
            'email' => $email,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'password_hash' => '', // No password for Facebook login
            'is_verified' => 1
        ];

        $user = new users($userData);
        $user->created_at = date('Y-m-d H:i:s');
        $user->save();
    } else {
        $user = $existingUser;
    }

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

} catch (Facebook\Exceptions\FacebookResponseException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Graph error: ' . $e->getMessage()]);
    exit;

} catch (Facebook\Exceptions\FacebookSDKException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Facebook SDK error: ' . $e->getMessage()]);
    exit;

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Facebook login failed', 'error' => $e->getMessage()]);
    exit;
}
