<?php

class users extends DatabaseObject
{
    // Table name
    static protected $table_name = "Users";

    // Database columns
    static protected $db_columns = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'password_hash',
        'phone_number',
        'created_at',
        'updated_at',
        'last_loggedIn'
    ];

    // Class properties for each column
    public $user_id;
    public $first_name;
    public $last_name;
    public $email;
    public $password_hash;
    public $phone_number;
    public $created_at;
    public $updated_at;
    public $last_loggedIn;

    // Constructor
    public function __construct($args = [])
    {
        $this->user_id = $args['user_id'] ?? null;
        $this->first_name = $args['first_name'] ?? '';
        $this->last_name = $args['last_name'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password_hash = $args['password_hash'] ?? '';
        $this->phone_number = $args['phone_number'] ?? '';
        $this->created_at = $args['created_at'] ?? null;
        $this->updated_at = $args['updated_at'] ?? date('Y-m-d H:i:s');
        $this->last_loggedIn = $args['last_loggedIn'] ?? null;
    }

    // Register a new user
    static public function register($data)
    {
        $passwordHash = new passwordHash();
        $hashedPassword = isset($data["password"]) ? $passwordHash->hash($data["password"]) : '';

        // Check if the user already exists
        $existingUser = self::findByEmail($data["email"]);
        if ($existingUser) {
            return ['status' => 'error', 'message' => 'Email already exists'];
        }

        $verificationToken = bin2hex(random_bytes(16)); // Generates a 32-char token

        $data['password_hash'] = $hashedPassword;
        $data['is_verified'] = 0;
        $data['verification_token'] = $verificationToken;
        unset($data["password"]);

        $user = new self($data);
        $user->created_at = date('Y-m-d H:i:s');
        $errors = $user->validate();

        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        if ($user->save()) {
            // Send verification email
            self::sendVerificationEmail($data["email"], $verificationToken);
            return ['status' => 'success', 'message' => 'User registered. Please verify your email.'];
        } else {
            return ['status' => 'error', 'message' => 'Registration failed'];
        }
    }

    static public function updateUser($data)
    {
        // Check if user_id is provided
        if (empty($data['user_id'])) {
            return ['status' => 'error', 'message' => 'user id is required'];
        }

        $user = self::findUserById($data['user_id']);

        if (!$user) {
            return ['status' => 'error', 'message' => 'User not found for update'];
        }

        // Assign data to the object
        $user->first_name = $data['first_name'] ?? $user->first_name;
        $user->last_name = $data['last_name'] ?? $user->last_name;
        $user->email = $data['email'] ?? $user->email;
        $user->phone_number = $data['phone_number'] ?? $user->phone_number;
        $user->password_hash = isset($data['password']) ? (new passwordHash())->hash($data['password']) : $user->password_hash;

        // Validate and save
        $errors = $user->validate();
        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        $saved = $user->save();

        return $saved
            ? ['status' => 'success', 'message' => 'User updated successfully']
            : ['status' => 'error', 'message' => 'Failed to update user'];
    }

    static private function sendVerificationEmail($email, $token)
    {
        $verificationLink = "https://yourdomain.com/api/verify_email.php?token=$token";

        $subject = "Verify your email address";
        $message = "Click the link to verify your email: $verificationLink";
        $headers = "From: no-reply@yourdomain.com\r\n";

        // Use mail() or a proper mailer like PHPMailer
        mail($email, $subject, $message, $headers);
    }


    // Verify user login
    static public function login($email, $password)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE email = :email";
        $stmt = self::executeQuery($sql, ['email' => $email]);
        $user_data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user_data) {
            $user = static::instantiate($user_data);
            $passwordHash = new passwordHash();

            if ($passwordHash->verify($password, $user->password_hash)) {

                // ✅ Update last_loggedIn timestamp
                $updateSql = "UPDATE " . static::$table_name . " SET last_loggedIn = :last_loggedIn WHERE user_id = :user_id";
                self::executeQuery($updateSql, [
                    'last_loggedIn' => date('Y-m-d H:i:s'),
                    'user_id' => $user->user_id
                ]);
                
                // ✅ Generate token
                $tokenData = [
                    'user_id' => $user->user_id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name
                ];
                $token = JWT::generateToken($tokenData);

                return [
                    'status' => 'success',
                    'message' => 'Login successful',
                    'user' => $user,
                    'token' => $token
                ];
            } else {
                return ['status' => 'error', 'message' => 'Invalid password'];
            }
        }

        return ['status' => 'error', 'message' => 'User not found'];
    }

    static public function forgotPassword($email)
    {
        // Check if user exists
        $sql = "SELECT * FROM " . static::$table_name . " WHERE email = :email";
        $stmt = self::executeQuery($sql, ['email' => $email]);
        $user_data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user_data) {
            $user = static::instantiate($user_data);

            // Generate secure token
            $token = bin2hex(random_bytes(32));
            $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

            // Store token and expiry in DB
            $updateSql = "UPDATE " . static::$table_name . " SET reset_token = :token, reset_token_expires = :expires WHERE user_id = :user_id";
            self::executeQuery($updateSql, [
                'token' => $token,
                'expires' => $expires,
                'user_id' => $user->user_id
            ]);

            // Construct password reset link (change domain as needed)
            $resetLink = "https://yourdomain.com/reset-password.php?token=" . urlencode($token);

            // Optionally: send email here with $resetLink (pseudo-code)
            // Mail::send($user->email, 'Password Reset', "Click here to reset: $resetLink");

            return [
                'status' => 'success',
                'message' => 'Password reset link sent to your email.',
                'reset_link' => $resetLink // Include this only for testing/dev
            ];
        }

        return ['status' => 'error', 'message' => 'No account found with that email.'];
    }

    static public function resetPassword($token, $newPassword)
    {
        // Find user with valid token that hasn't expired
        $sql = "SELECT * FROM " . static::$table_name . " 
                WHERE reset_token = :token 
                AND reset_token_expires > NOW()";
                
        $stmt = self::executeQuery($sql, ['token' => $token]);
        $user_data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user_data) {
            $user = static::instantiate($user_data);

            // Hash new password
            $passwordHash = new passwordHash();
            $hashedPassword = $passwordHash->hash($newPassword);

            // Update password and clear reset token
            $updateSql = "UPDATE " . static::$table_name . " 
                        SET password_hash = :password_hash, 
                            reset_token = NULL, 
                            reset_token_expires = NULL, 
                            updated_at = :updated_at
                        WHERE user_id = :user_id";

            self::executeQuery($updateSql, [
                'password_hash' => $hashedPassword,
                'updated_at' => date('Y-m-d H:i:s'),
                'user_id' => $user->user_id
            ]);

            return [
                'status' => 'success',
                'message' => 'Password reset successfully.'
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Invalid or expired reset token.'
        ];
    }


    // Retrieve all users
    static public function allUsers()
    {
        return self::findAll();
    }

    // Retrieve user by ID
    static public function findUserById($id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE user_id = :id LIMIT 1";
        $stmt = self::executeQuery($sql, ['id' => $id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? static::instantiate($result) : false;
    }

    static public function findByToken($token)
    {
        $sql = "SELECT * FROM " .static::$table_name . " WHERE verification_token = :token LIMIT 1";
        $stmt = self::executeQuery($sql, ['token' => $token]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? static::instantiate($result) : false;
    }

    public function userDelete()
    {
        $sql = "DELETE FROM " . static::$table_name . " WHERE user_id = :user_id LIMIT 1";
        $stmt = self::executeQuery($sql, ['user_id' => $this->user_id]);

        return $stmt
            ? ['status' => 'success', 'message' => 'User permanently deleted']
            : ['status' => 'error', 'message' => 'Failed to delete user'];
    }

    // Validation for user fields
    protected function validate()
    {
        $this->errors = [];

        if ($this->is_blank($this->first_name)) {
            $this->errors[] = "First name cannot be blank.";
        }

        if ($this->is_blank($this->last_name)) {
            $this->errors[] = "Last name cannot be blank.";
        }

        if ($this->is_blank($this->email)) {
            $this->errors[] = "Email cannot be blank.";
        } elseif (!$this->has_valid_email_format($this->email)) {
            $this->errors[] = "Email must be a valid format.";
        }

        if (empty($this->user_id) && $this->is_blank($this->password_hash)) {
            $this->errors[] = "Password cannot be blank.";
        }

        return $this->errors;
    }

    // Helper functions
    private function is_blank($value)
    {
        return !isset($value) || trim($value) === '';
    }

    private function has_valid_email_format($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
}

?>
