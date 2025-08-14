import React from 'react'
import useVendorProducts from '../../hooks/useVendorProducts';
import { LuPackage } from 'react-icons/lu';
import ProductForm from './ProductForm';
import VendorProductCard from './VendorProductCard';
import ConfirmationModal from '../../components/ConfirmationModal';

const VendorProduct = () => {
  const {
    products,
    isFormOpen,
    editingProduct,
    isConfirmModalOpen,
    productToDeleteId,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProductPrompt,
    handleDeleteProductConfirm,
    handleFormSuccess,
    handleFormClose,
    isLoading,
  } = useVendorProducts();

  const EmptyProductsState = ({ onAddClick }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <LuPackage className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No products listed yet
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        Start selling by adding your first product to your store.
      </p>
      <button
        onClick={onAddClick}
        className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
      >
        <LuPlusCircle className="w-4 h-4" />
        <span>Add Your First Product</span>
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <LuPackage className="w-5 h-5 mr-2 text-purple-600" />
          {isFormOpen
            ? editingProduct
              ? "Edit Product"
              : "Add New Product"
            : "My Products"}
        </h2>
        {!isFormOpen && products.length > 0 && (
          <button
            onClick={handleAddProduct}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 cursor-pointer"
          >
            <LuPlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      <div>
        {isLoading && products.length === 0 && !isFormOpen ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        ) : isFormOpen ? (
          <ProductForm
            onClose={handleFormClose}
            product={editingProduct}
            onSuccess={handleFormSuccess}
          />
        ) : products.length === 0 ? (
          <EmptyProductsState onAddClick={handleAddProduct} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <VendorProductCard
                key={product.product_id} // Assuming product_id is unique
                product={product}
                onEdit={() => handleEditProduct(product)}
                onDelete={() => handleDeleteProductPrompt(product.product_id)}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        message={`Are you sure you want to delete this product? This action cannot be undone.`}
        onConfirm={handleDeleteProductConfirm}
        onCancel={handleFormClose} // Re-using handleFormClose to simply close modal
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default VendorProduct