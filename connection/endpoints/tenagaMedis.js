import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL;

const tenagaMedis = {
  getTenagaMedis: ({ idCabang }) => {
    return axios.get(`${BASE_URL}/account/tenaga-medis/${idCabang}/`);
  },

  getTenagaMedisByID: ({ idTenagaMedis }) => {
    return axios.get(`${BASE_URL}/account/tenaga-medis/id/${idTenagaMedis}/`);
  },

  updateTenagaMedisByID: ({ idTenagaMedis, fullName }) => {
    const formData = new FormData();
    formData.append("account.full_name", fullName);

    return axios.patch(`${BASE_URL}/account/tenaga-medis/id/${idTenagaMedis}/`, formData);
  },

  createTenagaMedis: ({ idCabang, email, password, fullName, sipFile } = {}) => {
    const formData = new FormData();
    formData.append("account.email", email);
    formData.append("account.password", password);
    formData.append("account.full_name", fullName);
    formData.append("sip", sipFile);

    return axios.post(`${BASE_URL}/account/tenaga-medis/${idCabang}/`, formData);
  },

  deleteTenagaMedisByID: ({ idTenagaMedis }) => {
    return axios.delete(`${BASE_URL}/account/tenaga-medis/id/${idTenagaMedis}/`);
  },
};

export default tenagaMedis;
