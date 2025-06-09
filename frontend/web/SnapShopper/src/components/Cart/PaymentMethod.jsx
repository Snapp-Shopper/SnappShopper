import React from 'react'

const PaymentMethod = ({ name }) => {
    const getIcon = () => {
      switch(name) {
        case 'visa':
          return (
            <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-800 text-xs font-bold">
              VISA
            </div>
          );
        case 'mastercard':
          return (
            <div className="w-10 h-6 bg-orange-100 rounded flex items-center justify-center text-orange-800 text-xs font-bold">
              MC
            </div>
          );
        case 'paypal':
          return (
            <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-800 text-xs font-bold">
              PayP
            </div>
          );
        case 'amex':
          return (
            <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-800 text-xs font-bold">
              AMEX
            </div>
          );
        case 'googlePay':
          return (
            <div className="w-10 h-6 bg-red-100 rounded flex items-center justify-center text-red-800 text-xs font-bold">
              G Pay
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
      <div className="border border-gray-300 rounded p-1">
        {getIcon()}
      </div>
    );
  };

export default PaymentMethod