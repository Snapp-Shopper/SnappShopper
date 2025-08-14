import api from "../api/axiosInstance";

class VendorService {
  static async vendorLogin(email, password) {
    return await api.post("/vendor/login.php", { email, password });
  }

  static async vendorRegister(first_name, last_name, email, password, phone_number, address, state, country) {
    return await api.post("/vendor/register.php", { email, password, first_name, last_name, phone_number, address, state, country });
  }

  static async vandorUpdate(vendor_id, first_name, last_name, email, phone_number, address, state, country) {
    return await api.post("/vendor/update.php", { vendor_id, email, first_name, last_name, phone_number, address, state, country });
  }

  static async vendorDelete(vendor_id) {
    return await api.delete("/vendor/delete.php", { data: { vendor_id } });
  }
}

export default VendorService;
