<?php

require_once '../../initialize.php'; // Include the initialization file

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if ($_GET['category_id']) {
        # code...
        $categories = Categories::findCategoryById($_GET['category_id']);

        if ($categories) {
            echo json_encode(['success' => true, 'data' => $categories]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
    else{    
        $categories = Categories::findAll();

        if ($categories) {
            echo json_encode(['success' => true, 'data' => $categories]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
}
?>
