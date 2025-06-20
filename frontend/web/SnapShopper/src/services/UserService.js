import api from "../api/axiosInstance";

class PersonalDetailsService {

    static async updatePersonalDetails(user) {
        return await api.put("/users/update_users.php", user);
    }

    // static async getAllUsers() {
    //     return await api.get('/users/get.php');
    // }

    static async getUserById(userid) {
        return await api.get(`/users/get.php?user_id=${userid}`);
    }

}

export default PersonalDetailsService;