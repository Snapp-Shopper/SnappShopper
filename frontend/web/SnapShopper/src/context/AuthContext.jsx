import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import toast from "react-hot-toast";
import CartContext from "./CartContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { syncCartToAPI } = useContext(CartContext);

  useEffect(() => {
  const loadStoredAuth = () => {
    setIsLoading(true); // Begin loading state

    // const storedUser = localStorage.getItem("authUser");
    //const storedUserToken = localStorage.getItem("authToken");

    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken");

    console.log("Stored User", storedUser)

    const isValidData =
      storedUser &&
      storedToken &&
      storedUser !== "undefined" &&
      storedUser !== "null";

    if (isValidData) {
      try {
        setAuthUser(JSON.parse(storedUser));
        setAuthToken(storedToken);
      } catch (error) {
        // If parsing fails, clear corrupted data
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
      }
    }

    setIsLoading(false); // Done loading
  };

  loadStoredAuth();
}, []);


  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(email, password);
      if (response.status === 200) {

        const user = response.data.user;
        const token = response.data.token;
        
        setAuthUser(user);
        setAuthToken(token);
        localStorage.setItem("authUser", JSON.stringify(user));
        localStorage.setItem("authToken", token);

        await syncCartToAPI(); // Sync local cart with API
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (first_name, last_name, email, password, phone_number) => {
    setIsLoading(true);
    try {
      const response = await AuthService.register(first_name, last_name, email, password, phone_number);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (
    email,
    currentPassword,
    newPassword,
    confirmNewPassword
  ) => {
    setIsLoading(true);
    try {
      await AuthService.changePassword(
        email,
        currentPassword,
        newPassword,
        confirmNewPassword
      );
      toast.success("Password Changed Successfully");
      return { success: true }; // Indicate success
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Change Password failed"; // Extract error message
      toast.error(errorMessage);
      return { success: false, message: errorMessage }; // Return error message
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email, token, password, confirmPassword) => {
    setIsLoading(true);
    try {
      await AuthService.resetPassword(email, token, password, confirmPassword);
      toast.success("Password Reset Successfully");
    } catch (error) {
      toast.error(error.response?.data?.Message || "Reset Password failed");
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setIsLoading(true);
    try {
      await AuthService.forgotPassword(email);
      toast.success("Reset Link Sent");
    } catch (error) {
      toast.error(error.response?.data?.Message || "Forgot Password failed");
    } finally {
      setIsLoading(false);
    }
  };

  const OTPVerification = async (email, code) => {
    setIsLoading(true);
    try {
      const response = await AuthService.OTPVerification(email, code);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "OTP Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const ResendOtpCode = async (email) => {
    //setIsLoading(true);
    try {
      const response = await AuthService.resendOtpCode(email);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Request failed");
    } finally {
      //setIsLoading(false);
    }
  };

  const logout = async () => {
    // if (!authUser || !authToken) {
    //     console.warn("User is already logged out.");
    //     return false;
    // }

    setIsLoading(true);
    try {
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");

      setAuthUser(null);
      setAuthToken(null);
      toast.success("Logged out successfully");

      // Reload the page after a short delay to simulate the spinner
      setTimeout(() => {
        window.location.href = "/home"; // Redirects to the home page
      }, 3000); // 3 seconds delay to show spinner
    } catch (error) {
      console.error("Logout Failed:", error);
      toast.error("Logout Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    authUser,
    authToken,
    isLoading,
    login,
    register,
    changePassword,
    resetPassword,
    forgotPassword,
    OTPVerification,
    logout,
    ResendOtpCode,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
