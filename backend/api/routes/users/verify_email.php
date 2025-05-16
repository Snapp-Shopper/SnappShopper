<?php
require_once '../../initialize.php';

header('Content-Type: application/json');

if (!isset($_GET['token'])) {
    echo json_encode(['status' => 'error', 'message' => 'No token provided']);
    exit;
}

$token = $_GET['token'];
$user = users::findByToken($token);

if (!$user) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid or expired token']);
    exit;
}

$user->is_verified = 1;
$user->verification_token = null;

if ($user->save()) {
    echo json_encode(['status' => 'success', 'message' => 'Email verified successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Verification failed']);
}
