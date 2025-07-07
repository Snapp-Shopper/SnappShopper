<?php
/**
 * @openapi
 * /products/get_products.php:
 *   get:
 *     summary: Retrieve products with optional filters
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Filter products by category ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search products by name
 *       - in: query
 *         name: product_id
 *         schema:
 *           type: integer
 *         description: Fetch a single product by ID
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
 *       400:
 *         description: Invalid input or no product found
 *       500:
 *         description: Server error
 */

require_once '../../initialize.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    $categoryId = $_GET['category_id'] ?? null;
    $nameSearch = $_GET['name'] ?? null;
    $productId  = $_GET['product_id'] ?? null;

    if (!empty($productId)) {
        $product = products::findProductById($productId);
        if ($product) {
            echo json_encode(['status' => 'success', 'product' => $product]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Product not found.']);
        }
        exit;
    }

    if (!empty($categoryId)) {
        $products = products::findProductsByCategory($categoryId);
    } else {
        $products = products::allProducts();
    }

    if (!empty($nameSearch)) {
        $products = array_filter($products, function ($p) use ($nameSearch) {
            $name = is_array($p) ? $p['name'] : $p->name;
            return stripos($name, $nameSearch) !== false;
        });
    }

    echo json_encode([
        'status' => 'success',
        'products' => array_values($products)
    ]);
} catch (Exception $e) {
    error_log("Product fetch error: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Server error']);
}
