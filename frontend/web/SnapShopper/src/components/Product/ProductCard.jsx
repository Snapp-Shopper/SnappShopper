import React, { useState } from "react";
import { GrFormView } from "react-icons/gr";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import AddToCartButton from "../Cart/AddToCartButton";
import { LuEye, LuHeart, LuStar, LuTag, LuZap } from "react-icons/lu";

const ProductCard = ({ product, isDiscounted = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  return (
    <div
      className={`group relative bg-white rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 ${
        isHovered ? "shadow-2xl shadow-blue-100" : "shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-3 left-3 z-20 flex flex-col space-y-2">
        {product.sale && (
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            <div className="flex items-center space-x-1">
              <LuZap className="w-3 h-3" />
              <span>SALE</span>
            </div>
          </div>
        )}
        {isDiscounted && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            <div className="flex items-center space-x-1">
              <LuTag className="w-3 h-3" />
              <span>{product.discount || discountPercentage}% OFF</span>
            </div>
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
      >
        <LuHeart
          className={`w-5 h-5 transition-colors duration-300 ${
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-500"
          }`}
        />
      </button>

      {/* Product Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        <img
          src={product.image}
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Overlay Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Quick Actions - Visible on Hover */}
        <div
          className={`absolute inset-x-4 bottom-4 flex justify-between items-center transition-all duration-500 transform ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Link to={"/product/view"}
          className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95">
            <LuEye className="w-4 h-4" />
            <span className="text-sm font-medium">Quick View</span>
          </Link>

          <AddToCartButton product={product} size="md" />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 space-y-3">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {product.size}
            </span>
            <div
              className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                product.color.toLowerCase() === "black"
                  ? "bg-black"
                  : product.color.toLowerCase() === "white"
                  ? "bg-white border-gray-300"
                  : product.color.toLowerCase() === "pink"
                  ? "bg-pink-400"
                  : product.color.toLowerCase() === "beige"
                  ? "bg-amber-200"
                  : "bg-gray-400"
              }`}
            ></div>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-relaxed group-hover:text-blue-600 transition-colors duration-300">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <LuStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-sm text-gray-400 line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-lg font-bold text-gray-900">
                ${product.salePrice.toFixed(2)}
              </span>
            </div>
            <span className="text-xs text-green-600 font-semibold">
              Save ${(product.originalPrice - product.salePrice).toFixed(2)}
            </span>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
