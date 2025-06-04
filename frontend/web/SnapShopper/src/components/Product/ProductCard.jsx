import React, { useState } from 'react'
import { GrFormView } from 'react-icons/gr';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import AddToCartButton from '../Cart/AddToCartButton';

const ProductCard = ({ product, isDiscounted }) => {

  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className={`overflow-hidden relative  ${isHovered ? 'bg-white rounded-md shadow-md' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      {/* Sale Tag */}
      {product.sale && (
        <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
          SALE
        </div>
      )}

      {/* Discount Tag */}
      {isDiscounted && (
        <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
          {product.discount}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
        <svg className="h-5 w-5 text-zinc-400 hover:text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>

      {/* Product Image */}
      <div className="h-40 bg-zinc-200 flex items-center justify-center overflow-hidden">
        <img src={product.image} alt={product.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* View More Button - Only visible on hover */}
        <div className={`absolute left-3 top-[40%] flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link className="flex bg-white rounded-full px-2 py-0.5 text-xs text-blue-600 shadow-md"
            to={"/product/details"}>
            <GrFormView className="h-4 w-5" />
            View more
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        <p className="text-xs text-zinc-600 mb-1">{product.category}</p>
        <h3 className="text-sm font-medium text-zinc-800 mb-1">{product.title}</h3>
        <p className="text-xs mb-2">
          <span className="inline-block bg-zinc-100 px-1 text-zinc-600 rounded mr-1">Size: {product.size}</span>
          <span className="text-zinc-600">{product.color}</span>
        </p>

        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-3 w-3" viewBox="0 0 20 20" fill={i < product.rating ? "currentColor" : "none"} stroke="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-zinc-500 ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-zinc-500 line-through">${product.originalPrice.toFixed(2)}</span>
            <span className="text-sm font-bold text-zinc-800 ml-1">NOW ${product.salePrice.toFixed(2)}</span>
          </div>
          
          <AddToCartButton/>
        </div>
      </div>
    </div>
  );
};

export default ProductCard