<?php

class categories extends DatabaseObject
{
    // Table name
    static protected $table_name = "Categories";
    static protected $primary_key = 'category_id';

    // Database columns
    static protected $db_columns = [
        'category_id',
        'name',
        'created_at',
        'updated_at'
    ];

    // Class properties for each column
    public $category_id;
    public $name;
    public $created_at;
    public $updated_at;

    // Constructor
    public function __construct($args = [])
    {
        $this->category_id = $args['category_id'] ?? null;
        $this->name = $args['name'] ?? '';
        $this->created_at = $args['created_at'] ?? null;
        $this->updated_at = $args['updated_at'] ?? date('Y-m-d H:i:s');
    }

    // Create or update a category
    static public function saveCategory($data)
    {
        $category = new self($data);

        $errors = $category->validate();
        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        $category->created_at = date('Y-m-d H:i:s');
        $saveQuery = $category->save();

        return $saveQuery
            ? ['status' => 'success', 'message' => 'Category saved successfully']
            : ['status' => 'error', 'message' => 'Failed to save category'];
    }

    static public function updateCategory($data)
    {
        if (empty($data['category_id'])) {
            return ['status' => 'error', 'message' => 'category_id is required'];
        }

        $category = self::findCategoryById($data['category_id']);

        if (!$category) {
            return ['status' => 'error', 'message' => 'Category not found for update'];
        }

        $category->name = $data['name'] ?? $category->name;

        $errors = $category->validate();
        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        $saved = $category->save();

        return $saved
            ? ['status' => 'success', 'message' => 'Category updated successfully']
            : ['status' => 'error', 'message' => 'Failed to update category'];
    }

    // Retrieve all categories
    static public function allCategories()
    {
        return self::findAll();
    }

    // Find category by ID
    static public function findCategoryById($category_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE category_id = :category_id LIMIT 1";
        $stmt = self::executeQuery($sql, ['category_id' => $category_id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? static::instantiate($result) : false;
    }

    public function categoryDelete()
    {
        $sql = "DELETE FROM " . static::$table_name . " WHERE category_id = :category_id LIMIT 1";
        $stmt = self::executeQuery($sql, ['category_id' => $this->category_id]);

        return $stmt
            ? ['status' => 'success', 'message' => 'Category permanently deleted']
            : ['status' => 'error', 'message' => 'Failed to delete category'];
    }

    // Validation for category fields
    protected function validate()
    {
        $this->errors = [];

        if ($this->is_blank($this->name)) {
            $this->errors[] = "Name cannot be blank.";
        } elseif (strlen($this->name) > 100) {
            $this->errors[] = "Name cannot exceed 100 characters.";
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
