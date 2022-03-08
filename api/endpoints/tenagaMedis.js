import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/tenaga-medis";

const tenagaMedisEndpoints = {
  getTenagaMedis: () => {
    return axios.get(BASE_URL);
  },

  createTenagaMedis: ({ nomorTelepon }) => {
    return axios.post(BASE_URL, { nomorTelepon });
  },
};

export default tenagaMedisEndpoints;
