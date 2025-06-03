import React, { createContext, useCallback, useEffect, useState } from 'react'
import CartService from '../services/CartService';

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const loadCartFromLocalStorage = () => {
        const savedCart = JSON.parse(sessionStorage.getItem("guestCart")) || [];
        setCartItems(savedCart);
        setCartCount(savedCart.length);
        //setCartCount(savedCart.reduce((acc, item) => acc + item.quantity, 0));
    };

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (token) {
            //fetchCartItems();
        } else {
            loadCartFromLocalStorage();
        }
    }, []);

    const fetchCartItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await CartService.getCartItems();
            setCartItems(response?.data?.data || []);
            setCartCount(response?.data?.data?.length || 0);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Sync local cart to API after login
    const syncCartToAPI = async () => {
        const guestCart = JSON.parse(sessionStorage.getItem("guestCart")) || [];
        if (guestCart.length === 0) return;

        try {
            for (const item of guestCart) {
                await CartService.addToCart({ foodId: item.id, quantity: item.quantity });
            }
            sessionStorage.removeItem("guestCart");
            fetchCartItems(); // Refresh the cart from API
        } catch (error) {
            console.error("Error syncing cart:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                isLoading,
                //addToCart,
                //removeFromCart,
                //updateCart,
                //syncCartToAPI
            }}
        >
            {children}
        </CartContext.Provider>
    );

};

export default CartContext;
