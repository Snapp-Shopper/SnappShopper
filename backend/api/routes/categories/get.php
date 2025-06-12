<?php
/**
 * @openapi
 * /categories/get.php:
 *   get:
 *     summary: Retrieve categories by ID or all categories if no ID is provided
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: false
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     data:
 *                       type: object
 *                       description: Single category object
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                       description: List of all categories
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: No data found
 */

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
