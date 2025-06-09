import React from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi';

const CartQuantityChange = ({ increaseQuantity, decreaseQuantity, quantity }) => {
  return (
    <>
      <div className="flex flex-auto w-32 border-gray-500 items-center border rounded-full">
        <button
          className="w-10 h-10 rounded-full  border-gray-300 flex items-center justify-center text-gray-600"
          onClick={decreaseQuantity}
        >
          <FiMinus className="h-4 w-4" />
        </button>
        <span className="mx-6 text-gray-700">{quantity}</span>
        <button
          className="w-10 h-10 rounded-full border-gray-300 flex items-center justify-center text-gray-600"
          onClick={increaseQuantity}
        >
          <FiPlus className="h-4 w-4" />
        </button>
      </div>
    </>
  )
}

export default CartQuantityChange