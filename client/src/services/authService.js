import { data } from "react-router-dom";
import axiosInstance from "../configs/axios.js";

class AuthService {
  // register user
  async register(userData) {
    try {
      const response = await axiosInstance.post("/api/auth/register", userData);
      return {
        data: response.data,
      };
    } catch (error) {
      return {
        error: error.response
          ? error.response.data
          : { message: error.message },
      };
    }
  }

  async login(credentials) {
    try {
      const response = await axiosInstance.post("/api/auth/login", credentials);
      return {
        data: response.data,
      };
    } catch (error) {
      return {
        error: error.response
          ? error.response.data
          : { message: error.message },
      };
    }
  }

  async logout() {
    try {
      const response = await axiosInstance.post("/api/auth/logout");
      return {
        data: response.data,
      };
    } catch (error) {
      return {
        error: error.response
          ? error.response.data
          : { message: error.message },
      };
    }
  }

  async getCurrentUser() {
    try {
      const response = await axiosInstance.get("/api/auth/me");
      return {
        data: response.data,
      };
    } catch (error) {
      return {
        error: error.response
          ? error.response.data
          : { message: error.message },
      };
    }
  }

   async checkAuth() {
    const result = await this.getCurrentUser();
    return result.success;
  }
}

// A single instance
const authService = new AuthService();
export default authService;
