import React from 'react'

const CartSummary = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200 group">
            <h2 className="text-lg font-medium mb-4">Summary</h2>
            <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-medium">NGN 0.00</span>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full transition duration-150">
                Checkout(0)
            </button>
        </div>
    );
};

export default CartSummary