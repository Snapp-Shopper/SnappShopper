<?php
// Description: This endpoint scans product images, using Google Vision API to extract labels and similar matches in the database.
require_once '../../initialize.php';
require '../../vendor/autoload.php'; // Google Cloud Vision library

use Google\Cloud\Vision\V1\ImageAnnotatorClient;

// Utility function to safely intersect labels
function labelsMatch($storedLabels, $searchLabels, $threshold = 2) {
    $storedArray = explode(',', strtolower($storedLabels));
    $overlap = array_intersect($storedArray, $searchLabels);
    return count($overlap) >= $threshold;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['search_image'])) {
    $uploadedFile = $_FILES['search_image']['tmp_name'];

    $vision = new ImageAnnotatorClient([
        'credentials' => 'path/to/your-google-credentials.json'
    ]);

    $imageData = file_get_contents($uploadedFile);

    // === 1. Web Detection ===
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

    // === 2. Label Detection ===
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

    // === Merge Matches ===
    $finalMatches = array_merge($similarMatches, $tagMatches);

    if (!empty($finalMatches)) {
        echo json_encode([
            'status' => 'success',
            'products' => array_values($finalMatches),
            'matched_by' => [
                'visual' => array_keys($similarMatches),
                'tags' => array_keys($tagMatches)
            ]
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No matching products found.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No image uploaded.']);
}
