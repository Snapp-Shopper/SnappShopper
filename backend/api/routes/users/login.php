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
        $rawInput = file_get_contents('php://input');
        // Try to decode JSON
        $decoded = json_decode($rawInput, true);
        
        if (json_last_error() === JSON_ERROR_NONE) {
            $data = $decoded;
        } else {
            // Try to auto-fix bad JSON (unquoted keys)
        $data = fixBrokenJson($rawData);
        }
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
