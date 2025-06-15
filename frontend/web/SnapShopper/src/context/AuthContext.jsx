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
  //const { syncCartToAPI = () => {} } = useContext(CartContext) || {};

  // useEffect(() => {
  //     const storedUser = localStorage.getItem("authUser");
  //     const storedUserToken = localStorage.getItem("authToken");

  //     if (storedUser && storedUserToken) {
  //         setAuthUser(JSON.parse(storedUser));
  //         setAuthToken(storedUserToken);
  //     }
  // }, []);

  useEffect(() => {
    setIsLoading(true); // Start loading before checking storage

    // const storedUser = localStorage.getItem("authUser");
    //const storedUserToken = localStorage.getItem("authToken");

    const storedUser = sessionStorage.getItem("authUser");
    const storedUserToken = sessionStorage.getItem("authToken");

    if (
      storedUser &&
      storedUserToken &&
      storedUser !== "undefined" &&
      storedUser !== "null"
    ) {
      try {
        setAuthUser(JSON.parse(storedUser));
        setAuthToken(storedUserToken);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Optionally, you might want to clear the invalid data from sessionStorage
        sessionStorage.removeItem("authUser");
        sessionStorage.removeItem("authToken");
      }
    }

    setIsLoading(false); // Stop loading after checking storage
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(email, password);
      if (response.status === 200) {
        const user = response.user;
        const token = response.jwToken;
        console.log("user:", user);
        console.log("Token:", token);
        setAuthUser(user);
        setAuthToken(token);
        sessionStorage.setItem("authUser", JSON.stringify(user));
        sessionStorage.setItem("authToken", token);

        await syncCartToAPI(); // Sync local cart with API
        return true;
      } else {
        // toast.error(response.data?.error || "Login failed");
        console.log(response);
        return false;
      }
    } catch (error) {
      // toast.error(error.response?.data?.Message || "Login failed");
      console.log(response);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    first_name,
    last_name,
    email,
    password,
    phone_number
  ) => {
    setIsLoading(true);
    try {
      const response = await AuthService.register(
        first_name,
        last_name,
        email,
        password,
        phone_number
      );
      return response.data;
    } catch (error) {
      //toast.error(error.response?.data?.Message || "Registration failed");
      throw new Error(error.response?.Message || "Registration failed");
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

  const OTPVerification = async (otp) => {
    setIsLoading(true);
    try {
      const response = await AuthService.OTPVerification(otp);
      toast.success("OTP Verified Successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.Message || "OTP Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // if (!authUser || !authToken) {
    //     console.warn("User is already logged out.");
    //     return false;
    // }

    setIsLoading(true);
    try {
      sessionStorage.removeItem("authUser");
      sessionStorage.removeItem("authToken");

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
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
