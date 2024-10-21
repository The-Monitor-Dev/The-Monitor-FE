import axiosInstance from "./axiosInstance";
import { ApiResponse } from "./types/response";

export const apiGet = async <T>(
  url: string,
  params?: any,
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
  return response.data;
};

export const apiPost = async <T>(
  url: string,
  data?: any,
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.post<ApiResponse<T>>(url, data);
  return response.data;
};
