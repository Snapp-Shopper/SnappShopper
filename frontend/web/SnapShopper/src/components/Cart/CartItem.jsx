import React, { useState } from 'react';
import CartQuantityChange from './CartQuantityChange';

const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const decreaseQuantity = () => {
        if (quantity > 0) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="py-4 flex">
            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 mt-1" />

            <div className="ml-4 flex-shrink-0 ">
                <div className="w-20 h-24 bg-gray-200 rounded-md overflow-hidden">
                    {item.color === 'yellow' ? (
                        <div className="w-full h-full bg-yellow-300"></div>
                    ) : (
                        <div className="w-full h-full bg-black"></div>
                    )}
                </div>
            </div>

            <div className="ml-4 flex-1">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-800 leading-tight">{item.title}</h3>
                        <div className="mt-1 text-xs text-gray-600">Store: {item.store}</div>
                        <div className="mt-1">
                            <span className="inline-block bg-gray-100 text-xs px-2 py-0.5 rounded">{item.category}</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div className="text-blue-600 font-medium">{item.price}</div>
                    <div className="flex items-center">
                        <CartQuantityChange increaseQuantity={increaseQuantity}
                                        decreaseQuantity={decreaseQuantity}
                                        quantity={quantity}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem