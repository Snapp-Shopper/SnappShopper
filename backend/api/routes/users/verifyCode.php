<?php
// verifycode.php
// Description: Verifies a user's email using a code sent via email.

require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// Parse input (JSON or form-data)
$data = $_POST;

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

if (empty($data['email']) || empty($data['code'])) {
    echo json_encode(['status' => 'error', 'message' => 'Email and verification code are required.']);
    exit;
}

$response = users::verifyCode($data['email'], $data['code']);
echo json_encode($response);
exit;