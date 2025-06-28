import api from "../api/axiosInstance";

class AuthService {
  static async login(email, password) {
    return await api.post("/users/login.php", { email, password });
  }

  static async register(first_name, last_name, email, password, phone_number) {
    return await api.post("/users/register.php", { email, password, first_name, last_name, phone_number });
  }

  static async OTPVerification(email, code) {
    return await api.post("/users/verifyCode.php", { email, code });
  }

  static async resendOtpCode(email) {
    return await api.post("/users/resendCode.php", { email });
  }

  static async changePassword(user_id, old_password, new_password) {
    return await api.post("/users/change_password.php", { user_id, old_password, new_password });
  }

  static async resetPassword(email, token, password, confirmPassword) {
    return await api.post("/users/resetpassword.php", { email, token, password, confirmPassword });
  }

  static async forgotPassword(formData) {
    return await api.post("/users/forgotpassword.php", formData);
  }

  static async verifyCode(email, code) {
    return await api.get(`/users/verifycode.php`, { email, code });
  }

  static async verifyEmail(token) {
    return await api.get(`/users/verify_email.php?token=${token}`);
  }

}

export default AuthService;
