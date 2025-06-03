import { useLoading } from "../context/LoadingContext";

const useApi = () => {
    const { setIsLoading } = useLoadingLoading();

    const callApi = async (apiFunction, ...args) => {
        setIsLoading(true);
        try {
            const response = await apiFunction(...args);
            // Simulate a delay (optional)
            await new Promise(resolve => setTimeout(resolve, 3000));
            return response;
        } catch (error) {
            let errorMessage = 'An unexpected error occurred.';

            if (error.response) {
                // Server responded with a status other than 200
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                // Request was made but no response received
                errorMessage = 'Network error. Please try again later.';
            } else {
                // Something happened in setting up the request
                errorMessage = error.message;
            }

            console.error('API error:', error); // Log the error for debugging
            throw new Error(errorMessage); // Rethrow the error with a user-friendly message
        } finally {
            setIsLoading(false);
        }
    };

    return { callApi };
};

export default useApi;