<?php
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

    if (empty($data['category_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'category_id is required']);
        exit;
    }

    $category = categories::findCategoryById($data['category_id']);
    if (!$category) {
        echo json_encode(['status' => 'error', 'message' => 'Category not found']);
        exit;
    }

    $response = $category->categoryDelete(); // Assuming categoryDelete() is a method in the categories class that handles deletion
    echo json_encode($response);
    exit;
}
