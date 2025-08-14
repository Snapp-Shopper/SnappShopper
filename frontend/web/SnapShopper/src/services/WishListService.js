import api from "../api/axiosInstance";

class WishListService {
  static async addToWishList(wishlist) {
    return await api.post("/wishlist/add.php", wishlist);
  }

  static async getUserWishList(user_id) {
    return await api.get(`/wishlist/get.php?user_id=${user_id}`);
  }

  static async removeFromWishList(data) {
    return await api.post(`/wishlist/remove.php`, data);
  }
}

export default WishListService;
