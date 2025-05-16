<?php

require_once '../../initialize.php'; // Include the initialization file

require_once '../../src/header.php'; // Include the header model

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

    // Proceed with creation of address
        
    // Create Address instance from POST data
    $address = new address([
        'user_id'        => $data['user_id'] ?? null,
        'address_line1'  => $data['address_line1'] ?? '',
        'address_line2'  => $data['address_line2'] ?? '',
        'city'           => $data['city'] ?? '',
        'state'          => $data['state'] ?? '',
        'zip_code'       => $data['zip_code'] ?? '',
        'country'        => $data['country'] ?? '',
        'is_default'     => $data['is_default'] ?? false,
        'created_at'     => date('Y-m-d H:i:s')
    ]);

    // Save address
    $response = $address->saveAddress();

    // If address is to be set as default
    if ($response['status'] === 'success' && $address->is_default) {
        $address->setDefaultAddress(); // Will automatically update others to non-default
    }

    // Return response
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