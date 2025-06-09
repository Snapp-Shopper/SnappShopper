import React from 'react'
import PaymentMethod from './PaymentMethod';

const PaymentOptions = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200 group">
        <h2 className="text-lg font-medium mb-4">Pay with</h2>
        <div className="flex space-x-2">
          <PaymentMethod name="visa" />
          <PaymentMethod name="mastercard" />
          <PaymentMethod name="paypal" />
          <PaymentMethod name="amex" />
          <PaymentMethod name="googlePay" />
        </div>
      </div>
    );
  };

export default PaymentOptions