import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import { useLoading } from "../context/LoadingContext";
import ProductService from "../services/ProductService";

const useProductForm = ({ initialProduct, onSuccess, onClose }) => {
  const { authUser } = useAuth();
  const { isLoading, setIsLoading } = useLoading();
  const vendorId = authUser?.user_id; // Assuming user_id is the vendor ID

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    image_url: '',
  });
  const [errors, setErrors] = useState({});

  // Effect to populate form data when initialProduct changes (for editing)
  useEffect(() => {
    if (initialProduct) {
      setFormData({
        name: initialProduct.name || '',
        description: initialProduct.description || '',
        price: initialProduct.price || '', // Ensure numeric fields are handled correctly
        stock_quantity: initialProduct.stock_quantity || '',
        image_url: initialProduct.image_url || '',
      });
    } else {
      // Reset form for adding new product
      setFormData({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        image_url: '',
      });
    }
    setErrors({}); // Clear errors whenever product or form is opened/reset
  }, [initialProduct]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the specific field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Price must be a positive number.";
    if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) newErrors.stock_quantity = "Stock quantity must be a non-negative number.";
    // Image URL is optional for now, but you could add validation if needed
    // if (!formData.image_url.trim()) newErrors.image_url = "Image URL is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    if (!vendorId) {
      toast.error("Vendor not authenticated. Please log in.");
      return;
    }

    setIsLoading(true);
    try {
      const productData = {
        vendor_id: vendorId, // Ensure vendor_id is sent with the product data
        ...formData,
        price: parseFloat(formData.price), // Convert price to number
        stock_quantity: parseInt(formData.stock_quantity), // Convert stock to number
      };

      let response;
      if (initialProduct) {
        // Update existing product
        //response = await VendorService.updateProduct(initialProduct.product_id, productData);
      } else {
        // Add new product
        response = await ProductService.saveProduct(productData);
      }

      if (response.data.status === "success") {
        toast.success(`${initialProduct ? "Product updated" : "Product added"} successfully!`);
        onSuccess(); // Trigger parent's success callback (which will re-fetch products)
      } else {
        toast.error(response.data.message || `Failed to ${initialProduct ? "update" : "add"} product.`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error.response?.data?.message || `Failed to ${initialProduct ? "update" : "add"} product. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, [formData, initialProduct, vendorId, validateForm, setIsLoading, onSuccess]);

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
};

export default useProductForm;