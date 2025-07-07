<?php
/**
 * @openapi
 * /subcategories/update.php:
 *   post:
 *     summary: Update the name of an existing subcategory
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
 *               - name
 *             properties:
 *               sub_category_id:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sub-category updated successfully
 *       404:
 *         description: Sub-category not found
 */
require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

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

    $success = $sub->updateName($data['name']);
    echo json_encode(
        $success
            ? ['status' => 'success', 'message' => 'Sub-category updated']
            : ['status' => 'error', 'message' => 'Update failed']
    );
}