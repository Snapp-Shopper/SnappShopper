import React from 'react'
import { PiCreditCard, PiHeadphones, PiMedal } from 'react-icons/pi';

const ShoppingSecurityInfo = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 group">
        <h2 className="text-lg font-medium mb-4">Shopping Security</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="text-blue-500 mr-2">
              <PiMedal className="w-5 h-5" />
            </div>
            <div className="text-sm">Free 1 Year Warranty</div>
          </div>
          <div className="flex items-center">
            <div className="text-blue-500 mr-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-sm">Free Shipping & Fasted Delivery</div>
          </div>
          <div className="flex items-center">
            <div className="text-blue-500 mr-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-sm">100% Money-back guarantee</div>
          </div>
          <div className="flex items-center">
            <div className="text-blue-500 mr-2">
              <PiHeadphones className="w-5 h-5" />
            </div>
            <div className="text-sm">24/7 Customer support</div>
          </div>
          <div className="flex items-center">
            <div className="text-blue-500 mr-2">
              <PiCreditCard className="w-5 h-5" />
            </div>
            <div className="text-sm">Secure payment method</div>
          </div>
        </div>
      </div>
    );
  };

export default ShoppingSecurityInfo