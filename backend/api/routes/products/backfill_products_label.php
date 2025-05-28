<?php
// Description: This endpoint backs up product images by fetching labels using Google Vision API. It processes all product images, retrieves labels using Google Vision API, and updates the database.
require_once '../../initialize.php';
require '../../vendor/autoload.php'; // Google Vision

use Google\Cloud\Vision\V1\ImageAnnotatorClient;

$vision = new ImageAnnotatorClient([
    'credentials' => 'path/to/your-google-credentials.json'
]);

$images = productImage::findAll(); // Should return all image rows (as associative arrays)

$processed = 0;
$updated = 0;
$failed = 0;

foreach ($images as $imgData) {
    $imageId = $imgData['image_id'];
    $imageUrl = $imgData['image_url'];

    try {
        // Load image data
        if (filter_var($imageUrl, FILTER_VALIDATE_URL)) {
            $imageData = file_get_contents($imageUrl);
        } else {
            $localPath = $_SERVER['DOCUMENT_ROOT'] . '/' . ltrim($imageUrl, '/');
            if (!file_exists($localPath)) {
                echo "❌ Image not found for ID $imageId: $localPath\n";
                $failed++;
                continue;
            }
            $imageData = file_get_contents($localPath);
        }

        // Detect labels
        $response = $vision->labelDetection($imageData);
        $annotations = $response->getLabelAnnotations();

        $labels = [];
        foreach ($annotations as $label) {
            $labels[] = strtolower($label->getDescription());
        }

        // Update productImage object
        $imageObj = new productImage($imgData);
        $imageObj->vision_labels = implode(',', $labels);
        $imageObj->save();

        echo "✅ Updated image $imageId with labels: " . implode(', ', $labels) . "\n";
        $updated++;

    } catch (Exception $e) {
        echo "❌ Failed to process image $imageId: " . $e->getMessage() . "\n";
        $failed++;
    }

    $processed++;
}

echo "\n=== DONE ===\n";
echo "Processed: $processed\nUpdated: $updated\nFailed: $failed\n";
