<?php

use Google\Service\StreetViewPublish\Place;

class DeviceToken extends DatabaseObject
{
    // Table name
    static protected $table_name = "DeviceTokens";
    static protected $primary_key = 'id';

    // Database columns
    static protected $db_columns = [
        'id',
        'user_id',
        'device_token',
        'platform',       // 'web', 'android', 'ios'
        'last_seen',
        'created_at'
    ];

    // Properties
    public $id;
    public $user_id;
    public $device_token;
    public $platform;    // e.g. 'web', 'android', 'ios'
    public $last_seen;   // Last time the device token was used
    public $created_at;

    public function __construct($args = [])
    {
        $this->id           = $args['id'] ?? null;
        $this->user_id      = $args['user_id'] ?? null;
        $this->device_token = $args['device_token'] ?? '';
        $this->platform     = $args['platform'] ?? 'web'; // Default to 'web'
        $this->last_seen    = $args['last_seen'] ?? date('Y-m-d H:i:s'); // Default to current time
        $this->created_at   = $args['created_at'] ?? date('Y-m-d H:i:s');
    }

    
    public function validate()
    {
        $this->errors = [];

        if (empty($this->user_id)) {
            $this->errors[] = "User ID is required.";
        }

        if (empty($this->device_token)) {
            $this->errors[] = "Device token is required.";
        }

        return $this->errors;
    }

    // Save or update device token
    public static function saveOrUpdate($user_id, $device_token, $platform = 'web')
    {
        $existing = self::findByUserId($user_id);
        if ($existing && $existing->device_token === $device_token) {
            $existing->device_token = $device_token;
            $existing->last_seen = date('Y-m-d H:i:s'); // Update last seen time
            return $existing->save();
        } 
        $new = new self([
            'user_id'      => $user_id,
            'device_token' => $device_token,
            'platform'     => $platform,
            'last_seen'    => date('Y-m-d H:i:s'),
            'created_at'   => date('Y-m-d H:i:s'),
        ]);
        return $new->save();
    }

    // Find by user ID
    public static function findByUserId($user_id)
    {
        $sql = "SELECT * FROM " . self::$table_name . " WHERE user_id = :user_id LIMIT 1";
        $stmt = self::executeQuery($sql, ['user_id' => $user_id]);
        return $stmt->fetchObject(self::class);
    }

    // Get token by user ID
    public static function getTokenByUserId($user_id)
    {
        $device = self::findByUserId($user_id);
        return $device ? $device->device_token : null;
    }
}
