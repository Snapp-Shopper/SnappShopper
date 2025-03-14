<?php

require_once '../../initialize.php'; // Include the initialization file

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if ($_GET['user_id']) {
        # code...
        $users = Users::findById($_GET['user_id']);

        if ($users) {
            echo json_encode(['success' => true, 'users' => $users]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
    else{    
        $users = Users::findAll();

        if ($users) {
            echo json_encode(['success' => true, 'users' => $users]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
}
?>
