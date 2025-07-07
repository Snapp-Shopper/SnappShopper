<?php

class subCategory extends DatabaseObject
{
    // Table and primary key
    static protected $table_name = "Sub_Category";
    static protected $primary_key = 'sub_category_id';

    // Table columns
    static protected $db_columns = [
        'sub_category_id',
        'name',
        'category_id',
        'created_at',
        'updated_at'
    ];

    // Properties
    public $sub_category_id;
    public $name;
    public $category_id;
    public $created_at;
    public $updated_at;

    public function __construct($args = [])
    {
        $this->sub_category_id = $args['sub_category_id'] ?? null;
        $this->name = $args['name'] ?? '';
        $this->category_id = $args['category_id'] ?? null;
        $this->created_at = $args['created_at'] ?? date('Y-m-d H:i:s');
        $this->updated_at = $args['updated_at'] ?? date('Y-m-d H:i:s');
    }

    // Save or create subcategory
    public function saveSubCategory()
    {
        $this->updated_at = date('Y-m-d H:i:s');
        if (!$this->sub_category_id) {
            $this->created_at = date('Y-m-d H:i:s');
        }

        $errors = $this->validate();

        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        $saved = $this->save();
        return $saved
            ? ['status' => 'success', 'message' => 'Sub-category saved successfully']
            : ['status' => 'error', 'message' => 'Failed to save sub-category'];
    }

    // Validation
    public function validate()
    {
        $errors = [];

        if (empty(trim($this->name))) {
            $errors[] = "Sub-category name cannot be empty.";
        }
        if (empty($this->category_id)) {
            $errors[] = "Category ID is required.";
        }

        return $errors;
    }

    // Find all subcategories by category ID
    public static function findByCategoryId($category_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE category_id = :category_id";
        $stmt = static::executeQuery($sql, ['category_id' => $category_id]);
        return array_map([static::class, 'instantiate'], $stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // Find subcategory by ID
    public static function findSubById($sub_category_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE sub_category_id = :sub_category_id LIMIT 1";
        $stmt = static::executeQuery($sql, ['sub_category_id' => $sub_category_id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? static::instantiate($row) : null;
    }

    // Update subcategory name
    public function updateName($new_name)
    {
        $this->name = $new_name;
        $this->updated_at = date('Y-m-d H:i:s');

        $sql = "UPDATE " . static::$table_name . " 
                SET name = :name, updated_at = :updated_at 
                WHERE sub_category_id = :sub_category_id";

        return static::executeQuery($sql, [
            'name' => $this->name,
            'updated_at' => $this->updated_at,
            'sub_category_id' => $this->sub_category_id
        ]);
    }

    // Delete subcategory
    public function deleteSubCategory()
    {
        $sql = "DELETE FROM " . static::$table_name . " WHERE sub_category_id = :id LIMIT 1";
        return static::executeQuery($sql, ['id' => $this->sub_category_id])
            ? ['status' => 'success', 'message' => 'Sub-category deleted']
            : ['status' => 'error', 'message' => 'Failed to delete sub-category'];
    }
}
