<?php
use Google\Cloud\Vision\V1\ImageAnnotatorClient;

class productImage extends DatabaseObject
{
    // Table name
    static protected $table_name = "Product_Images";

    // Database columns
    static protected $db_columns = [
        'image_id',
        'product_id',
        'image_url',
        'alt_text',
        'created_at',
        'vision_labels'
    ];

    // Class properties for each column
    public $image_id;
    public $product_id;
    public $image_url;
    public $alt_text;
    public $created_at;
    public $vision_labels = [];

    // Constructor
    public function __construct($args = [])
    {
        $this->image_id = $args['image_id'] ?? null;
        $this->product_id = $args['product_id'] ?? null;
        $this->image_url = $args['image_url'] ?? '';
        $this->alt_text = $args['alt_text'] ?? '';
        $this->created_at = $args['created_at'] ?? null;
    }

    // Save or update an image
    public function saveImage()
    {
        $errors = $this->validate();

        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        // 🧠 Run Vision API Label Detection
        $imagePath = $this->image_url; // should be accessible locally or via HTTP
        $labels = [];

        try {
            $vision = new ImageAnnotatorClient([
                'credentials' => GOOGLE_CREDENTIALS
            ]);
            if (empty($imagePath)) {
                return ['status' => 'error', 'message' => 'Image path cannot be empty'];
            }


            if (filter_var($imagePath, FILTER_VALIDATE_URL)) {
                $imageData = file_get_contents($imagePath);
            } else {
                $imageData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/' . $imagePath); // adjust path if needed
            }

            $response = $vision->labelDetection($imageData);
            $annotation = $response->getLabelAnnotations();

            foreach ($annotation as $label) {
                $labels[] = strtolower($label->getDescription());
            }

            $this->vision_labels = implode(',', $labels);

        } catch (Exception $e) {
            // Fail gracefully
            $this->vision_labels = null;
        }

        $saveQuery = $this->save();

        return $saveQuery
            ? ['status' => 'success', 'message' => 'Image saved successfully with labels', 'labels' => $labels]
            : ['status' => 'error', 'message' => 'Failed to save image'];
    }

    // Retrieve all images for a product
    static public function findImagesByProduct($product_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE product_id = :product_id";
        $stmt = self::executeQuery($sql, ['product_id' => $product_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function findMatchingProductsByLabels($searchLabels = []) {
        $sql = "SELECT * FROM Product_Images";
        $stmt = self::executeQuery($sql);
        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $matches = [];

        foreach ($images as $img) {
            $productLabels = explode(',', strtolower($img['vision_labels'] ?? ''));
            $overlap = array_intersect($productLabels, $searchLabels);

            if (count($overlap) >= 2) { // adjust match threshold
                $product = products::findById($img['product_id']);
                if ($product) {
                    $matches[$product->product_id] = $product;
                }
            }
        }

        return array_values($matches);
    }

    static public function findBatchAfterId($lastId, $limit = 10) {
        $sql = "SELECT * FROM " . static::$table_name . " 
                WHERE image_id > :lastId 
                ORDER BY image_id ASC 
                LIMIT :limit";

        $stmt = self::executeQuery($sql, [
            'lastId' => $lastId,
            'limit' => $limit
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    // Delete an image
    static public function deleteImage($image_id)
    {
        $sql = "DELETE FROM " . static::$table_name . " WHERE image_id = :image_id";
        $stmt = self::executeQuery($sql, ['image_id' => $image_id]);
        return $stmt->rowCount() > 0
            ? ['status' => 'success', 'message' => 'Image deleted successfully']
            : ['status' => 'error', 'message' => 'Failed to delete image'];
    }

    // Validation for image fields
    protected function validate()
    {
        $this->errors = [];

        if (empty($this->product_id) || !Products::findById($this->product_id)) {
            $this->errors[] = "Invalid product ID.";
        }

        if ($this->is_blank($this->image_url)) {
            $this->errors[] = "Image URL cannot be blank.";
        }

        return $this->errors;
    }

    // Helper functions
    private function is_blank($value)
    {
        return !isset($value) || trim($value) === '';
    }
}

?>
