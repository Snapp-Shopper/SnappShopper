<?php
// Description: This endpoint handles forgot password requests by accepting an email address and processing the request.
require_once '../../initialize.php'; // Include the initialization file

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Try to get form-data first
    $data = $_POST;

    // If $_POST is empty, try to decode raw JSON input
    if (empty($data)) {
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true); // true = return associative arrayging line to check the raw data
    }

    if (empty($data)) {
        // Still empty? Then it's invalid input
        echo json_encode([
            'status' => 'error',
            'message' => 'No valid data received.'
        ]);
        exit;
    }

    // Proceed with forgot password

    $response = users::forgotPassword($data['EMAIL']);
    echo json_encode($response);
    exit;
}
else {
    // If not a POST request, reject it
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}