import React from 'react'
import { FiHeart } from 'react-icons/fi';

const ProductCard = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 group">
            <div className="relative">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <div className="w-full h-full bg-black"></div>
                </div>
                <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <FiHeart className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                </button>
            </div>
            <div className="p-2">
                <h3 className="text-xs font-medium line-clamp-2">Women Square Neck Bodice Side Slit Flare Mini Dresses</h3>
                <div className="flex items-center mt-1 text-xs">
                    <span className="text-gray-600 mr-1">Seller:</span>
                    <span>Zara</span>
                </div>
                <div className="flex items-center mt-1">
                    <div className="flex items-center">
                        {Array(5).fill().map((_, i) => (
                            <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">(300)</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-medium text-sm">NGN 30,500</span>
                    <button className="w-6 h-6 bg-blue-500 text-white rounded-md flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

// const ProductCard = ({ product }) => {
//   const [isFavorited, setIsFavorited] = useState(false);

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-200">
//       <div className="relative">
//         <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
//           {product?.image ? (
//             <img src={product.image} alt={product?.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//           ) : (
//             <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
//           )}
//         </div>
//         <button 
//           onClick={() => setIsFavorited(!isFavorited)}
//           className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200"
//         >
//           <Heart 
//             className={`w-4 h-4 transition-colors duration-200 ${
//               isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'
//             }`} 
//           />
//         </button>
//       </div>
      
//       <div className="p-3">
//         <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
//           {product?.title || "Women Square Neck Bodice Side Slit Flare Mini Dresses"}
//         </h3>
        
//         <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
//           <span>Seller:</span>
//           <span className="font-medium text-gray-900">{product?.seller || "Zara"}</span>
//         </div>
        
//         <div className="flex items-center gap-1 mb-3">
//           <div className="flex items-center">
//             {Array(5).fill().map((_, i) => (
//               <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
//             ))}
//           </div>
//           <span className="text-xs text-gray-500">(300)</span>
//         </div>
        
//         <div className="flex items-center justify-between">
//           <span className="text-blue-600 font-semibold">
//             NGN {product?.price || "30,500"}
//           </span>
//           <button className="w-7 h-7 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors duration-200">
//             <Plus className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default ProductCard