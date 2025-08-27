<?php
/**
 * @openapi
 * /categories/get.php:
 *   get:
 *     summary: Retrieve all categories or a specific category by ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID of a specific category to fetch
 *     responses:
 *       200:
 *         description: Categories data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     category:
 *                       type: object
 *       404:
 *         description: Category not found
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
 *                   example: Category not found
 */

// Description: Retrieves all categories or a specific category by ID

require_once '../../initialize.php';

$categoryId = $_GET['id'] ?? null;

if ($categoryId) {
    $category = categories::findCategoryById($categoryId);
    if ($category) {
        echo json_encode([
            'status' => 'success',
            'category' => $category
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Category not found'
        ]);
    }
} else {
    $all = categories::allCategories();
    echo json_encode([
        'status' => 'success',
        'categories' => $all
    ]);
}

exit;
