import React, { useState } from 'react'
import { CiCircleInfo, CiHeart } from 'react-icons/ci';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CartQuantityChange from '../components/Cart/CartQuantityChange';
import AddToCartButton from '../components/Cart/AddToCartButton';

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(0);
    const [selectedColor, setSelectedColor] = useState('yellow');
    const [selectedSize, setSelectedSize] = useState('M');

    const colors = [
        { name: 'yellow', class: 'bg-yellow-400' },
        { name: 'orange', class: 'bg-orange-500' },
        { name: 'pink', class: 'bg-pink-400' },
        { name: 'cyan', class: 'bg-cyan-400' },
        { name: 'blue', class: 'bg-blue-500' },
        { name: 'black', class: 'bg-black' },
        { name: 'purple', class: 'bg-purple-500' },
        { name: 'red', class: 'bg-red-500' },
    ];

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="bg-gray-50 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Link to="/home" className="hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1"><path d="m12 19-7-7 7-7" /></svg>
                        Back to Home</Link>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-gray-700">Product Details</span>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Product Image */}
                        <div className="flex justify-center items-center">
                            <img
                                src="https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg"
                                alt="2024 Winter fashion hoody"
                                className="max-w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Product Details */}
                        <div>
                            <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-2 text-gray-600">4.7 (30 Reviews)</span>
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 mb-2">2024 Winter fashion hoody</h1>

                            <div className="mb-4">
                                <div className="flex items-center mb-1">
                                    <span className="text-gray-600 mr-2">Brand:</span>
                                    <span className="font-medium">ZARA</span>
                                </div>
                                <div className="flex items-center mb-1">
                                    <span className="text-gray-600 mr-2">Category:</span>
                                    <span className="font-medium">Women's Clothing</span>
                                </div>
                                <div className="flex items-center mb-1">
                                    <span className="text-gray-600 mr-2">Availability:</span>
                                    <span className="text-green-600 font-medium">In Stock</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600 mr-2">Seller:</span>
                                    <span className="font-medium">Zara</span>
                                    <CiCircleInfo className="ml-1 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-2xl font-bold text-blue-600">NGN 30,500</p>
                            </div>

                            {/* Color Selection */}
                            <div className="mb-6">
                                <p className="text-gray-700 mb-2">Color: <span className="font-medium">Yellow</span></p>
                                <div className="flex space-x-3">
                                    {colors.map((color) => (
                                        <button
                                            key={color.name}
                                            className={`w-8 h-8 rounded-full ${color.class} ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                                            onClick={() => setSelectedColor(color.name)}
                                            aria-label={`Select ${color.name} color`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-gray-700">Size:</p>
                                    <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center">
                                        Size guide
                                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex space-x-3">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`w-10 h-10 rounded-full border ${selectedSize === size ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-6">
                                <p className="text-gray-700 mb-2">Quantity</p>
                                <CartQuantityChange increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    quantity={quantity} />
                            </div>

                            {/* Add to Cart */}
                            <div className="flex space-x-3">
                                <AddToCartButton isDetails={true} />
                            </div>

                            {/* Delivery Info */}
                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery & Returns</h3>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-gray-700">Hanzel Logistics</p>
                                    <a href="#" className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                                        More Options
                                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="flex items-start mb-2">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-700">Delivery: Dec. 18 - Jan. 05</p>
                                        <p className="text-gray-500 text-sm">Free delivery on thousands of products in Lagos, Ibadan & Abuja</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails