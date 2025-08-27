<?php
/**
 * @openapi
 * /products/external_image_search.php:
 *   post:
 *     summary: Search external products using an image (Google Vision + SerpAPI)
 *     description: Accepts an uploaded image or image URL, extracts visual labels with Google Vision, and queries Google Shopping via SerpAPI.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               search_image:
 *                 type: string
 *                 format: binary
 *                 description: User-uploaded image to scan
 *               image_url:
 *                 type: string
 *                 format: uri
 *                 description: URL of image to scan (alternative to file upload)
 *     responses:
 *       200:
 *         description: Matching external products returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 query:
 *                   type: string
 *                   example: red nike sneakers
 *                 labels:
 *                   type: array
 *                   items:
 *                     type: string
 *                 source:
 *                   type: string
 *                   enum: [upload, url]
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       price:
 *                         type: string
 *                       link:
 *                         type: string
 *                       thumbnail:
 *                         type: string
 *       400:
 *         description: No valid image provided
 *       500:
 *         description: API key or connection error
 */


require_once '../../initialize.php';
require_once '../../../vendor/autoload.php';

use Google\Cloud\Vision\V1\ImageAnnotatorClient;

// Load image (file or URL)
$imageData = null;
$imageSource = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
    if (isset($_FILES['search_image']) && $_FILES['search_image']['error'] === UPLOAD_ERR_OK) {
        $imageData = file_get_contents($_FILES['search_image']['tmp_name']);
        $imageSource = 'upload';
    } elseif (!empty($data['image_url']) && filter_var($data['image_url'], FILTER_VALIDATE_URL)) {
        $imageData = @file_get_contents($data['image_url']);
        $imageSource = 'url';
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No valid image provided']);
        exit;
    }

    // Step 1: Google Vision label detection
    $vision = new ImageAnnotatorClient([
        'credentials' => GOOGLE_CREDENTIALS
    ]);

    $response = $vision->labelDetection($imageData);
    $annotations = $response->getLabelAnnotations();

    if (empty($annotations)) {
        echo json_encode(['status' => 'error', 'message' => 'No labels detected']);
        exit;
    }

    $labels = array_map(fn($label) => $label->getDescription(), $annotations);
    $searchQuery = implode(' ', array_slice($labels, 0, 3));

    // Step 2: Query SerpAPI
    $serpApiKey = SERPAPI_KEY; // define in your secrets
    $serpUrl = "https://serpapi.com/search.json?q=" . urlencode($searchQuery) . "&tbm=shop&api_key=$serpApiKey";

    $serpResponse = file_get_contents($serpUrl);
    $serpData = json_decode($serpResponse, true);

    if (isset($serpData['shopping_results'])) {
        echo json_encode([
            'status' => 'success',
            'labels' => $labels,
            'query' => $searchQuery,
            'source' => $imageSource,
            'results' => $serpData['shopping_results']
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No external products found']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Only POST allowed']);
}
