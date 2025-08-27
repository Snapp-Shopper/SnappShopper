<?php
/**
 * @openapi
 * /products/by-subcategory.php:
 *   get:
 *     summary: Get products under a specific subcategory
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: sub_category_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the subcategory to fetch products from
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No products found
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
 *                   example: No products found for this subcategory.
 */

// Description: Returns products that belong to the given sub_category_id (used as category_id in products)

require_once '../../initialize.php';

$subCategoryId = $_GET['sub_category_id'] ?? null;

if (!$subCategoryId || !is_numeric($subCategoryId)) {
    echo json_encode(['status' => 'error', 'message' => 'sub_category_id is required']);
    exit;
}

$products = products::findBySql("SELECT * FROM products WHERE category_id = :id", ['id' => $subCategoryId]);

if (!empty($products)) {
    echo json_encode([
        'status' => 'success',
        'products' => $products
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'No products found for this subcategory.'
    ]);
}
exit;
