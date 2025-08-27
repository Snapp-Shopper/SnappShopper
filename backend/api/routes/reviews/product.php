<?php
/**
 * @openapi
 * /reviews/product.php:
 *   get:
 *     summary: Get all reviews for a specific product
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
 *         description: List of reviews
 */

require_once '../../initialize.php';

$product_id = $_GET['product_id'] ?? null;

if (!$product_id) {
    echo json_encode(['status' => 'error', 'message' => 'Missing product_id']);
    exit;
}

$reviews = reviews::findReviewsByProductId($product_id);

echo json_encode([
    'status' => 'success',
    'count' => count($reviews),
    'reviews' => array_map(function ($review) {
        return [
            'review_id' => $review->review_id,
            'user' => $review->getUserDetails(),
            'rating' => $review->rating,
            'review_text' => $review->review_text,
            'created_at' => $review->created_at
        ];
    }, $reviews)
]);
