import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
