import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Including cookies in requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error.message);
    return Promise.reject(error);
  },
);

// Response interceptor for logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `Response error: ${error.response.status} ${error.response.config.url}`,
      );
    } else {
      console.error("Response error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
