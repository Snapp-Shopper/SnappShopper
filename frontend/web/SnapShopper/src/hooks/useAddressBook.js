import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useLoading } from "../context/LoadingContext";
import toast from "react-hot-toast";
import AddressService from "../services/AddressService";

const useAddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [addressToDeleteId, setAddressToDeleteId] = useState(null);

  const { authUser } = useAuth();
  const { isLoading, setIsLoading } = useLoading();
  const userId = authUser?.user_id;

  const fetchAddresses = useCallback(async () => {
    if (!userId) {
      console.warn("User ID not available to fetch addresses.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await AddressService.getAllUserAddresses(userId);
      // Assuming response.data.data contains the array of addresses
      setAddresses(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      toast.error("Failed to fetch addresses.");
    } finally {
      setIsLoading(false);
    }
  }, [userId, setIsLoading]);

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, fetchAddresses]);

  const handleAddAddress = useCallback(() => {
    setEditingAddress(null); // Clear any existing address for 'add' mode
    setIsFormOpen(true);
  }, []);

  const handleEditAddress = useCallback((address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  }, []);

  const handleDeleteAddressPrompt = useCallback((addressId) => {
    setAddressToDeleteId(addressId);
    setIsConfirmModalOpen(true);
  }, []);

  const handleDeleteAddressConfirm = useCallback(async () => {
    if (!addressToDeleteId) return;

    setIsConfirmModalOpen(false); // Close modal immediately
    setIsLoading(true);
    try {
      await AddressService.deleteAddress(Number(addressToDeleteId));
      // Optimistically update UI or re-fetch for accuracy
      setAddresses((prev) =>
        prev.filter((addr) => addr.id !== addressToDeleteId)
      );
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error("Failed to delete address:", error);
      toast.error("Failed to delete address.");
    } finally {
      setIsLoading(false);
      setAddressToDeleteId(null); // Clear the ID after operation
    }
  }, [addressToDeleteId, setIsLoading]);

  const handleDeleteAddressCancel = useCallback(() => {
    setIsConfirmModalOpen(false);
    setAddressToDeleteId(null);
  }, []);

  const handleSetDefault = useCallback(
    async (addressId) => {
      setIsLoading(true);
      try {
        const response = await AddressService.setAsDedault(addressId);
        if (response.data.status === "success") {
          setAddresses((prev) =>
            prev.map((addr) => ({
              ...addr,
              is_default: addr.address_id === addressId,
            }))
          );
          toast.success("Default address updated!");
        } else {
          toast.error(
            response.data.message || "Failed to update default address."
          );
        }
      } catch (error) {
        //console.error("Failed to update default address:", error);
        toast.error("Failed to update default address.");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  const handleFormSuccess = useCallback(async () => {
    await fetchAddresses(); // Re-fetch all addresses to ensure data consistency
    setIsFormOpen(false);
    setEditingAddress(null);
  }, [fetchAddresses]);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
    setEditingAddress(null);
  }, []);

  return {
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
  };
};

export default useAddressBook;
