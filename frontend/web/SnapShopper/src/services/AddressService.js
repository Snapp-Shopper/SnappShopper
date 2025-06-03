import api from "../api/axiosInstance";

class AddressService {
    static async getAddressById(addressId) {
        return await api.get(`/api/v1/Address/${id}`);
    }

    static async getAllUserAddresses(userId = null) {
        const url = userId ? `/api/v1/Address/user/${userId}` : `/api/v1/Address/user`;
        return await api.get(url);
    }

    static async saveAddress(address) {
        return await api.put("/api/v1/Address", address);
    }

    static async deleteAddress(id) {
        return await api.delete(`/api/v1/Address/${id}`);
    }

    static async setAsDedault(address) {
        return await api.put("/api/v1/Address/default", address);
    }

    static async getUserDefaultAddresses(userId = null) {
        const url = userId ? `/api/v1/Address/default/user/${userId}` : `/api/v1/Address/default/user`;
        return await api.get(url);
    }
}

export default AddressService;