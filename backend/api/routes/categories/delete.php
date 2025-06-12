<?php
/**
 * @openapi
 * /categories/delete.php:
 *   post:
 *     summary: Delete a category by ID
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *             properties:
 *               category_id:
 *                 type: string
 *                 description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing or invalid category_id
 *       404:
 *         description: Category not found
 */

// Description: This endpoint deletes a category based on the category ID provided.
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
