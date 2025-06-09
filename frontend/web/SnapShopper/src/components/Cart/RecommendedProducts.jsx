import React, { useState } from 'react'
// import ProductCard from '../Product/ProductCard';
import ProductCard from './ProductCard';

// const RecommendedProducts = () => {
//     return (
//         <div>
//             <h2 className="text-xl font-medium mb-6">More to Love</h2>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 {Array(5).fill().map((_, index) => (
//                     <ProductCard key={index} />
//                 ))}
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
//                 {Array(5).fill().map((_, index) => (
//                     <ProductCard key={index + 5} />
//                 ))}
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
//                 {Array(5).fill().map((_, index) => (
//                     <ProductCard key={index + 10} />
//                 ))}
//             </div>
//             <div className="flex justify-center mt-6">
//                 <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
//                     View more
//                 </button>
//             </div>
//         </div>
//     );
// };

const RecommendedProducts = () => {
  const [showAll, setShowAll] = useState(false);
  const productsToShow = showAll ? 15 : 10;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">More to Love</h2>
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
        >
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array(productsToShow).fill().map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts