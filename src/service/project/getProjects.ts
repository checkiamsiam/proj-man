import { axiosInstance } from "@/helpers/axios/axiosInstance";

export const getAllProjects = async () => {
  try {
    const res = await axiosInstance.get(`/data/projects.json`);
    return res;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Internal Server Error");
  }
};
