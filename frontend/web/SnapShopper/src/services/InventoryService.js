import api from "../api/axiosInstance";

class InventoryService {
    constructor() {
        this.baseUrl = '/inventory';
    }

    async adjustInventory(data) {
        await api.patch(`${this.baseUrl}/adjust.php`, data);
    }

    async getProductInventory(productId) {
        await api.get(`${this.baseUrl}/get.php?product_id=${productId}`);
    }

    async saveInventory(data) {
        await api.post(`${this.baseUrl}/save.php`, data);
    }

    async getAllInventories() {
        await api.get(`${this.baseUrl}/all.php`);
    }

}

export default InventoryService;