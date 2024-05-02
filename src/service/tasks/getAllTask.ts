import { axiosInstance } from "@/helpers/axios/axiosInstance";

export const getAllTasks = async () => {
  try {
    const res = await axiosInstance.get(`/data/tasks.json`);
    return res;
  } catch (error: any) {
    return null
  }
};