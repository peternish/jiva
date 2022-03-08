import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/klinik/cabang";

const cabang = {
  fetch_all: () => axios.get(`${BASE_URL}/`),
  register: ({ location } = {}) =>
    axios.post(`${BASE_URL}/`, {
      location
    }),
  fetch: ({ cabang_id } = {}) => axios.get(`${BASE_URL}/${cabang_id}/`),
  relocate: ({ cabang_id, location } = {}) =>
    axios.put(`${BASE_URL}/${cabang_id}}`, {
      location
    }),
  unregister: ({ cabang_id } = {}) => axios.get(`${BASE_URL}/${cabang_id}/`),
};

export default cabang;
