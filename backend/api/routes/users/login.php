<?php
/**
 * @openapi
 * /users/login.php:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */


    // Description: This endpoint handles user login by accepting an email and password and returning a response based on the login attempt.

    require_once '../../initialize.php';

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Content-Type: application/json');

    // Only POST allowed
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid request method.'
        ]);
        exit;
    }

    // Get form-data or JSON body
    $data = $_POST;

    if (empty($data)) {
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);
    }

    // Validate input
    if (empty($data['email']) || empty($data['password'])) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Email and password are required.'
        ]);
        exit;
    }

    // Normalize keys (in case of uppercased POST fields)
    $email = strtolower(trim($data['email']));
    $password = $data['password'];

    // Attempt login
    $response = users::login($email, $password);
    echo json_encode($response);
    exit;
