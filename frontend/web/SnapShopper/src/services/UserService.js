import api from "../api/axiosInstance";

class UserService {

    static async deleteUser(userId) {
        return await api.post(`/users/delete.php`, { user_id: userId });
    }

    static async updateUser(user) {
        return await api.post(`/users/update_users.php`, user);
    }

    static async getUserById(userid = null) {
        return await api.get(`/users/get.php?user_id=${userid}`);
    }

}

export default UserService;