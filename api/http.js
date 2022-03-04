import axios from "axios";
import { store } from "@redux/store";

const axiosInstance = axios.create();

store.subscribe(() => {
  const { accessToken } = store.getState().auth;
  Object.assign(axiosInstance.defaults, {
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "None",
    },
  });
});

export { axiosInstance };
