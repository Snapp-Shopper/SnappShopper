<?php
// Description: This endpoint retrieves addresses for a user, either all addresses or the default address based on the user ID provided.
require_once '../../initialize.php'; // Include the initialization file

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if ($_GET['action'] == 'getDefault' && $_GET['user_id']) {
        # code...
        $address = address::findDefaultAddressByUserId($_GET['user_id']);    
        
        if ($address) {
            echo json_encode(['success' => true, 'data' => $address]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
    else if ($_GET['user_id']) {
        # code...
        $address = address::findAddressesByUserId($_GET['user_id']);

        if ($address) {
            echo json_encode(['success' => true, 'data' => $address]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
    
}
?>
