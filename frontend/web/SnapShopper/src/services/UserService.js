import api from "../api/axiosInstance";

class PersonalDetailsService {

    static async updatePersonalDetails(user) {
        return await api.put("/api/v1/PersonalDetails", user);
    }

    static async getAllUsers() {
        return await api.get('/users/get.php');
    }

    static async getUserById(userid) {
        return await api.get(`/users/get.php?user_id=${userid}`);
    }

}

export default PersonalDetailsService;