<?php
// Description: This endpoint retrieves categories based on the category ID provided or retrieves all categories if no ID is specified.
require_once '../../initialize.php'; // Include the initialization file

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if ($_GET['category_id']) {
        # code...
        $categories = categories::findCategoryById($_GET['category_id']);

        if ($categories) {
            echo json_encode(['success' => true, 'data' => $categories]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
    else{    
        $categories = categories::findAll();

        if ($categories) {
            echo json_encode(['success' => true, 'data' => $categories]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No data found']);
        }
    }
}
?>
