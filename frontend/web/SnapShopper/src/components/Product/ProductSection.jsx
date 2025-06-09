import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import ProductCard from "./ProductCard";
import { LuArrowBigRight } from "react-icons/lu";

const ProductSection = ({ title, subtitle }) => {
  const { isLoading, setIsLoading } = useLoading();
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for products
  const products = [
    {
      id: 1,
      title: "Women Square Neck Bodice Side Slit Flare Midi Dresses",
      category: "Women's Clothing",
      size: "M",
      color: "Beige",
      rating: 4,
      reviews: 230,
      originalPrice: 60.0,
      salePrice: 35.5,
      sale: true,
      image:
        "https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg",
    },
    {
      id: 2,
      title: "Women Square Neck Bodice Side Slit Flare Midi Dresses",
      category: "Women's Clothing",
      size: "L",
      color: "Black",
      rating: 5,
      reviews: 180,
      originalPrice: 60.0,
      salePrice: 35.5,
      sale: true,
      image:
        "https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg",
    },
    {
      id: 3,
      title: "Women Square Neck Bodice Side Slit Flare Midi Dresses",
      category: "Women's Clothing",
      size: "S",
      color: "Pink",
      rating: 4,
      reviews: 150,
      originalPrice: 60.0,
      salePrice: 35.5,
      sale: true,
      image:
        "https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg",
    },
    {
      id: 4,
      title: "Women Square Neck Bodice Side Slit Flare Midi Dresses",
      category: "Women's Clothing",
      size: "XS",
      color: "Black",
      rating: 5,
      reviews: 320,
      originalPrice: 60.0,
      salePrice: 35.5,
      sale: true,
      image:
        "https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg",
    },
    {
      id: 5,
      title: "Women Square Neck Bodice Side Slit Flare Midi Dresses",
      category: "Women's Clothing",
      size: "XL",
      color: "Pink",
      rating: 4,
      reviews: 205,
      originalPrice: 60.0,
      salePrice: 35.5,
      sale: true,
      image:
        "https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg",
    },
  ];

  // Duplicate for second row
  const productsRow2 = products.map(p => ({ 
    ...p, 
    id: p.id + 100,
    title: `${p.title} - Premium Edition`
  }));

  const allProducts = [...products, ...productsRow2];

//   const handleLoadMore = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setCurrentPage(prev => prev + 1);
//     }, 1000);
//   };

  return (
    <div className="py-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {title}
              </h2>
              {subtitle && (
                <p className="text-base text-gray-600">{subtitle}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View All Link */}
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 group">
                <span>View All</span>
                <LuArrowBigRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          {/* <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{allProducts.length} Products Available</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>{products.filter(p => p.sale).length} On Sale</span>
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Updated 2 minutes ago
            </div>
          </div> */}
        </div>

        {/* Products Grid - 4 products per row */}
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-fade-in-up"
              >
                <ProductCard product={product} isDiscounted={index % 2 === 0} />
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productsRow2.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${(index + 5) * 100}ms` }}
                className="animate-fade-in-up"
              >
                <ProductCard product={product} isDiscounted={index % 3 === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Load More Section - Commented Out */}
        {/* <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Loading More Products...</span>
              </>
            ) : (
              <>
                <span>Load More Products</span>
                <LuArrowBigRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div> */}
      </div>

      {/* Custom CSS for animations */}
      {/* <style jsx>
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      </style> */}
    </div>
  );
};


export default ProductSection;
