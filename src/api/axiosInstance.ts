import { createStandaloneToast } from "@chakra-ui/react";
import axios, { AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const { toast } = createStandaloneToast();

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.data?.message) {
      toast({
        title: `${error.response?.data?.message}`,
        status: "error",
      });
    } else {
      toast({
        title: "에러가 발생했습니다.",
        status: "error",
      });
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
