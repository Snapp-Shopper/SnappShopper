import api from "../api/axiosInstance";


class NotificationService {
    constructor() {
        this.apiUrl = '/notifications';
    }

    async getNotifications(userId, limit) {
        const response = await api.get(`${this.apiUrl}/index.php?user_id=${userId}&limit=${limit}`);
        return response.data;
    }

    async markAsRead(id) {
        const response = await axios.patch(`${this.apiUrl}/${id}`, {
            read: true
        });
        return response.data;
    }

    // async clearNotifications() {
    //     const response = await axios.delete(this.apiUrl);
    //     return response.data;
    // }
}

export default NotificationService;
