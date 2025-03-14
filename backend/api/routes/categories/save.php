<?php

require_once '../../initialize.php'; // Include the initialization file

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = $_POST;

    if ($data === null) {
        // Handle invalid JSON
        echo json_encode(['status' => 'error', 'message' => 'Invalid data input']);
        exit;
    }
    $categories = new Categories($data);
    $response = $categories::saveCategory();
     echo json_encode($response);
     exit;
}
