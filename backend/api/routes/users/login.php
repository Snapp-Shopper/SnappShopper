<?php

require_once '../../initialize.php'; // Include the initialization file

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = $_POST;
    $response = Users::login($data['EMAIL'], $data['PASSWORD']);
    echo json_encode($response);
    exit;
}