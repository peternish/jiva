import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL;

const pengaturanPengguna = {
  getPengaturanPengguna: ({ idCabang }) => {
    return axios.get(`${BASE_URL}/account/staf/${idCabang}/`);
  },

  getPengaturanPenggunaByID: ({ idPengaturanPengguna }) => 
    {
      return axios.get(`${BASE_URL}/account/staf/id/${idPengaturanPengguna}/`);
    },

  createPengaturanPengguna: ({ idCabang, email, password, full_name } = {}) =>
    axios.post(`${BASE_URL}/account/staf/${idCabang}/`, {
      email,
      password,
      full_name,
    }),

  updatePengaturanPengguna: ({ idPengaturanPengguna, email, full_name } = {}) =>
    axios.put(`${BASE_URL}/account/staf/id/${idPengaturanPengguna}/`, {
      email, 
      full_name,
    }),

  deletePengaturanPengguna: ({ idPengaturanPengguna } = {}) =>
    axios.delete(`${BASE_URL}/account/staf/id/${idPengaturanPengguna}/`, {
    }),
};

export default pengaturanPengguna;