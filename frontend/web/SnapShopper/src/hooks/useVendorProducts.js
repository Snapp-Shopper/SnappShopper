import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuth } from './useAuth';
import { useLoading } from '../context/LoadingContext';

const useVendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Product object being edited
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null); // ID of product to delete

  const { authUser } = useAuth();
  const { isLoading, setIsLoading } = useLoading();
  const vendorId = authUser?.user_id; // Assuming user_id is the vendor ID

  // Fetch products from the backend
  const fetchProducts = useCallback(async () => {
    if (!vendorId) {
      console.warn("Vendor ID not available to fetch products.");
      setProducts([]); // Clear products if vendor logs out or ID is missing
      return;
    }
    setIsLoading(true);
    try {
      const response = await VendorService.getVendorProducts(vendorId);
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        setProducts([]);
        toast("No products found for this vendor.", { icon: 'ℹ️' });
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error(error.response?.data?.message || "Failed to load products.");
      setProducts([]); // Clear products on error fetching
    } finally {
      setIsLoading(false);
    }
  }, [vendorId, setIsLoading]);

  // Effect to fetch products on component mount or vendorId change
  useEffect(() => {
    if (vendorId) {
      fetchProducts();
    } else {
      setProducts([]); // Clear products if vendor logs out
    }
  }, [vendorId, fetchProducts]);

  // Handlers for UI actions
  const handleAddProduct = useCallback(() => {
    setEditingProduct(null); // Ensure no product is being edited
    setIsFormOpen(true);
  }, []);

  const handleEditProduct = useCallback((product) => {
    setEditingProduct(product); // Set the product to be edited
    setIsFormOpen(true);
  }, []);

  const handleDeleteProductPrompt = useCallback((productId) => {
    setProductToDeleteId(productId);
    setIsConfirmModalOpen(true);
  }, []);

  const handleDeleteProductConfirm = useCallback(async () => {
    if (!productToDeleteId) return;

    setIsConfirmModalOpen(false); // Close modal immediately
    setIsLoading(true);
    try {
      const response = await VendorService.deleteProduct(productToDeleteId);
      if (response.data.status === "success") {
        toast.success("Product deleted successfully!");
        await fetchProducts(); // Re-fetch all products to update the list
      } else {
        toast.error(response.data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product. Please try again.");
    } finally {
      setIsLoading(false);
      setProductToDeleteId(null); // Clear the ID after operation
    }
  }, [productToDeleteId, setIsLoading, fetchProducts]);

  // Callback for ProductForm success (add/update)
  const handleFormSuccess = useCallback(async () => {
    await fetchProducts(); // Re-fetch all products to ensure data consistency
    setIsFormOpen(false); // Close the form
    setEditingProduct(null); // Clear editing state
  }, [fetchProducts]);

  // Callback for ProductForm close (cancel)
  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setIsConfirmModalOpen(false); // Also close confirmation modal if it was open
    setProductToDeleteId(null);
  }, []);

  return {
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
  };
};

export default useVendorProducts