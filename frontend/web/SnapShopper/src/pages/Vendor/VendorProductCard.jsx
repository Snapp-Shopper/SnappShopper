import React from 'react'
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { LuDollarSign } from 'react-icons/lu';

const VendorProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col transition-all duration-300 hover:shadow-md">
      <div className="flex-grow">
        {/* Product Image Placeholder */}
        <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = `https://placehold.co/400x300/E0E0E0/808080?text=No+Image`; // Fallback image
              }}
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center text-gray-800 font-bold text-lg mb-4">
          <LuDollarSign className="w-5 h-5 mr-1 text-green-600" />
          <span>{product.price}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          onClick={onEdit}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 tooltip"
          title="Edit Product"
        >
          <FiEdit3 className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 tooltip"
          title="Delete Product"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default VendorProductCard