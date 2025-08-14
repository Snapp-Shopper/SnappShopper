import api from "../api/axiosInstance";

class ReviewService {
    constructor() {
        this.baseUrl = '/reviews';
    }

    async getReviews(productId) {
        return api.get(`${this.baseUrl}/product.php?product_id=${productId}`);
    }

    // async getReviewById(reviewId) {
    //     return api.get(`${this.baseUrl}/${reviewId}`);
    // }

    async createReview(reviewData) {
        return api.post(`${this.baseUrl}/submit.php`, reviewData);
    }

    async getReviewSummary(productId) {
        return api.get(`${this.baseUrl}/summary.php?product_id=${productId}`);
    }

    // async updateReview(reviewId, reviewData) {
    //     return api.put(`${this.baseUrl}/${reviewId}`, reviewData);
    // }

    // async deleteReview(reviewId) {
    //     return api.delete(`${this.baseUrl}/${reviewId}`);
    // }
}

export default ReviewService;