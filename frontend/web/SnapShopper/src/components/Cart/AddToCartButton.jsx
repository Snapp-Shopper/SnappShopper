import React from 'react'
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaShoppingCart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';

const AddToCartButton = ({ isDetails = false }) => {
    return (
        <>
            {!isDetails ? (
                <>
                    <button className="bg-blue-600 text-white p-1 rounded">
                        <HiOutlineShoppingCart className="h-5 w-5" />
                    </button>
                </>
            ) : (
                <>
                    <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center justify-center">
                        <FaShoppingCart className="h-5 w-5 mr-2" />
                        Add To Cart
                    </button>
                    <button className="p-3 border border-zinc-300 rounded-md hover:bg-zinc-100">
                        <CiHeart className="h-5 w-5 text-zinc-600" />
                    </button>
                </>
            )}

        </>
    )
}

export default AddToCartButton