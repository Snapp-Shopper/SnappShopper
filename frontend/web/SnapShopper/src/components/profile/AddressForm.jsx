import {
  LuHouse,
  LuPhone,
  LuSave,
} from "react-icons/lu";
import useAddressForm from "../../hooks/useAddressForm";

const AddressForm = ({
  // isOpen, // No longer needed for its internal rendering, parent controls it
  onClose,
  address = null,
  onSuccess,
}) => {
  const { formData, errors, isLoading, handleInputChange, handleSubmit } =
    useAddressForm({
      initialAddress: address,
      onSuccess,
      onClose,
    });

  // Removed `if (!isOpen) return null;` - parent handles visibility

  return (
    // Removed fixed inset-0 modal styling, this will render inline
    <div className="w-full max-w-lg mx-auto">
      {/* <div className="flex items-center justify-between p-6 -mt-6 -mx-6 mb-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <LuMapPin className="w-5 h-5 mr-2 text-blue-600" />
            {address ? "Edit Address" : "Add New Address"}
        </h2>
        <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LuX className="w-5 h-5 text-gray-500" />
          </button>
      </div> */}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 -mt-6 -mx-6 space-y-4">
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <LuUser className="w-4 h-4 inline mr-1" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div> */}
        {/* Street Address / Address Line 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <LuHouse className="w-4 h-4 inline mr-1" />
            Address Line 1
          </label>
          <input
            type="text"
            name="address_line1"
            value={formData.address_line1}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address_line1 ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="House number, street name"
          />
          {errors.address_line1 && (
            <p className="text-red-500 text-sm mt-1">{errors.address_line1}</p>
          )}
        </div>
        {/* Address Line 2 (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            name="address_line2"
            value={formData.address_line2}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
            placeholder="Apartment, suite, unit, building, etc."
          />
        </div>
        {/* City and State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="State"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Zip Code and country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zip Code
            </label>
            <input
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.zipcode ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter zip code"
            />
            {errors.zip_code && (
              <p className="text-red-500 text-sm mt-1">{errors.zip_code}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.country ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter country"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
        </div>
        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <LuPhone className="w-4 h-4 inline mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="+234 708 934 3298"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        {/* Set as Default */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_default"
            name="is_default"
            checked={formData.is_default}
            onChange={handleInputChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="is_default" className="ml-2 text-sm text-gray-700">
            Set as default address
          </label>
        </div>
        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                <LuSave className="w-4 h-4" />
                <span>{address ? "Update" : "Save"} Address</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
