<?php

class Vendor extends DatabaseObject
{
    // Table name
    static protected $table_name = "Vendor";
    static protected $primary_key = 'vendor_id';

    // Database columns
    static protected $db_columns = [
        'vendor_id',
        'name',
        'email',
        'password_hash',  // ✅ Needed for login    
        'phone_number',
        'address',
        'state',         
        'country',       
        'created_at',
        'updated_at'
    ];

    // Class properties for each column
    public $vendor_id;
    public $name;
    public $email;
    public $password_hash; // ✅ Needed for login
    public $phone_number;
    public $address;
    public $state;
    public $country;
    public $created_at;
    public $updated_at;

    // Constructor
    public function __construct($args = [])
    {
        $this->vendor_id = $args['vendor_id'] ?? null;
        $this->name = $args['name'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password_hash = $args['password_hash'] ?? ''; // ✅ Needed for login
        $this->phone_number = $args['phone_number'] ?? '';
        $this->address = $args['address'] ?? '';
        $this->state = $args['state'] ?? '';
        $this->country = $args['country'] ?? '';
        $this->created_at = $args['created_at'] ?? null;
        $this->updated_at = $args['updated_at'] ?? null;
    }

    // Save the vendor to the database
    public function saveVendor()
    {
        // Validate the vendor data
        $errors = $this->validate();

        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }
        
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');
        $saveQuery = $this->save();

        return $saveQuery
            ? ['status' => 'success', 'message' => 'Vendor saved successfully']
            : ['status' => 'error', 'message' => 'Failed to save vendor'];
    }

    // Validate the vendor data
    public function validate()
    {
        $errors = [];

        if (empty($this->name)) {
            $errors[] = "Vendor name cannot be empty.";
        }

        if (empty($this->email)) {
            $errors[] = "Vendor email cannot be empty.";
        } elseif (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Invalid email format.";
        }

        if (empty($this->state)) {
            $errors[] = "Vendor state is required.";
        }

        if (empty($this->country)) {
            $errors[] = "Vendor country is required.";
        }

        return $errors;
    }

    // Find a vendor by email
    public static function findByEmail($email)
    {
        $sql = "SELECT * FROM " . self::$table_name . " WHERE email = :email LIMIT 1";
        $stmt = self::executeQuery($sql, ['email' => $email]);

        return $stmt ? new self($stmt[0]) : null;
    }

    // Find a vendor by ID
    public static function findVendorById($vendor_id)
    {
        $sql = "SELECT * FROM " . self::$table_name . " WHERE vendor_id = :vendor_id LIMIT 1";
        $stmt = self::executeQuery($sql, ['vendor_id' => $vendor_id]);

        return $stmt ? new self($stmt[0]) : null;
    }

    // Delete a vendor by ID
    public static function deleteById($vendor_id)
    {
        $sql = "DELETE FROM " . self::$table_name . " WHERE vendor_id = :vendor_id";
        return self::executeQuery($sql, ['vendor_id' => $vendor_id]);
    }

    public static function login($email, $password)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE email = :email LIMIT 1";
        $stmt = self::executeQuery($sql, ['email' => $email]);
        $vendor_data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($vendor_data) {
            $vendor = static::instantiate($vendor_data);
            $passwordHash = new passwordHash();

            if ($passwordHash->verify($password, $vendor->password_hash)) {
                // ✅ Optional: update last login timestamp if you add such a column
                $updateSql = "UPDATE " . static::$table_name . " SET updated_at = :updated_at WHERE vendor_id = :vendor_id";
                self::executeQuery($updateSql, [
                    'updated_at' => date('Y-m-d H:i:s'),
                    'vendor_id' => $vendor->vendor_id
                ]);

                // ✅ Generate token
                $tokenData = [
                    'vendor_id' => $vendor->vendor_id,
                    'name' => $vendor->name,
                    'email' => $vendor->email
                ];
                $token = JWT::generateToken($tokenData);

                // Log vendor login
                auditLog::audit($vendor->vendor_id, 'vendor_login', "Vendor logged in successfully");

                return [
                    'status' => 'success',
                    'message' => 'Login successful',
                    'vendor' => $tokenData,
                    'token' => $token
                ];
            } else {
                return ['status' => 'error', 'message' => 'Invalid password'];
            }
        }

        return ['status' => 'error', 'message' => 'Vendor not found'];
    }

    public static function register($data)
    {
        $passwordHash = new passwordHash();
        $hashedPassword = isset($data['password']) ? $passwordHash->hash($data['password']) : '';

        // Check if vendor already exists
        $existingVendor = self::findByEmail($data['email']);
        if ($existingVendor) {
            return ['status' => 'error', 'message' => 'Email already exists'];
        }

        $data['password_hash'] = $hashedPassword;
        $vendor = new self($data);
        $vendor->created_at = date('Y-m-d H:i:s');
        $vendor->updated_at = date('Y-m-d H:i:s');

        $errors = $vendor->validate();
        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        if ($vendor->save()) {
            auditLog::audit($vendor->vendor_id, 'vendor_register', "Vendor registered with email {$vendor->email}");
            return ['status' => 'success', 'message' => 'Vendor registered successfully'];
        } else {
            return ['status' => 'error', 'message' => 'Registration failed'];
        }
    }


    // Update vendor information
    public function updateVendor()
    {
        $errors = $this->validate();

        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }
        $this->updated_at = date('Y-m-d H:i:s');
        $updateQuery = $this->update();

        return $updateQuery
            ? ['status' => 'success', 'message' => 'Vendor updated successfully']
            : ['status' => 'error', 'message' => 'Failed to update vendor'];
    }

    public static function findVendorByProductId($product_id)
    {
        $link = productVendor::findByProductId($product_id);
        if ($link && $link->vendor_id) {
            return self::findVendorById($link->vendor_id);
        }
        return null;
    }


}

?>
