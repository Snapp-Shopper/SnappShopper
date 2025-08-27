<?php
/**
 * @openapi
 * /products/chatgpt_search.php:
 *   post:
 *     summary: Search for products using a natural language query processed by ChatGPT
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 description: Natural language search query
 *     responses:
 *       200:
 *         description: Search results returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: [success]
 *                     query:
 *                       type: string
 *                     tags_used:
 *                       type: array
 *                       items:
 *                         type: string
 *                     results:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Product object (as returned by products::findProductById)
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: [fallback]
 *                     message:
 *                       type: string
 *                     query:
 *                       type: string
 *                     tags_used:
 *                       type: array
 *                       items:
 *                         type: string
 *                     results:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Recommended product object (as returned by products::getRecommended)
 *       400:
 *         description: Missing or invalid search query
 *       405:
 *         description: Method not allowed
 */

// Description: Searches for products using ChatGPT-processed natural language query
require_once '../../initialize.php';
require_once '../../helpers/OpenAIHelper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Only POST allowed']);
    exit;
}

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
$query = $data['query'] ?? '';

if (!$query) {
    echo json_encode(['status' => 'error', 'message' => 'Missing search query']);
    exit;
}

// === Step 1: Let ChatGPT generate search tags
$tags = OpenAIHelper::getSearchLabels($query);
if (!is_array($tags)) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to generate tags from ChatGPT']);
    exit;
}

// === Step 2: Match using tags
$matches = [];
$images = productImage::findAll();

foreach ($images as $img) {
    if (!empty($img['vision_labels'])) {
        $productLabels = explode(',', strtolower($img['vision_labels']));
        if (count(array_intersect($productLabels, $tags)) >= 2) {
            $product = products::findProductById($img['product_id']);
            if ($product) {
                $matches[$product->product_id] = $product;
            }
        }
    }
}

// === Final Output ===
if (!empty($matches)) {
    echo json_encode([
        'status' => 'success',
        'query' => $query,
        'tags_used' => $tags,
        'results' => array_values($matches)
    ]);
    exit;
}

// === Fallback: Recommend Random Products (or Top Picks)
$recommended = products::getRecommended(6); // New method: get 6 random or recent
echo json_encode([
    'status' => 'fallback',
    'message' => 'No exact matches. Showing recommended products instead.',
    'query' => $query,
    'tags_used' => $tags,
    'results' => $recommended
]);
exit;
