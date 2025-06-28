import api from "../api/axiosInstance";

class ExternalService {
    static async facebookLogin(accessToken) {
        return await api.post("/users/facebook-login.php", { accessToken });
    }

    static async appleLogin(email, password) {
        return await api.post("/users/apple-login.php", { email, password });
    }

    static async googleLogin(token) {
        return await api.post("/users/google_register.php", { token });
    }
}

export default ExternalService;
