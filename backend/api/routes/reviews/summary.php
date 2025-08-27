<?php
/**
 * @openapi
 * /reviews/summary.php:
 *   get:
 *     summary: Get review summary stats for a product
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: query
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review summary returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 product_id:
 *                   type: integer
 *                 total_reviews:
 *                   type: integer
 *                 average_rating:
 *                   type: number
 */

require_once '../../initialize.php';

$product_id = $_GET['product_id'] ?? null;

if (!$product_id) {
    echo json_encode(['status' => 'error', 'message' => 'Missing product_id']);
    exit;
}

$summary = reviews::getSummaryByProductId($product_id);

echo json_encode([
    'status' => 'success',
    'product_id' => (int)$product_id,
    'total_reviews' => $summary['total_reviews'],
    'average_rating' => $summary['average_rating']
]);
