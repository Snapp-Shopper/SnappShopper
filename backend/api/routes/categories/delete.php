<?php
/**
 * @openapi
 * /categories/delete.php:
 *   delete:
 *     summary: Permanently delete a category
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: query
 *         name: category_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to delete
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
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Category permanently deleted
 *       400:
 *         description: Missing or invalid category_id
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
 *                   example: Invalid category ID
 *       500:
 *         description: Server error during deletion
 */

require_once '../../initialize.php';
// Description: This endpoint deletes a category based on the category ID provided.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     // If $_POST is empty, try to decode raw JSON input
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
