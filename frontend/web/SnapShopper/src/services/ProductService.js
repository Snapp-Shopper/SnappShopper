import api from "../api/axiosInstance";

class ProductService {

    static async getProducts(category_id = null, name = null, product_id = null) {
        return await api.get(`/products/get_products.php?category_id=${category_id}&name=${name}&product_id=${product_id}`);
    }

    static async saveProduct(product) {
        return await api.post(`/products/save.php`, product);
    }

    static async visionSearch(search) {
        return await api.post(`/products/vision_search.php`, search);
    }

    static async chatGptSearch(search) {
        return await api.post(`/products/chatgpt_search.php`, search);
    }

    static async externalImageSearch(search) {
        return await api.post(`/products/external_image_search.php`, search);
    }

}

export default ProductService;