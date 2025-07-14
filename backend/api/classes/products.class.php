<?php

class products extends DatabaseObject
{
    // Table name
    static protected $table_name = "Products";
    static protected $primary_key = 'product_id';

    // Database columns
    static protected $db_columns = [
        'product_id',
        'name',
        'description',
        'price',
        'category_id',
        'stock',
        'created_at',
        'updated_at'
    ];

    // Class properties for each column
    public $product_id;
    public $name;
    public $description;
    public $price;
    public $category_id;
    public $stock;
    public $created_at;
    public $updated_at;

    // Constructor
    public function __construct($args = [])
    {
        $this->product_id = $args['product_id'] ?? null;
        $this->name = $args['name'] ?? '';
        $this->description = $args['description'] ?? '';
        $this->price = $args['price'] ?? 0.00;
        $this->category_id = $args['category_id'] ?? null;
        $this->stock = $args['stock'] ?? 0;
        $this->created_at = $args['created_at'] ?? null;
        $this->updated_at = $args['updated_at'] ?? null;
    }

    // Create or update a product
    public function saveProduct()
    {
        $errors = $this->validate();

        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        $this->updated_at = date('Y-m-d H:i:s');

        $isNew = is_null($this->product_id);
        $saveQuery = $this->save();

        if ($saveQuery) {
            // Sync inventory
            $inventory = inventory::findByProductId($this->product_id);

            if ($inventory) {
                $inventory->quantity_available = $this->stock;
                $inventory->last_updated = date('Y-m-d H:i:s');
            } else {
                $inventory = new inventory([
                    'product_id' => $this->product_id,
                    'quantity_available' => $this->stock,
                    'quantity_sold' => 0,
                    'last_updated' => date('Y-m-d H:i:s')
                ]);
            }

            $inventory->save();

            // Audit log
            $log = new auditLog([
                'user_id' => $_POST['user_id'] ?? 0,
                'action' => $isNew ? 'product_create' : 'product_update',
                'action_date' => date('Y-m-d H:i:s'),
                'description' => "Product " . ($isNew ? "created" : "updated") . ": {$this->name}"
            ]);
            $log->saveAuditLog();
        }

        return $saveQuery
            ? ['status' => 'success', 'message' => 'Product saved successfully']
            : ['status' => 'error', 'message' => 'Failed to save product'];
    }


    // Find a product by ID
    static public function findProductById($id)
    {
        return self::findById($id);
    }

    // Retrieve all products
    static public function allProducts()
    {
        return self::findAll();
    }

    // Retrieve products by category
    static public function findProductsByCategory($category_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE category_id = :category_id";
        $stmt = self::executeQuery($sql, ['category_id' => $category_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Update product stock
    static public function updateStock($product_id, $new_stock)
    {
        $product = self::findById($product_id);
        if (!$product) {
            return ['status' => 'error', 'message' => 'Product not found'];
        }

        $product->stock = $new_stock;
        $product->updated_at = date('Y-m-d H:i:s');
        $saved = $product->save();

        if ($saved) {
            $inventory = inventory::findByProductId($product_id);
            if ($inventory) {
                $inventory->quantity_available = $new_stock;
                $inventory->last_updated = date('Y-m-d H:i:s');
                $inventory->save();
            }

            $log = new auditLog([
                'user_id' => $_POST['user_id'] ?? 0,
                'action' => 'product_stock_update',
                'action_date' => date('Y-m-d H:i:s'),
                'description' => "Stock updated for product_id {$product_id} to {$new_stock}"
            ]);
            $log->saveAuditLog();

            return ['status' => 'success', 'message' => 'Stock updated successfully'];
        }

        return ['status' => 'error', 'message' => 'Failed to update stock'];
    }


    // Get recommended products (fallback)
    static public function getRecommended($limit = 6)
    {
        require_once __DIR__ . '/../helpers/CacheHelper.php';

        $cacheKey = "recommended_products_{$limit}";
        $cached = CacheHelper::get($cacheKey, 3600); // 1 hour cache

        if ($cached) return $cached;

        $sql = "SELECT * FROM " . static::$table_name . " ORDER BY created_at DESC LIMIT :limit";
        $stmt = self::executeQuery($sql, ['limit' => $limit]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        CacheHelper::set($cacheKey, $result);
        return $result;
    }



    // Validation for product fields
    protected function validate()
    {
        $this->errors = [];

        if ($this->is_blank($this->name)) {
            $this->errors[] = "Product name cannot be blank.";
        }

        if ($this->price <= 0) {
            $this->errors[] = "Price must be greater than zero.";
        }

        if (!is_null($this->category_id) && !categories::findById($this->category_id)) {
            $this->errors[] = "Invalid category ID.";
        }

        if ($this->stock < 0) {
            $this->errors[] = "Stock cannot be negative.";
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
