<?php
require_once '../../initialize.php';
require '../../vendor/autoload.php';

use Google\Cloud\Vision\V1\ImageAnnotatorClient;

// === Config ===
define('GOOGLE_CREDENTIALS_PATH', 'path/to/your-google-credentials.json');
define('BATCH_SIZE', 10); // How many images to process per run
define('MARKER_FILE', __DIR__ . '/last_image_id.txt'); // File to track progress

// === Initialize Vision API ===
$vision = new ImageAnnotatorClient([
    'credentials' => GOOGLE_CREDENTIALS_PATH
]);

// === Load last processed ID ===
$lastId = file_exists(MARKER_FILE) ? (int)file_get_contents(MARKER_FILE) : 0;

// === Fetch next batch of unprocessed images ===
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
        // Load image file (URL or local)
        if (filter_var($imageUrl, FILTER_VALIDATE_URL)) {
            $imageData = file_get_contents($imageUrl);
        } else {
            $localPath = $_SERVER['DOCUMENT_ROOT'] . '/' . ltrim($imageUrl, '/');
            if (!file_exists($localPath)) {
                echo "❌ Image not found: $localPath\n";
                continue;
            }
            $imageData = file_get_contents($localPath);
        }

        // Run Vision label detection
        $response = $vision->labelDetection($imageData);
        $labels = [];
        foreach ($response->getLabelAnnotations() as $label) {
            $labels[] = strtolower($label->getDescription());
        }

        // Save back to DB
        $imgObj = new productImage($imgData);
        $imgObj->vision_labels = implode(',', $labels);
        $imgObj->save();

        echo "✅ Image $imageId updated: " . implode(', ', $labels) . "\n";
        $lastId = $imageId;
        $processed++;

    } catch (Exception $e) {
        echo "❌ Error on image $imageId: " . $e->getMessage() . "\n";
    }
}

// === Update marker ===
file_put_contents(MARKER_FILE, $lastId);

echo "=== Batch Complete ===\n";
echo "Images processed: $processed\n";
echo "Last ID: $lastId\n";
