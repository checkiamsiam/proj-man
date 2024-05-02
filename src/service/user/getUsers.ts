import { axiosInstance } from "@/helpers/axios/axiosInstance";

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get(`/data/users.json`);
    return res;
  } catch (error: any) {
    return null
  }
};