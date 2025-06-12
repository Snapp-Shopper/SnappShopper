<?php
/**
 * @openai
 * /products/cron_backfill_labels.php:
 * Batch processes product images to extract labels using Google Vision API.
 * Updates the `vision_labels` field in the `productImage` table.
 * Tracks progress with a marker file storing the last processed image ID.
 *
 * Configuration:
 *  - BATCH_SIZE: number of images to process per execution
 *  - MARKER_FILE: path to file storing the last processed image ID
 *
 * Output: Text status updates on each processed image and batch summary.
 */

require_once '../../initialize.php';
require '../../vendor/autoload.php';

use Google\Cloud\Vision\V1\ImageAnnotatorClient;

// Configuration
define('BATCH_SIZE', 10);
define('MARKER_FILE', __DIR__ . '/last_image_id.txt');

if (!defined('GOOGLE_CREDENTIALS')) {
    http_response_code(500);
    exit('Google credentials not configured.');
}

// Initialize Vision API client
$vision = new ImageAnnotatorClient([
    'credentials' => GOOGLE_CREDENTIALS
]);

// Load last processed image ID from marker file
$lastId = file_exists(MARKER_FILE) ? (int)file_get_contents(MARKER_FILE) : 0;

// Fetch next batch of images after the last processed ID
$images = productImage::findBatchAfterId($lastId, BATCH_SIZE);

if (empty($images)) {
    echo "✅ No more images to process.\n";
    exit;
}

$processed = 0;

foreach ($images as $imgData) {
    $imageId = $imgData['image_id'];
    $imageUrl = $imgData['image_url'];

    try {
        // Load image data (from URL or local path)
        if (filter_var($imageUrl, FILTER_VALIDATE_URL)) {
            $imageData = file_get_contents($imageUrl);
            if ($imageData === false) {
                throw new Exception("Failed to download image from URL");
            }
        } else {
            $localPath = $_SERVER['DOCUMENT_ROOT'] . '/' . ltrim($imageUrl, '/');
            if (!file_exists($localPath)) {
                echo "❌ Image not found locally: $localPath\n";
                continue;
            }
            $imageData = file_get_contents($localPath);
        }

        // Detect labels with Vision API
        $response = $vision->labelDetection($imageData);
        $labels = [];
        foreach ($response->getLabelAnnotations() as $label) {
            $labels[] = strtolower($label->getDescription());
        }

        // Update the productImage record
        $imgObj = new productImage($imgData);
        $imgObj->vision_labels = implode(',', $labels);
        $imgObj->save();

        echo "✅ Image $imageId updated with labels: " . implode(', ', $labels) . "\n";
        $lastId = $imageId;
        $processed++;

    } catch (Exception $e) {
        echo "❌ Error processing image $imageId: " . $e->getMessage() . "\n";
    }
}

// Save the last processed image ID to marker file
file_put_contents(MARKER_FILE, $lastId);

echo "=== Batch Complete ===\n";
echo "Images processed: $processed\n";
echo "Last processed image ID: $lastId\n";
