import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const { toast } = createStandaloneToast();

const tokenInstance = axios.create({
  baseURL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

tokenInstance.interceptors.request.use(
  (config) => {
    if (config.method === "post" && config.url?.includes("/clients")) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

tokenInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
      toast({
        title: `${error.response?.data?.message}`,
        status: "error",
      });
    } else {
      window.location.href = "/404";

      return Promise.reject(error);
    }
    return Promise.reject();
  },
);

export default tokenInstance;
