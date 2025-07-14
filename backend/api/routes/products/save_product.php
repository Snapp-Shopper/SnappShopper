<?php
/**
 * @openapi
 * /products/save_product.php:
 *   post:
 *     summary: Save or update a product with optional multiple image uploads
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: Product ID for update; omit or null for new product
 *               name:
 *                 type: string
 *                 description: Product name
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: One or more product images to upload
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Product saved successfully with image upload results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 product_id:
 *                   type: integer
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                       message:
 *                         type: string
 */

require_once '../../initialize.php';
require_once '../../../vendor/autoload.php';
require_once '../../helpers/ImageHelper.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

// Support JSON or form-data POST
$data = $_POST;
if (empty($data)) {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
}

if (empty($data)) {
    echo json_encode(['status' => 'error', 'message' => 'No data received.']);
    exit;
}

// === Step 1: Save or update product ===
$product = new products($data);
$product->updated_at = date('Y-m-d H:i:s');
if (empty($product->product_id)) {
    $product->created_at = date('Y-m-d H:i:s');
}

$productResult = $product->saveProduct();

if ($productResult['status'] !== 'success') {
    echo json_encode($productResult);
    exit;
}

// === Step 2: Handle multiple image uploads ===
$uploadedImages = [];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
$maxSize = 5 * 1024 * 1024; // 5MB
$uploadDir = '../../uploads/products/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (!empty($_FILES['image']) && is_array($_FILES['image']['name'])) {
    foreach ($_FILES['image']['name'] as $index => $name) {
        $tmpName = $_FILES['image']['tmp_name'][$index];
        $size = $_FILES['image']['size'][$index];
        $type = $_FILES['image']['type'][$index];
        $error = $_FILES['image']['error'][$index];

        if ($error !== UPLOAD_ERR_OK) {
            $uploadedImages[] = ['status' => 'error', 'message' => "Image upload error for $name."];
            continue;
        }

        if (!in_array($type, $allowedTypes)) {
            $uploadedImages[] = ['status' => 'error', 'message' => "$name is not an allowed file type."];
            continue;
        }

        if ($size > $maxSize) {
            $uploadedImages[] = ['status' => 'error', 'message' => "$name exceeds 5MB limit."];
            continue;
        }

        $ext = pathinfo($name, PATHINFO_EXTENSION);
        $newName = uniqid('prod_', true) . '.' . $ext;
        $destination = $uploadDir . $newName;

        if (ImageHelper::resizeAndCompress($tmpName, $destination)) {
            $relativePath = str_replace('../../', '', $destination);
            $image = new productImage([
                'product_id' => $product->product_id,
                'image_url' => $relativePath,
                'alt_text' => $product->name
            ]);
            $imageResult = $image->saveImage();
            $uploadedImages[] = $imageResult;
        } else {
            $uploadedImages[] = ['status' => 'error', 'message' => "Failed to save $name."];
        }
    }
}

$response = [
    'status' => 'success',
    'message' => 'Product saved successfully',
    'product_id' => $product->product_id,
    'images' => $uploadedImages
];

echo json_encode($response);
exit;
