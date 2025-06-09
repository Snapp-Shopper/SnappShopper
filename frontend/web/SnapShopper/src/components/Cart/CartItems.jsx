import React, { useState } from 'react'
import CartItem from './CartItem';

const CartItems = () => {
    const [selectedAll, setSelectedAll] = useState(false);

    const cartItems = [
        {
            id: 1,
            title: '2024 summer fashion new style waist slimming square neck bodice side slit flare mini dress',
            image: 'https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg',
            store: 'ZARA',
            category: 'Women\'s Clothing',
            price: 'NGN 30,500',
            quantity: 2,
            color: 'black'
        },
        {
            id: 2,
            title: '2024 summer fashion new style waist slimming square neck bodice side slit flare mini dress',
            image: 'https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg',
            store: 'ZARA',
            category: 'Women\'s Clothing',
            price: 'NGN 30,500',
            quantity: 1,
            color: 'yellow'
        },
        {
            id: 3,
            title: '2024 summer fashion new style waist slimming square neck bodice side slit flare mini dress',
            image: 'https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg',
            store: 'ZARA',
            category: 'Women\'s Clothing',
            price: 'NGN 30,500',
            quantity: 0,
            color: 'black'
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 group">
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={() => setSelectedAll(!selectedAll)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <span className="ml-2 text-sm">Select all items (5)</span>
            </div>

            <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CartItems