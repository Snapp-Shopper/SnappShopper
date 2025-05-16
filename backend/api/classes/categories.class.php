<?php

class categories extends DatabaseObject
{
    // Table name
    static protected $table_name = "Categories";

    // Database columns
    static protected $db_columns = [
        'category_id',
        'name',
        'parent_category_id',
        'created_at',
        'updated_at'
    ];

    // Class properties for each column
    public $category_id;
    public $name;
    public $parent_category_id;
    public $created_at;
    public $updated_at;

    // Constructor
    public function __construct($args = [])
    {
        $this->category_id = $args['category_id'] ?? null;
        $this->name = $args['name'] ?? '';
        $this->parent_category_id = $args['parent_category_id'] ?? null;
        $this->created_at = $args['created_at'] ?? null;
        $this->updated_at = $args['updated_at'] ?? date('Y-m-d H:i:s');
    }

    // Create or update a category
    static public function saveCategory($data)
    {
         // Instantiate the category object
        $category = new self($data);
        if (isset($data['category_id']) && !empty($data['category_id'])) {
            if (self::findCategoryById($data['category_id']) === false) {
                return ['status' => 'error', 'message' => 'Category not found'];
                # code...
            }
            $category->parent_category_id = $data['category_id'];
        }
        // Run validation on the instance
        $errors = $category->validate();

        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }
        $category->created_at = date('Y-m-d H:i:s'); // Set created_at to current time
        // Save the category using the instance method
        $saveQuery = $category->save(); // Assuming save() is inherited from DatabaseObject

        return $saveQuery
            ? ['status' => 'success', 'message' => 'Category saved successfully']
            : ['status' => 'error', 'message' => 'Failed to save category'];
    }

    static public function updateCategory($data)
    {
        // Check if category_id is provided
        if (empty($data['category_id'])) {
            return ['status' => 'error', 'message' => 'category_id is required'];
        }

        $category = self::findCategoryById($data['category_id']);

        if (!$category) {
            return ['status' => 'error', 'message' => 'Category not found for update'];
        }

        // Assign data to the object
        $category->name = $data['name'] ?? $category->name;
        $category->parent_category_id = $data['parent_category_id'] ?? null;

        // Validate and save
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

    // Find subcategories of a category
    static public function findSubcategories($parent_category_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE parent_category_id = :parent_category_id";
        $stmt = self::executeQuery($sql, ['parent_category_id' => $parent_category_id]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map([static::class, 'instantiate'], $results);
    }

    // Get parent category
    public function getParentCategory()
    {
        if ($this->parent_category_id) {
            return self::findById($this->parent_category_id);
        }
        return null;
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

        if ($this->parent_category_id && !self::findCategoryById($this->parent_category_id)) {
            $this->errors[] = "Invalid parent category ID.";
        }

        return $this->errors;
    }

    // Retrieve all parent categories
    static public function findParentCategories()
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE parent_category_id IS NULL";
        $stmt = self::executeQuery($sql);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map([static::class, 'instantiate'], $results);
    }

    // Helper functions
    private function is_blank($value)
    {
        return !isset($value) || trim($value) === '';
    }
}

?>
