import AddressCard from "./AddressCard";
import { LuArrowLeft, LuMapPin, LuMapPinOff, LuPlus } from "react-icons/lu";
import AddressForm from "./AddressForm";
import useAddressBook from "../../hooks/useAddressbook";
import ConfirmationModal from "../ConfirmationModal";

const Addressbook = () => {
  const {
    addresses,
    isFormOpen,
    editingAddress,
    isConfirmModalOpen,
    addressToDeleteId,
    handleAddAddress,
    handleEditAddress,
    handleDeleteAddressPrompt,
    handleDeleteAddressConfirm,
    handleDeleteAddressCancel,
    handleSetDefault,
    handleFormSuccess,
    handleFormClose,
    isLoading,
  } = useAddressBook();

  const EmptyAddressState = ({ onAddClick }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <LuMapPinOff className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No addresses found
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        You haven't added any addresses yet. Add your first address to get
        started with faster checkout.
      </p>
      <button
        onClick={onAddClick} // Use prop for click handler
        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        <LuPlus className="w-4 h-4" />
        <span>Add Your First Address</span>
      </button>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            {/* Conditional header text and back button */}
            {isFormOpen ? (
              <button
                onClick={() => {
                  handleFormClose();
                }}
                className="p-2 -ml-2 mr-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Back to Address List"
              >
                <LuArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            ) : (
              <LuMapPin className="w-5 h-5 mr-2 text-blue-600" />
            )}
            {isFormOpen
              ? editingAddress
                ? "Edit Address"
                : "Add New Address"
              : "Address Book"}
          </h2>
          {/* Only show Add Address button if viewing the list AND there are existing addresses */}
          {!isFormOpen && addresses.length > 0 && (
            <button
              onClick={handleAddAddress}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200
              cursor-pointer">
              <LuPlus className="w-4 h-4" />
              <span>Add Address</span>
            </button>
          )}
        </div>

        <div>
          {isLoading && addresses.length === 0 && !isFormOpen ? (
            // Loading state
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading addresses...</span>
            </div>
          ) : isFormOpen ? (
            <AddressForm
              onClose={handleFormClose}
              address={editingAddress} 
              onSuccess={handleFormSuccess} 
            />
          ) : addresses.length === 0 ? (
            <EmptyAddressState onAddClick={handleAddAddress} />
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id || address.address_id } // Fallback key for robustness
                  address={address}
                  isDefault={address.is_default}
                  onSetDefault={() => handleSetDefault(address.address_id)}
                  onEdit={() => handleEditAddress(address)}
                  onDelete={() => handleDeleteAddressPrompt(address.address_id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Deletion (still a modal) */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        message={`Are you sure you want to delete this address? This action cannot be undone.`}
        onConfirm={handleDeleteAddressConfirm}
        onCancel={handleDeleteAddressCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default Addressbook;
