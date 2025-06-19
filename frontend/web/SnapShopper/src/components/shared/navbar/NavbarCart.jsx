import React from "react";
import { Link } from "react-router-dom";

const NavbarCart = ({ cartDropdownRef }) => {
  return (
    <>
      <div
        ref={cartDropdownRef}
        className="absolute right-0 mt-2 w-80 sm:w-80 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-lg shadow-lg z-50 border border-gray-200"
      >
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">Shopping Cart</h3>

          {/* Empty Cart State */}
          <div className="flex flex-col items-center py-2">
            <div className="w-32 h-32 mb-2">
              <svg viewBox="0 0 100 100" className="text-blue-500">
                <path
                  d="M25,30 L75,30 L68,70 L32,70 Z M40,80 A5,5 0 1 1 40,70 A5,5 0 0 1 40,80 Z M60,80 A5,5 0 1 1 60,70 A5,5 0 0 1 60,80 Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="rgba(59, 130, 246, 0.2)"
                />
              </svg>
            </div>
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <Link
              to={"/user/cart"}
              className="w-full py-2 bg-blue-600 text-center text-white rounded-full font-medium hover:bg-blue-700 transition duration-200"
            >
              Go to cart
            </Link>
          </div>

          {/* You can add the populated cart state here, currently hidden since cart is empty */}
          {/* 
                        <div className="hidden"> 
                          <div className="max-h-64 overflow-y-auto mb-4">
                            {cartItems.map(item => (
                              <CartItem key={item.id} item={item} />
                            ))}
                          </div>
                          
                          <div className="border-t pt-3">
                            <div className="flex justify-between font-medium mb-3">
                              <span>Subtotal</span>
                              <span>$129.99</span>
                            </div>
                            
                            <div className="flex space-x-3">
                              <button className="flex-1 py-2 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50">
                                View Cart
                              </button>
                              <button className="flex-1 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
                                Checkout
                              </button>
                            </div>
                          </div>
                        </div>
                        */}
        </div>
      </div>
    </>
  );
};

export default NavbarCart;
