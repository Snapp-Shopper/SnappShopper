<?php
class auditLog extends DatabaseObject
{
    // Table name
    protected static $table_name = "Audit_Logs";
    protected static $primary_key = 'log_id';

    // Database columns
    protected static $db_columns = [
        'log_id',
        'user_id',
        'action',
        'action_date',
        'description'
    ];

    // Class properties
    public $log_id;
    public $user_id;
    public $action;
    public $action_date;
    public $description;

    // Constructor
    public function __construct($args = [])
    {
        $this->log_id       = $args['log_id'] ?? null;
        $this->user_id      = $args['user_id'] ?? null;
        $this->action       = $args['action'] ?? '';
        $this->action_date  = $args['action_date'] ?? date('Y-m-d H:i:s');
        $this->description  = $args['description'] ?? '';
    }

    /**
     * Save the audit log entry to the database.
     */
    public function saveAuditLog()
    {
        $errors = $this->validate();
        if (!empty($errors)) {
            return [
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $errors
            ];
        }

        $saved = $this->save();

        return $saved
            ? ['status' => 'success', 'message' => 'Audit log saved successfully']
            : ['status' => 'error', 'message' => 'Failed to save audit log'];
    }

    /**
     * Validate audit log data
     */
    public function validate()
    {
        $errors = [];

        if (empty($this->user_id)) {
            $errors[] = "User ID is required.";
        }
        if (empty($this->action)) {
            $errors[] = "Action field is required.";
        }
        if (empty($this->description)) {
            $errors[] = "Description is required.";
        }

        return $errors;
    }

    /**
     * Retrieve all logs for a specific user
     */
    public static function findLogsByUserId($user_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE user_id = :user_id ORDER BY action_date DESC";
        $stmt = static::executeQuery($sql, ['user_id' => $user_id]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(fn($row) => new static($row), $results);
    }

    /**
     * Find a single audit log by log ID
     */
    public static function findLogById($log_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE log_id = :log_id LIMIT 1";
        $stmt = static::executeQuery($sql, ['log_id' => $log_id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ? new static($result) : null;
    }

    /**
     * Retrieve all logs (admin/reporting)
     */
    public static function findAllLogs()
    {
        $sql = "SELECT * FROM " . static::$table_name . " ORDER BY action_date DESC";
        $stmt = static::executeQuery($sql);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(fn($row) => new static($row), $results);
    }

    public static function audit($user_id, $action, $description)
    {
        $log = new self([
            'user_id' => $user_id,
            'action' => $action,
            'description' => $description,
            'action_date' => date('Y-m-d H:i:s')
        ]);
        return $log->saveAuditLog();
    }
}

?>
