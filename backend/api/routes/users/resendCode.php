<?php
// resendCode.php
// Description: Resends a new verification code to the user's email.

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

if (empty($data['email'])) {
    echo json_encode(['status' => 'error', 'message' => 'Email is required.']);
    exit;
}

$response = users::resendToken($data['email']);
echo json_encode($response);
exit;