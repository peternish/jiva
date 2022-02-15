import constants from "../constants";
import { axiosInstance as axios } from "../http";

const BASE_URL = constants?.API_BASE_URL + "/auth";

const endpoints = {
  signup: (email, password) =>
    axios.post(`${BASE_URL}/register/`, {
      email,
      password,
    }),
  login: (email, password) =>
    axios.post(`${BASE_URL}/login/`, {
      email,
      password,
    }),
  logout: () => {},
};

export default endpoints;
