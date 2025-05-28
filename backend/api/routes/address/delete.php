<?php
// Description: This endpoint handles the deletion of an address by its ID.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

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

    if (empty($data['address_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'address_id is required']);
        exit;
    }

    $address = address::findAddressById($data['address_id']);
    if (!$address) {
        echo json_encode(['status' => 'error', 'message' => 'Address not found']);
        exit;
    }

    $response = $address->addressDelete();
    echo json_encode($response);
    exit;
}
