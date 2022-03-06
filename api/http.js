import axios from "axios";
import { store } from "@redux/store";
import { refreshToken } from "@redux/modules/auth/thunks";

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

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response.status === 401) {
      store.dispatch(refreshToken());
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
