import api from "../api/axiosInstance";

class CartService {
  static async getCartItems() {
    return await api.get("/api/v1/CartItem/user");
  }

  static async addToCart(cartItem) {
    return await api.put("/api/v1/CartItem", cartItem);
  }

  static async removeFromCart(cartItemId) {
    return await api.delete(`/api/v1/CartItem/${cartItemId}`);
  }
}

export default CartService;
