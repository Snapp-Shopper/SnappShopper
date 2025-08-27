<?php
/**
 * @openapi
 * /subcategories/delete.php:
 *   post:
 *     summary: Delete a subcategory
 *     tags:
 *       - Subcategories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sub_category_id
 *             properties:
 *               sub_category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sub-category deleted successfully
 *       404:
 *         description: Sub-category not found
 */
require_once '../../initialize.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
     // Try to get form-data first
     $data = $_POST;

     // If $_POST is empty, try to decode raw JSON input
     if (empty($data)) {
         $rawData = file_get_contents('php://input');
         $data = json_decode($rawData, true);
     }

     if (empty($data)) {
         // Still empty? Then it's invalid input
         echo json_encode([
             'status' => 'error',
             'message' => 'No valid data received.'
         ]);
         exit;
     }

    $sub = subCategory::findSubById($data['sub_category_id'] ?? null);

    if (!$sub) {
        echo json_encode(['status' => 'error', 'message' => 'Sub-category not found']);
        exit;
    }

    $response = $sub->deleteSubCategory();
    echo json_encode($response);
}