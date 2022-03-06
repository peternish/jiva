import axios from "axios";
import { store } from "@redux/store";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${
      store.getState().auth.accessToken
    }`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosInstance };
