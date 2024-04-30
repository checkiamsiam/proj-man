import { accessToken_key } from "@/constants/localstorageKeys";
import { signOut } from "@/service/auth/signOut";
import { getFromCookie } from "@/utils/browserStorage/cookiestorage";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: envConfig.backendUrl,
});
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 100000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    const accessToken = getFromCookie(accessToken_key);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  //@ts-ignore
  async function (response) {
    return response;
  },
  async function (error: any) {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      await signOut();
    }
    const responseObject: any = {
      error: {
        message: error?.response?.data?.message || "Something went wrong",
      },
    };
    return responseObject;
  }
);

export { axiosInstance };
