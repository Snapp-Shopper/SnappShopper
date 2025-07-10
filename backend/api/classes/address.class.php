<?php

class address extends DatabaseObject
{
    // Table name
    static protected $table_name = "Addresses";
    static protected $primary_key = 'address_id';

    // Database columns
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

    // Class properties for each column
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

    // Constructor
    public function __construct($args = [])
    {
        $this->address_id = $args['address_id'] ?? null;
        $this->user_id = $args['user_id'] ?? null;
        $this->address_line1 = $args['address_line1'] ?? '';
        $this->address_line2 = $args['address_line2'] ?? '';
        $this->city = $args['city'] ?? '';
        $this->state = $args['state'] ?? '';
        $this->zip_code = $args['zip_code'] ?? '';
        $this->country = $args['country'] ?? '';
        $this->is_default = $args['is_default'] ?? false;
        $this->created_at = $args['created_at'] ?? null;
    }

    // Save the address to the database
    public function saveAddress()
    {
        // Validate the address data
        $errors = $this->validate();

        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        $saveQuery = $this->save();
        if ($saveQuery) {
            // Log the address creation or update
            $log = new auditLog([
                'user_id' => $this->user_id,
                'action' => $this->address_id ? 'update_address' : 'create_address',
                'action_date' => date('Y-m-d H:i:s'),
                'description' => "Address ID {$this->address_id} saved for user ID {$this->user_id}"
            ]);
            $log->saveAuditLog();
        }   
        return $saveQuery
            ? ['status' => 'success', 'message' => 'Address saved successfully']
            : ['status' => 'error', 'message' => 'Failed to save address'];
    }

    // Validate the address data
    public function validate()
    {
        $errors = [];

        if (empty($this->user_id)) {
            $errors[] = "User ID cannot be empty.";
        }
        if (empty($this->address_line1)) {
            $errors[] = "Address line 1 cannot be empty.";
        }
        if (empty($this->city)) {
            $errors[] = "City cannot be empty.";
        }
        if (empty($this->country)) {
            $errors[] = "Country cannot be empty.";
        }

        return $errors;
    }

    // Set a specific address as the default address for the user
    public function setDefaultAddress()
    {
        // First, unset any existing default address for this user
        $sql = "UPDATE " . self::$table_name . " SET is_default = 0 WHERE user_id = :user_id";
        self::executeQuery($sql, ['user_id' => $this->user_id]);

        // Now, set this address as the default
        $this->is_default = true;
        $this->save(); // Update the database
        $log = new auditLog([
            'user_id' => $this->user_id,
            'action' => 'set_default_address',
            'action_date' => date('Y-m-d H:i:s'),
            'description' => "Address ID {$this->address_id} set as default for user ID {$this->user_id}"
        ]);
    }

    // Retrieve all addresses for a user
    public static function findAddressesByUserId($user_id)
    {
        $sql = "SELECT * FROM " . self::$table_name . " WHERE user_id = :user_id ORDER BY created_at DESC";
        $stmt = self::executeQuery($sql, ['user_id' => $user_id]);

        $addresses = [];
        foreach ($stmt as $row) {
            $addresses[] = new self($row);
        }

        return $addresses;
    }

    // Retrieve the default address for a user
    public static function findDefaultAddressByUserId($user_id)
    {
        $sql = "SELECT * FROM " . self::$table_name . " WHERE user_id = :user_id AND is_default = 1 LIMIT 1";
        $stmt = self::executeQuery($sql, ['user_id' => $user_id]);

        return $stmt ? new self($stmt[0]) : null;
    }

    static public function findAddressById($id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE address_id = :id LIMIT 1";
        $stmt = self::executeQuery($sql, ['id' => $id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? static::instantiate($result) : false;
    }

    public function addressDelete()
    {
        $sql = "DELETE FROM " . static::$table_name . " WHERE address_id = :user_id LIMIT 1";
        $stmt = self::executeQuery($sql, ['address_id' => $this->address_id]);
        if ($stmt) {
            // Log the address deletion
            $log = new auditLog([
                'user_id' => $this->user_id,
                'action' => 'delete_address',
                'action_date' => date('Y-m-d H:i:s'),
                'description' => "Address ID {$this->address_id} deleted for user ID {$this->user_id}"
            ]);
            $log->saveAuditLog();
        }
        return $stmt
            ? ['status' => 'success', 'message' => 'Address permanently deleted']
            : ['status' => 'error', 'message' => 'Failed to delete address'];
    }

    static public function updateAddress($data)
    {
        // Check if address_id is provided
        if (empty($data['address_id'])) {
            return ['status' => 'error', 'message' => 'address id is required'];
        }

        $address = self::findAddressById($data['address_id']);

        if (!$address) {
            return ['status' => 'error', 'message' => 'Address not found for update'];
        }

        // Assign data to the object
        $address->user_id = $data['user_id'] ?? $address->user_id;
        $address->address_line1 = $data['address_line1'] ?? $address->address_line1;
        $address->address_line2 = $data['address_line2'] ?? $address->address_line2;
        $address->city = $data['city'] ?? $address->city;
        $address->state = $data['state'] ?? $address->state;
        $address->zip_code = $data['zip_code'] ?? $address->zip_code;
        $address->country = $data['country'] ?? $address->country;
        $address->is_default = $data['is_default'] ?? $address->is_default;
        
        // Validate and save
        $errors = $address->validate();
        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        $saved = $address->save();
        if ($saved) {
            // Log the address update
            $log = new auditLog([
                'user_id' => $address->user_id,
                'action' => 'update_address',
                'action_date' => date('Y-m-d H:i:s'),
                'description' => "Address ID {$address->address_id} updated for user ID {$address->user_id}"
            ]);
            $log->saveAuditLog();
        }
        return $saved
            ? ['status' => 'success', 'message' => 'Address updated successfully']
            : ['status' => 'error', 'message' => 'Failed to update address'];
    }

}

?>
