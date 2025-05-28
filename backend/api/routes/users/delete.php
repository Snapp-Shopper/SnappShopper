<?php
// Description: This endpoint deletes a user based on the user ID provided.
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

    if (empty($data['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'user_id is required']);
        exit;
    }

    $user = users::findUserById($data['user_id']);
    if (!$user) {
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
        exit;
    }

    $response = $user->userDelete();
    echo json_encode($response);
    exit;
}
