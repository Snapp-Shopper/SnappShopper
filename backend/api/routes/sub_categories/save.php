<?php
/**
 * @openapi
 * /subcategories/save.php:
 *   post:
 *     summary: Save a new subcategory
 *     tags:
 *       - Subcategories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sub-category saved successfully
 *       400:
 *         description: Validation failed
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

    $subCategory = new subCategory($data);
    $response = $subCategory->saveSubCategory();
    echo json_encode($response);
    }