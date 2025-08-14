import React, { useContext, useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import AuthContext from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import UserService from "../../services/UserService";
import toast from "react-hot-toast";

const PersonalInfo = () => {
  const { authUser, updateAuthUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const { isLoading, setIsLoading } = useLoading();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    user_id: authUser?.user_id || authUser?.id || null,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.id]: "",
    }));
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (authUser?.id || authUser?.user_id) {
        setIsLoading(true);
        try {
          const userIdToFetch = authUser.user_id || authUser.id;
          const response = await UserService.getUserById(userIdToFetch);
          const userData = response.data?.data || response.data;
          setFormData({
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            user_id: userIdToFetch,
          });
        } catch (error) {
          toast.error("Failed to fetch user details. Please try again.");
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            user_id: authUser?.user_id || authUser?.id || null,
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUser();
  }, [authUser, setIsLoading]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required.";
    // Email validation removed as it's not editable, but keep if you want to validate initial data
    // if (!formData.email.trim()) {
    //   newErrors.email = "Email is required.";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Email is not valid.";
    // }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    if (!authUser?.user_id && !authUser?.id) {
      toast.error("User not authenticated for update.");
      return;
    }

    setIsLoading(true);
    try {
      const userToUpdate = {
        user_id: authUser.user_id || authUser.id,
        ...formData,
      };

      const response = await UserService.updateUser(userToUpdate);

      if (response.data.status === "success") {
        updateAuthUser(response.data?.data || formData);
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        const errorMessage = response.data.message || "Failed to update profile.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating personal info:", error);
      toast.error(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <LuUser className="w-5 h-5 mr-2 text-blue-600" />
          Personal Information
        </h2>
        <button
          onClick={() => {
            if (isEditing) {
              setFormData({
                first_name: authUser?.first_name || "",
                last_name: authUser?.last_name || "",
                email: authUser?.email || "",
                phone: authUser?.phone || "",
                user_id: authUser?.user_id || authUser?.id || null,
              });
              setErrors({});
            }
            setIsEditing(!isEditing);
          }}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          <FiEdit3 className="w-4 h-4" />
          <span>{isEditing ? "Cancel" : "Edit"}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 capitalize">
              First Name
            </label>
            <input
              type="text"
              value={formData.first_name}
              id="first_name"
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${errors.first_name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 capitalize">
              Last Name
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              id="last_name"
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${errors.last_name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 capitalize">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              disabled={true}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 capitalize">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              id="phone"
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            />
            <span className="block text-xs text-gray-500 mt-1">
              e.g., +234 801 234 5678. Number should start with '+' for international format.
            </span>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;
