<?php
/**
 * @openapi
 * /categories/save.php:
 *   post:
 *     summary: Save a new category
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *     responses:
 *       200:
 *         description: Category saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Category saved successfully.
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Validation failed
 */


require_once '../../initialize.php'; // Include the initialization file

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
     // Try to get form-data first
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

     if (empty($data)) {
         // Still empty? Then it's invalid input
         echo json_encode([
             'status' => 'error',
             'message' => 'No valid data received.'
         ]);
         exit;
     }

    $categories = new categories();
    $response = $categories::saveCategory($data);
    echo json_encode($response);
    exit;
}
