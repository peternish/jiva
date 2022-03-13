import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/account";

const auth = {
  signup: ({ email, password, full_name } = {}) =>
    axios.post(`${BASE_URL}/register/`, {
      email,
      password,
      full_name,
    }),
  login: ({ email, password } = {}) =>
    axios.post(`${BASE_URL}/login/`, {
      email,
      password,
    }),
  refresh: ({ refresh } = {}) =>
    axios.post(`${BASE_URL}/token/refresh/`, {
      refresh,
    }),
  logout: () => { },
};

export default auth;
