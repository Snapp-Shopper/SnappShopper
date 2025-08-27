<?php
/**
 * @openapi
 * /reviews/submit.php:
 *   post:
 *     summary: Submit or update a product review
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - product_id
 *               - rating
 *             properties:
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               review_text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review saved successfully
 */

require_once '../../initialize.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// Parse input (JSON or form-data)
$data = $_POST;
if (empty($data)) {
    $rawInput = file_get_contents('php://input');
    // Try to decode JSON
    $decoded = json_decode($rawInput, true);
    
    if (json_last_error() === JSON_ERROR_NONE) {
        $data = $decoded;
    } else {
        // Try to auto-fix bad JSON (unquoted keys)
       $data = fixBrokenJson($rawData);
    }
}
if (empty($data)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No valid data received.'
    ]);
    exit;
}
$user_id = $data['user_id'] ?? null;
$product_id = $data['product_id'] ?? null;
$rating = $data['rating'] ?? null;
$review_text = $data['review_text'] ?? '';

if (!$user_id || !$product_id || !$rating) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

$existing = reviews::hasReviewed($user_id, $product_id);

if ($existing) {
    // Optional: Update existing review
    $existingReview = reviews::findReviewByUserAndProduct($user_id, $product_id);
    $response = $existingReview->updateReview($rating, $review_text);
} else {
    $review = new reviews([
        'user_id' => $user_id,
        'product_id' => $product_id,
        'rating' => $rating,
        'review_text' => $review_text,
        'created_at' => date('Y-m-d H:i:s')
    ]);
    $response = $review->saveReview();
}

echo json_encode($response);
