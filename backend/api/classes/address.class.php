<?php

class address extends DatabaseObject
{
    static protected $table_name = "Addresses";
    static protected $primary_key = 'address_id';

    static protected $db_columns = [
        'address_id',
        'user_id',
        'address_line1',
        'address_line2',
        'city',
        'state',
        'zip_code',
        'country',
        'is_default',
        'created_at'
    ];

    public $address_id;
    public $user_id;
    public $address_line1;
    public $address_line2;
    public $city;
    public $state;
    public $zip_code;
    public $country;
    public $is_default = false;
    public $created_at;

    public function __construct($args = [])
    {
        $this->address_id      = $args['address_id'] ?? null;
        $this->user_id         = $args['user_id'] ?? null;
        $this->address_line1   = $args['address_line1'] ?? '';
        $this->address_line2   = $args['address_line2'] ?? '';
        $this->city            = $args['city'] ?? '';
        $this->state           = $args['state'] ?? '';
        $this->zip_code        = $args['zip_code'] ?? '';
        $this->country         = $args['country'] ?? '';
        $this->is_default      = $args['is_default'] ?? false;
        $this->created_at      = $args['created_at'] ?? null;
    }

    // Save or update address
    public function saveAddress()
    {
        $errors = $this->validate();
        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        $success = $this->save();
        if ($success) {
            $action = $this->address_id ? 'update_address' : 'create_address';
            auditLog::audit($this->user_id, $action, "Address ID {$this->address_id} saved for user ID {$this->user_id}");
        }

        return $success
            ? ['status' => 'success', 'message' => 'Address saved successfully']
            : ['status' => 'error', 'message' => 'Failed to save address'];
    }

    // Validate data
    public function validate()
    {
        $errors = [];

        if (!$this->user_id)         $errors[] = "User ID is required.";
        if (!$this->address_line1)   $errors[] = "Address line 1 is required.";
        if (!$this->city)            $errors[] = "City is required.";
        if (!$this->country)         $errors[] = "Country is required.";

        return $errors;
    }

    // Set as default address
    public function setAsDefault()
    {
        $sql = "UPDATE " . static::$table_name . " SET is_default = 0 WHERE user_id = :user_id";
        self::executeQuery($sql, ['user_id' => $this->user_id]);

        $this->is_default = true;
        $result = $this->save();
        if ($result) {
           auditLog::audit($this->user_id, 'set_default_address', "Address ID {$this->address_id} set as default for user ID {$this->user_id}");
        }
    }

    // Get all addresses by user
    public static function getByUserId($user_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE user_id = :user_id ORDER BY created_at DESC";
        $stmt = self::executeQuery($sql, ['user_id' => $user_id]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(fn($row) => new static($row), $results);
    }

    // Get default address
    public static function getDefaultByUserId($user_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE user_id = :user_id AND is_default = 1 LIMIT 1";
        $stmt = self::executeQuery($sql, ['user_id' => $user_id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? new static($row) : null;
    }

    // Find address by ID
    public static function getById($address_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE address_id = :id LIMIT 1";
        $stmt = self::executeQuery($sql, ['id' => $address_id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? new static($row) : null;
    }

    // Delete this address
    public function deleteAddress()
    {
        $sql = "DELETE FROM " . static::$table_name . " WHERE address_id = :id LIMIT 1";
        $stmt = self::executeQuery($sql, ['id' => $this->address_id]);

        if ($stmt) {
            auditLog::audit($this->user_id, 'delete_address', "Address ID {$this->address_id} deleted for user ID {$this->user_id}");
        }

        return $stmt
            ? ['status' => 'success', 'message' => 'Address deleted successfully']
            : ['status' => 'error', 'message' => 'Failed to delete address'];
    }

    // Update address from data array
    public static function updateAddress($data)
    {
        if (empty($data['address_id'])) {
            return ['status' => 'error', 'message' => 'Address ID is required'];
        }

        $address = self::getById($data['address_id']);
        if (!$address) {
            return ['status' => 'error', 'message' => 'Address not found'];
        }

        // Assign fields
        foreach (['user_id', 'address_line1', 'address_line2', 'city', 'state', 'zip_code', 'country', 'is_default'] as $field) {
            if (isset($data[$field])) {
                $address->$field = $data[$field];
            }
        }

        $errors = $address->validate();
        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        $saved = $address->save();
        if ($saved) {
            auditLog::audit($address->user_id, 'update_address', "Address ID {$address->address_id} updated for user ID {$address->user_id}");
        }

        return $saved
            ? ['status' => 'success', 'message' => 'Address updated successfully']
            : ['status' => 'error', 'message' => 'Failed to update address'];
    }
}
