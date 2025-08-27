<?php

class orders extends DatabaseObject
{
    // Table name
    static protected $table_name = "Orders";
    static protected $primary_key = 'order_id';

    // Database columns
    static protected $db_columns = [
        'order_id',
        'order_no', // <-- added
        'user_id',
        'order_date',
        'status',
        'total_amount',
        'created_at',
        'updated_at'
    ];

    // Class properties for each column
    public $order_id;
    public $order_no; // <-- added
    public $user_id;
    public $order_date;
    public $status;
    public $total_amount;
    public $created_at;
    public $updated_at;

    // Constructor
    public function __construct($args = [])
    {
        $this->order_id = $args['order_id'] ?? null;
        $this->order_no = $args['order_no'] ?? null; // <-- added
        $this->user_id = $args['user_id'] ?? null;
        $this->order_date = $args['order_date'] ?? null;
        $this->status = $args['status'] ?? 'Pending';
        $this->total_amount = $args['total_amount'] ?? 0.00;
        $this->created_at = $args['created_at'] ?? null;
        $this->updated_at = $args['updated_at'] ?? null;
    }

    // Create or update an order
    public function saveOrder()
    {
        $errors = $this->validate();

        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        if (empty($this->order_no)) {
            $this->order_no = self::generateUniqueOrderNo();
        }
        // Set created_at and updated_at to current timestamp if not set
        $this->created_at = date('Y-m-d H:i:s');
        $this->updated_at = date('Y-m-d H:i:s');

        $saveQuery = $this->save();
        if ($saveQuery) {
            // Log the order creation or update
            auditLog::audit($this->user_id, $this->order_id ? 'update_order' : 'create_order', "Order ID {$this->order_id} " . ($this->order_id ? 'updated' : 'created'));
        }
        return $saveQuery
            ? ['status' => 'success', 'message' => 'Order saved successfully']
            : ['status' => 'error', 'message' => 'Failed to save order'];
    }

    // Retrieve all orders
    static public function allOrders()
    {
        return self::findAll();
    }

    // Retrieve orders by user ID
    static public function findOrdersByUserId($user_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE user_id = :user_id";
        $stmt = self::executeQuery($sql, ['user_id' => $user_id]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map([static::class, 'instantiate'], $results);
    }

    // Retrieve order by ID
    static public function findOrderById($order_id)
    {
        return self::findById($order_id);
    }

    // Update order status
    public function updateStatus($new_status)
    {
        $valid_statuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

        if (!in_array($new_status, $valid_statuses)) {
            return ['status' => 'error', 'message' => 'Invalid order status'];
        }

        $this->status = $new_status;
        $this->updated_at = date('Y-m-d H:i:s');
        if ($this->save()) {
            auditLog::audit($this->user_id, 'update_order_status', "Order ID {$this->order_id} status updated to {$this->status}");
            // Optionally, send a notification to the user
            notification::notify($this->user_id, "Your order status has been updated to {$$this->status}.", 'Order');
            // Optionally, send a push notification
            $deviceToken = DeviceToken::getTokenByUserId($this->user_id);
            if ($deviceToken) {
                PushNotifier::sendToDevice(
                    $deviceToken,
                    "Order Status Update",
                    "Your order status has been updated to {$this->status}.",
                    ['order_id' => $this->order_id, 'status' => $this->status]
                );
            }
            // Return success response
            return ['status' => 'success', 'message' => 'Order status updated successfully'];
        }

        return ['status' => 'error', 'message' => 'Failed to update order status'];
    }

    // Validation for order fields
    protected function validate()
    {
        $this->errors = [];

        if (empty($this->user_id)) {
            $this->errors[] = "User ID is required.";
        }

        if (empty($this->total_amount) || $this->total_amount <= 0) {
            $this->errors[] = "Total amount must be greater than 0.";
        }

        return $this->errors;
    }

    // Retrieve pending orders
    static public function findPendingOrders()
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE status = 'Pending'";
        $stmt = self::executeQuery($sql);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map([static::class, 'instantiate'], $results);
    }

    // Retrieve orders within a date range
    static public function findOrdersByDateRange($start_date, $end_date)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE order_date BETWEEN :start_date AND :end_date";
        $stmt = self::executeQuery($sql, ['start_date' => $start_date, 'end_date' => $end_date]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map([static::class, 'instantiate'], $results);
    }

    // Generate a unique order number
    static protected function generateUniqueOrderNo()
    {
        do {
            $random = 'ORD-' . strtoupper(uniqid());
            $sql = "SELECT COUNT(*) FROM " . self::$table_name . " WHERE order_no = :order_no";
            $stmt = self::executeQuery($sql, ['order_no' => $random]);
            $count = $stmt->fetchColumn();
        } while ($count > 0);

        return $random;
    }
}

?>
