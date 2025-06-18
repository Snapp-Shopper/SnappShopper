import api from "../api/axiosInstance";

class AuthService {
  static async login(email, password) {
    return await api.post("/users/login.php", { email, password });
  }

  static async register(first_name, last_name, email, password, phone_number) {
    return await api.post("/users/register.php", { email, password, first_name, last_name, phone_number});
  }

  static async OTPVerification(email, code) {
    return await api.post("/users/verifyCode.php", { email, code });
  }

  static async resendOtpCode(email) {
    return await api.post("/users/resendCode.php", { email });
  }

  static async changePassword( email, currentPassword, newPassword, confirmNewPassword) {
    return await api.post("/api/v1/Account/change-password", { email, currentPassword, newPassword, confirmNewPassword});
  }

  static async resetPassword(email, token, password, confirmPassword) {
    return await api.post("/users/resetpassword.php", { email, token, password, confirmPassword });
  }

  static async forgotPassword(email) {
    return await api.post("/api/v1/Account/forgot-password", { email });
  }
}

export default AuthService;
