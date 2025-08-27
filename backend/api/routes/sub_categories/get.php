<?php
/**
 * @openapi
 * /subcategories/get.php:
 *   get:
 *     summary: Get subcategories by category ID or subcategory ID
 *     tags:
 *       - Subcategories
 *     parameters:
 *       - in: query
 *         name: category_id
 *         required: false
 *         schema:
 *           type: integer
 *         description: Category ID to filter subcategories
 *       - in: query
 *         name: sub_category_id
 *         required: false
 *         schema:
 *           type: integer
 *         description: Specific subcategory ID to fetch
 *     responses:
 *       200:
 *         description: List of subcategories or specific subcategory
 *       404:
 *         description: Subcategory not found
 */
require_once '../../initialize.php';

$categoryId = $_GET['category_id'] ?? null;
$subId = $_GET['sub_category_id'] ?? null;

if ($subId) {
    $subcategory = subCategory::findSubById($subId);
    if ($subcategory) {
        echo json_encode(['status' => 'success', 'subcategory' => $subcategory]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Subcategory not found']);
    }
} elseif ($categoryId) {
    $list = subCategory::findByCategoryId($categoryId);
    echo json_encode(['status' => 'success', 'subcategories' => $list]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No valid parameter provided.']);
}