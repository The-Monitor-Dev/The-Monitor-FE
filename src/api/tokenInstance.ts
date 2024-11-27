import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const tokenInstance = axios.create({
  baseURL,
  headers: {
    Accept: "*/*",
  },
  withCredentials: true,
});

tokenInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    } else {
      // window.location.href = "/404";
    }
    return Promise.reject(error);
  },
);

export default tokenInstance;
