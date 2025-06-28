import api from "../api/axiosInstance";

class CategoryService {

   static async getAllCategories(category_id = null) {
       return await api.get(`/products/get_products.php?category_id=${category_id}`);
   }

    static async getCategoryById(categoryId) {
        return await api.get(`/users/get.php?category_id=${categoryId}`);
    }

    static async saveCategory(category) {
        return await api.post(`/categories/save.php`, category);
    }

    static async updateCategory(category) {
        return await api.post(`/categories/update_categories.php`, category);
    }

}

export default CategoryService;