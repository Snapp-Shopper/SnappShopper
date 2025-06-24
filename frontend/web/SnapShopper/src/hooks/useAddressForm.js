// src/components/Addressbook/hooks/useAddressForm.js
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast"; // Assuming toast is available globally or imported in your app root
import { useLoading } from "../context/LoadingContext";
import { useAuth } from "./useAuth";
import AddressService from "../services/AddressService";

const useAddressForm = ({ initialAddress, onSuccess, onClose }) => {
  const { authUser } = useAuth();
  const { isLoading, setIsLoading } = useLoading();
  const userId = authUser?.user_id;

  const [formData, setFormData] = useState({
    //name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: "",
    phone: "",
    country: "",
    is_default: false,
  });
  const [errors, setErrors] = useState({});

  // Effect to populate form data when initialAddress changes (for editing)
  useEffect(() => {
    if (initialAddress) {
      setFormData({
        // name: initialAddress.name || "", // Re-added name
        address_line1: initialAddress.address_line1 || "",
        address_line2: initialAddress.address_line2 || "",
        city: initialAddress.city || "",
        state: initialAddress.state || "",
        zip_code: initialAddress.zip_code || "",
        phone: initialAddress.phone || "",
        country: initialAddress.country || "",
        is_default: initialAddress.is_default || false,
      });
    } else {
      // Reset form for adding new address
      setFormData({
        //name: "", // Re-added name
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip_code: "",
        phone: "",
        country: "",
        is_default: false,
      });
    }
    setErrors({}); // Clear errors whenever address or form is opened/reset
  }, [initialAddress]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear error for the specific field when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};

    //  if (!formData.name.trim()) newErrors.name = "Full name is required"; // Re-added validation
    if (!formData.address_line1.trim())
      newErrors.address_line1 = "Address line 1 is required";
    // If address_line2 is truly optional, remove this validation.
    if (!formData.address_line2.trim() && formData.address_line2 === "") {
      // Only require if not empty string (empty string is fine for optional)
      // newErrors.address_line2 = "Address line 2 is required"; // Uncomment if strictly required
    }
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip_code.trim()) newErrors.zip_code = "Zip code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        toast.error("Please fill in all required fields correctly.");
        return;
      }

      if (!userId) {
        toast.error("User not authenticated. Please log in.");
        return;
      }

      setIsLoading(true);
      try {
        const addressData = {
          user_id: userId,
          ...formData,
        };

        let response;
        if (initialAddress) {
          response = await AddressService.updateAddress(
            initialAddress.id,
            addressData
          );
          if (response.data.status === "success") {
            toast.success("Address updated successfully!");
          } else {
            toast.error(response.data.message || "Failed to update address");
            return;
          }
        } else {
          response = await AddressService.saveAddress(addressData);
          if (response.data.status === "success") {
            toast.success("Address added successfully!");
          } else {
            toast.error(response.data.message || "Failed to add address");
            return;
          }
        }

        onSuccess(); // Trigger parent's success callback (which will re-fetch addresses and close form)
      } catch (error) {
        console.error("Error saving address:", error);
        toast.error(
          error.response?.data?.message ||
            `Failed to ${
              initialAddress ? "update" : "add"
            } address. Please try again.`
        );
      } finally {
        setIsLoading(false);
      }
    },
    [formData, initialAddress, userId, validateForm, setIsLoading, onSuccess]
  );

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
};

export default useAddressForm;
