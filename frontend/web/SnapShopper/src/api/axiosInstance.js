import axios from 'axios';
import toast from 'react-hot-toast';

//const BASE_URL = "https://test.api.snappshopper.com/api/routes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Token If Available
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handles Errors Globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred."; 

        if (error.response && error.response?.status === 401) {
            toast.error("Unauthorized. Please log in again.");
            sessionStorage.removeItem('authToken'); // Clear token on 401
            sessionStorage.removeItem('authUser');
            window.location.href = '/login'; // Redirect to login
        }

        return Promise.reject(error);
    }
);

export default api;
