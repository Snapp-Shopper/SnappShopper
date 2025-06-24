import api from "../api/axiosInstance";

class AddressService {
  static async deleteAddress(address_id) {
    return await api.post(`/address/delete.php`, address_id);
  }

  // static async getAddressById(addressId) {
  //     return await api.get(`/api/v1/Address/${id}`);
  // }

  static async getAllUserAddresses(user_id) {
    return await api.get(`/address/get.php?user_id=${user_id}`);
  }

  static async getUserDefaultAddresses(userId) {
    return await api.get(
      `/address/get.php?user_id=${userId}&action=getDefault`
    );
  }

  static async saveAddress(address) {
    return await api.post("/address/save_address.php", address);
  }

  static async updateAddress(address) {
    return await api.post("/address/update_address.php", address);
  }

    static async setAsDedault(addressId) {
      return await api.post("/address/set_default.php", { address_id: addressId });
    }
}

export default AddressService;
