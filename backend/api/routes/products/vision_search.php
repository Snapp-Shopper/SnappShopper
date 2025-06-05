<?php
// Description: This endpoint scans a user-uploaded image or URL using Google Vision API and matches labels/similar products

require_once '../../initialize.php';
require_once '../../vendor/autoload.php'; // Google Cloud Vision library

use Google\Cloud\Vision\V1\ImageAnnotatorClient;

// Helper: Check if two tag lists have overlap
function labelsMatch($storedLabels, $searchLabels, $threshold = 2) {
    $storedArray = explode(',', strtolower($storedLabels));
    $overlap = array_intersect($storedArray, $searchLabels);
    return count($overlap) >= $threshold;
}

// Handle only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Only POST allowed.']);
    exit;
}

// === 1. Determine Input Source ===
$imageData = null;
$imageSourceType = null;

if (isset($_FILES['search_image']) && $_FILES['search_image']['error'] === UPLOAD_ERR_OK) {
    $imageData = file_get_contents($_FILES['search_image']['tmp_name']);
    $imageSourceType = 'upload';
} elseif (!empty($_POST['image_url']) && filter_var($_POST['image_url'], FILTER_VALIDATE_URL)) {
    $imageData = @file_get_contents($_POST['image_url']);
    if ($imageData !== false) {
        $imageSourceType = 'url';
    }
}

if (!$imageData) {
    echo json_encode(['status' => 'error', 'message' => 'No valid image source provided (file or URL).']);
    exit;
}

// === 2. Run Google Vision Analysis ===
$vision = new ImageAnnotatorClient([
    'credentials' => GOOGLE_CREDENTIALS
]);
if (!defined('GOOGLE_CREDENTIALS')) {
    http_response_code(500);
    exit('Google credentials not configured.');
}

// === Visual Matching (Web Detection) ===
$response = $vision->webDetection($imageData);
$webDetection = $response->getWebDetection();
$similarMatches = [];

if ($webDetection && $webDetection->getVisuallySimilarImages()) {
    $similarImages = $webDetection->getVisuallySimilarImages();
    $allImages = productImage::findAll();

    foreach ($allImages as $img) {
        foreach ($similarImages as $googleImg) {
            if (similar_text($googleImg->getUrl(), $img['image_url']) > 70) {
                $product = products::findProductById($img['product_id']);
                if ($product) {
                    $similarMatches[$product->product_id] = $product;
                }
            }
        }
    }
}

// === Label Matching ===
$labelResponse = $vision->labelDetection($imageData);
$labels = $labelResponse->getLabelAnnotations();

$searchTags = [];
foreach ($labels as $label) {
    $searchTags[] = strtolower($label->getDescription());
}

$tagMatches = [];
$taggedImages = productImage::findAll();

foreach ($taggedImages as $img) {
    if (!empty($img['vision_labels']) && labelsMatch($img['vision_labels'], $searchTags)) {
        $product = products::findProductById($img['product_id']);
        if ($product) {
            $tagMatches[$product->product_id] = $product;
        }
    }
}

// === Final Result ===
$finalMatches = array_merge($similarMatches, $tagMatches);

if (!empty($finalMatches)) {
    echo json_encode([
        'status' => 'success',
        'matched_by' => [
            'visual' => array_keys($similarMatches),
            'tags' => array_keys($tagMatches)
        ],
        'products' => array_values($finalMatches),
        'source' => $imageSourceType
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No matching products found.']);
}
