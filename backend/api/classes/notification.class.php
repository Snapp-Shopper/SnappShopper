<?php

class notification extends DatabaseObject
{
    // Table name
    static protected $table_name = "Notifications";
    static protected $primary_key = 'notification_id';

    // Database columns
    static protected $db_columns = [
        'notification_id',
        'user_id',
        'message',
        'type',
        'status',
        'created_at'
    ];

    // Properties
    public $notification_id;
    public $user_id;
    public $message;
    public $type; // e.g. 'Order', 'Shipping', 'System'
    public $status = 'Unseen'; // 'Unseen', 'Seen'
    public $created_at;

    public function __construct($args = [])
    {
        $this->notification_id = $args['notification_id'] ?? null;
        $this->user_id         = $args['user_id'] ?? null;
        $this->message         = $args['message'] ?? '';
        $this->type            = $args['type'] ?? 'System';
        $this->status          = $args['status'] ?? 'Unseen';
        $this->created_at      = $args['created_at'] ?? date('Y-m-d H:i:s');
    }

    // Save notification
    public function saveNotification()
    {
        $errors = $this->validate();
        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        $saved = $this->save();
        return $saved
            ? ['status' => 'success', 'message' => 'Notification saved successfully']
            : ['status' => 'error', 'message' => 'Failed to save notification'];
    }

    // Validation
    public function validate()
    {
        $errors = [];

        if (empty($this->user_id)) {
            $errors[] = "User ID is required.";
        }
        if (empty($this->message)) {
            $errors[] = "Message cannot be empty.";
        }

        return $errors;
    }

    // Mark a notification as seen
    public function markAsSeen()
    {
        $this->status = 'Seen';
        return $this->save();
    }

    // Static: find by user
    public static function findNotificationsByUserId($user_id, $limit = 20)
    {
        $sql = "SELECT * FROM " . self::$table_name . " 
                WHERE user_id = :user_id 
                ORDER BY created_at DESC 
                LIMIT :limit";
        $stmt = self::executeQuery($sql, [
            'user_id' => $user_id,
            'limit' => $limit
        ]);
        return array_map([self::class, 'instantiate'], $stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // Static: mark all seen
    public static function markAllAsSeen($user_id)
    {
        $sql = "UPDATE " . self::$table_name . " SET status = 'Seen' WHERE user_id = :user_id";
        $stmt = self::executeQuery($sql, ['user_id' => $user_id]);
        return $stmt
            ? ['status' => 'success', 'message' => 'All notifications marked as seen']
            : ['status' => 'error', 'message' => 'Failed to mark all as seen'];
    }

    // Static: count unseen
    public static function countUnseen($user_id)
    {
        $sql = "SELECT COUNT(*) AS total FROM " . self::$table_name . " 
                WHERE user_id = :user_id AND status = 'Unseen'";
        $stmt = self::executeQuery($sql, ['user_id' => $user_id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['total'] ?? 0;
    }

    // Static: create notification helper
    public static function notify($user_id, $message, $type = 'System')
    {
        $notif = new self([
            'user_id' => $user_id,
            'message' => $message,
            'type' => $type
        ]);
        return $notif->saveNotification();
    }
}
