<?php
// Description: This endpoint retrieves users based on the user ID provided or retrieves all users if no ID is specified.
require_once '../../initialize.php'; // Include the initialization file

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if ($_GET['user_id']) {
        # code...
        $users = users::findUserById($_GET['user_id']);

        if ($users) {
            echo json_encode(['success' => true, 'data' => $users]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
    else{    
        $users = users::findAll();

        if ($users) {
            echo json_encode(['success' => true, 'data' => $users]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
}
?>
