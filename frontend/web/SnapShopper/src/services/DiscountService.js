import api from "../api/axiosInstance";

class DiscountService {
    constructor() {
        this.baseUrl = '/discounts';
    }

    async applyDiscount(data) {
        await api.post(`${this.baseUrl}/apply-discount.php`, data);
    }

}

export default new DiscountService();