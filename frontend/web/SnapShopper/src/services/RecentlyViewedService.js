import api from "../api/axiosInstance";

class RecentlyViewedService {
    constructor() {
        this.baseUrl = '/recently_viewed';
        this.maxItems = 20;
    }

    async getItems(userId) {
        const response = await api.get(`${this.baseUrl}/get.php?user_id=${userId}`);
        return response.data || [];
    }

    async addItem(item) {
        await api.post(`${this.baseUrl}/add.php`, item);
    }

    async clearItems(userId) {
        await api.delete(`${this.baseUrl}/clear.php`, { user_id: userId });
    }

    async removeItem(userId, productId) {
        await api.delete(`${this.baseUrl}/delete.php`, { user_id: userId, product_id: productId });
    }
}

export default new RecentlyViewedService();
