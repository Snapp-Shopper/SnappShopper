<?php

class order_Item extends DatabaseObject
{
    // Table name
    static protected $table_name = "Order_Items";
    static protected $primary_key = 'order_item_id';

    // Database columns
    static protected $db_columns = [
        'order_item_id',
        'order_id',
        'product_id',
        'quantity',
        'price_at_purchase',
        'created_at'
    ];

    // Class properties for each column
    public $order_item_id;
    public $order_id;
    public $product_id;
    public $quantity;
    public $price_at_purchase;
    public $created_at;

    // Constructor
    public function __construct($args = [])
    {
        $this->order_item_id = $args['order_item_id'] ?? null;
        $this->order_id = $args['order_id'] ?? null;
        $this->product_id = $args['product_id'] ?? null;
        $this->quantity = $args['quantity'] ?? 0;
        $this->price_at_purchase = $args['price_at_purchase'] ?? 0.00;
        $this->created_at = $args['created_at'] ?? null;
    }

    // Sync inventory and stock after purchase
    public static function syncStockAndInventory($product_id, $quantity)
    {
        $product = self::findById($product_id);
        if (!$product) {
            return ['status' => 'error', 'message' => 'Product not found'];
        }

        if ($product->stock < $quantity) {
            return ['status' => 'error', 'message' => 'Insufficient stock for product ID ' . $product_id];
        }

        // Deduct stock from product
        $product->stock -= $quantity;
        $product->updated_at = date('Y-m-d H:i:s');
        $product->save();

        // Update or create inventory record
        $inventory = inventory::findByProductId($product_id);
        if ($inventory) {
            $inventory->quantity_available -= $quantity;
            $inventory->quantity_sold += $quantity;
            $inventory->last_updated = date('Y-m-d H:i:s');
            $inventory->save();
        } else {
            $inventory = new inventory([
                'product_id' => $product_id,
                'quantity_available' => 0,
                'quantity_sold' => $quantity,
                'last_updated' => date('Y-m-d H:i:s')
            ]);
            $inventory->save();
        }

        return ['status' => 'success', 'message' => 'Stock and inventory updated'];
    }


    // Create or update an order item
    public function saveOrderItem()
    {
        $errors = $this->validate();

        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        // Check and sync product stock and inventory
        $syncResult = products::syncStockAndInventory($this->product_id, $this->quantity);
        if ($syncResult['status'] !== 'success') {
            return $syncResult;
        }

        $this->created_at = date('Y-m-d H:i:s');
        $saveQuery = $this->save();

        if ($saveQuery) {
            $log = new auditLog([
                'user_id' => $this->order_id,
                'action' => $this->order_item_id ? 'update_order_item' : 'create_order_item',
                'action_date' => date('Y-m-d H:i:s'),
                'description' => "Order item saved. Product ID {$this->product_id} - Quantity {$this->quantity}"
            ]);
            $log->saveAuditLog();
        }

        return $saveQuery
            ? ['status' => 'success', 'message' => 'Order item saved and stock updated']
            : ['status' => 'error', 'message' => 'Failed to save order item'];
    }


    // Retrieve all order items for a specific order
    static public function findOrderItemsByOrderId($order_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE order_id = :order_id";
        $stmt = self::executeQuery($sql, ['order_id' => $order_id]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map([static::class, 'instantiate'], $results);
    }

    // Retrieve a specific order item by its ID
    static public function findOrderItemById($order_item_id)
    {
        return self::findById($order_item_id);
    }

    public function updateItem($data = [])
    {
        // Update fields if provided
        $this->quantity = $data['quantity'] ?? $this->quantity;
        $this->price_at_purchase = $data['price_at_purchase'] ?? $this->price_at_purchase;
        $this->updated_at = date('Y-m-d H:i:s');

        // Validate
        $errors = $this->validate();
        if (!empty($errors)) {
            return ['status' => 'error', 'message' => 'Validation failed', 'errors' => $errors];
        }

        // Save
        $saved = $this->save();
        if ($saved) {
            // Update inventory
            $inventory = inventory::findByProductId($this->product_id);
            if ($inventory) {
                $inventory->quantity_available -= $this->quantity;
                $inventory->quantity_sold += $this->quantity;
                $inventory->last_updated = date('Y-m-d H:i:s');
                $inventory->save();
            } else {
                // Create new inventory record if not exists
                $inventory = new inventory([
                    'product_id' => $this->product_id,
                    'quantity_available' => 0,
                    'quantity_sold' => 0,
                    'last_updated' => date('Y-m-d H:i:s')
                ]);
                $inventory->save();
            }
        }

        return $saved
            ? ['status' => 'success', 'message' => 'Order item updated successfully']
            : ['status' => 'error', 'message' => 'Failed to update order item'];
    }


    // Validation for order item fields
    protected function validate()
    {
        $this->errors = [];

        if (empty($this->order_id)) {
            $this->errors[] = "Order ID is required.";
        }

        if (empty($this->product_id)) {
            $this->errors[] = "Product ID is required.";
        }

        if (empty($this->quantity) || $this->quantity <= 0) {
            $this->errors[] = "Quantity must be a positive integer.";
        }

        if (empty($this->price_at_purchase) || $this->price_at_purchase <= 0) {
            $this->errors[] = "Price at purchase must be a positive amount.";
        }

        return $this->errors;
    }

    // Calculate the total price for this order item
    public function calculateTotalPrice()
    {
        return $this->quantity * $this->price_at_purchase;
    }
}

?>
