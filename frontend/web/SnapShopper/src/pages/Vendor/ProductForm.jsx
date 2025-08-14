import React from 'react'
import { LuDollarSign, LuImage, LuPackage, LuSave } from 'react-icons/lu';

const ProductForm = ({ product, onSuccess, onClose }) => {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } = useProductForm({
    initialProduct: product,
    onSuccess,
    onClose, // Passed for potential use in the hook, though onSuccess handles closing
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            <LuPackage className="w-4 h-4 inline mr-1" />
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
            placeholder="e.g., Organic Coffee Beans"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
            placeholder="A detailed description of your product..."
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            <LuDollarSign className="w-4 h-4 inline mr-1" />
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.price ? "border-red-500" : "border-gray-300"}`}
            placeholder="e.g., 19.99"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Stock Quantity */}
        <div>
          <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock_quantity"
            id="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleInputChange}
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.stock_quantity ? "border-red-500" : "border-gray-300"}`}
            placeholder="e.g., 100"
          />
          {errors.stock_quantity && <p className="text-red-500 text-sm mt-1">{errors.stock_quantity}</p>}
        </div>

        {/* Image URL (for simplicity, using URL for now) */}
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
            <LuImage className="w-4 h-4 inline mr-1" />
            Image URL
          </label>
          <input
            type="url"
            name="image_url"
            id="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.image_url ? "border-red-500" : "border-gray-300"}`}
            placeholder="https://example.com/product-image.jpg"
          />
          {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                <LuSave className="w-4 h-4" />
                <span>{product ? "Update Product" : "Add Product"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};


export default ProductForm