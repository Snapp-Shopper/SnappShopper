<?php

class cart extends DatabaseObject
{
    // Table name
    static protected $table_name = "Cart";
    static protected $primary_key = 'cart_id';

    // Database columns
    static protected $db_columns = [
        'cart_id',
        'user_id',
        'created_at',
        'updated_at'
    ];

    // Class properties for each column
    public $cart_id;
    public $user_id;
    public $created_at;
    public $updated_at;

    // Constructor
    public function __construct($args = [])
    {
        $this->cart_id = $args['cart_id'] ?? null;
        $this->user_id = $args['user_id'] ?? null;
        $this->created_at = $args['created_at'] ?? date('Y-m-d H:i:s');
        $this->updated_at = $args['updated_at'] ?? date('Y-m-d H:i:s');
    }
    // Retrieve the price of a product by its ID
    public function getProductPrice($product_id)
    {
        $sql = "SELECT price FROM Products WHERE product_id = :product_id LIMIT 1";
        $stmt = self::executeQuery($sql, ['product_id' => $product_id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['price'] : 0;
    }
    // Add a product to the cart
    public function addToCart($product_id, $quantity, $price_at_addition)
    {
        // Check if the product is already in the cart
        $existingItem = cartItem::findItemInCart($this->cart_id, $product_id);

        if ($existingItem) {
            // If the product is already in the cart, update the quantity
            $result = $existingItem->updateQuantity($quantity);
            if ($result) {
                $log = new auditLog([
                    'user_id' => $this->user_id,
                    'action' => 'update_cart_quantity',
                    'action_date' => date('Y-m-d H:i:s'),
                    'description' => "User updated quantity for product ID $product_id in cart"
                ]);
                $log->saveAuditLog();
            }
            return $result;
        } else {
            // Add the new product to the cart
            $cartItem = new cartItem([
                'cart_id' => $this->cart_id,
                'product_id' => $product_id,
                'quantity' => $quantity,
                'price_at_addition' => $price_at_addition ?? $this->getProductPrice($product_id),
                'added_date' => date('Y-m-d H:i:s')
            ]);
            $saveResult = $cartItem->save();
            if ($saveResult) {
                $log = new auditLog([
                    'user_id' => $this->user_id,
                    'action' => 'add_to_cart',
                    'action_date' => date('Y-m-d H:i:s'),
                    'description' => "User added product ID $product_id to cart with quantity $quantity"
                ]);
                $log->saveAuditLog();
            }
            return $saveResult
                ? ['status' => 'success', 'message' => 'Product added to cart']
                : ['status' => 'error', 'message' => 'Failed to add product to cart'];
        }
    }

    // Remove a product from the cart
    public function removeFromCart($product_id)
    {
        $sql = "DELETE FROM Cart_Items WHERE cart_id = :cart_id AND product_id = :product_id";
        $stmt = self::executeQuery($sql, ['cart_id' => $this->cart_id, 'product_id' => $product_id]);
        if ($stmt) {
            $log = new auditLog([
            'user_id' => $this->user_id,
            'action' => 'remove_from_cart',
            'action_date' => date('Y-m-d H:i:s'),
            'description' => "User removed product ID $product_id from cart"
            ]);
            $log->saveAuditLog();
        }
        return $stmt
            ? ['status' => 'success', 'message' => 'Product removed from cart']
            : ['status' => 'error', 'message' => 'Failed to remove product from cart'];
    }

    // Retrieve all items in the cart
    public function getItemsInCart()
    {
        return cartItem::findItemsByCartId($this->cart_id);
    }

    // Update the quantity of a product in the cart
    public function updateItemQuantity($product_id, $quantity)
    {
        $cartItem = cartItem::findItemInCart($this->cart_id, $product_id);
        
        if ($cartItem) {
            $result = $cartItem->updateQuantity($quantity);
            if ($result) {
                $log = new auditLog([
                    'user_id' => $this->user_id,
                    'action' => 'update_cart_quantity',
                    'action_date' => date('Y-m-d H:i:s'),
                    'description' => "User updated quantity for product ID $product_id in cart"
                ]);
                $log->saveAuditLog();
            }
            return $result
                ? ['status' => 'success', 'message' => 'Product quantity updated in cart']
                : ['status' => 'error', 'message' => 'Failed to update product quantity in cart'];
        }

        return ['status' => 'error', 'message' => 'Product not found in cart'];
    }

    // Retrieve cart by user ID
    public static function findByUserId($user_id)
    {
        $sql = "SELECT * FROM " . static::$table_name . " WHERE user_id = :user_id LIMIT 1";
        $stmt = self::executeQuery($sql, ['user_id' => $user_id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ? static::instantiate($result) : false;
    }


    // Get the total price of all items in the cart
    public function getTotalPrice()
    {
        $total = 0;
        $items = $this->getItemsInCart();
        
        foreach ($items as $item) {
            $total += $item->getTotalPrice();
        }

        return $total;
    }

    // Check if the cart is empty
    public function isEmpty()
    {
        return count($this->getItemsInCart()) === 0;
    }

    // Clear the cart
    public static function clearCart($items, $user_id)
    {   
        $success = true;
        foreach ($items as $item) {
            $sql = "DELETE FROM Cart_Items WHERE cart_item_id = :id";
            $stmt = self::executeQuery($sql, ['id' => $item->cart_item_id]);
            if (!$stmt) {
                $success = false;
            }
            if ($success) {
            $log = new auditLog([
                    'user_id' => $user_id,
                    'action' => 'clear_cart',
                    'action_date' => date('Y-m-d H:i:s'),
                    'description' => "User cleared the cart"
                ]);
                $log->saveAuditLog();
            }
            return [
                'status' => $success ? 'success' : 'error',
                'message' => $success ? 'Cart cleared successfully' : 'Failed to clear cart'
            ];
        }
    }
}

?>
