import { axiosInstance } from "@/helpers/axios/axiosInstance";

export const getAllTasks = async () => {
  try {
    const res = await axiosInstance.get(`/data/tasks.json`);
    return res;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Internal Server Error");
  }
};