import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL;

const jadwalTenagaMedis = {
  getJadwalTenagaMedisList: ({ idCabang }) => {
    return axios.get(`${BASE_URL}/jadwal/tenaga-medis/${idCabang}/`);
  },

  getJadwalTenagaMedis: ({ idJadwal }) => {
    return axios.get(`${BASE_URL}/jadwal/tenaga-medis/id/${idJadwal}/`);
  },

  createJadwalTenagaMedis: ({ idTenagaMedis, startTime, endTime, quota, day }) => {
    const data = {
      "start_time": startTime,
      "end_time": endTime,
      "quota": quota,
      "day": day
    }
    return axios.post(`${BASE_URL}/jadwal/tenaga-medis/create/${idTenagaMedis}/`, data)
  },

  deleteJadwalTenagaMedis: ({ idJadwal }) => {
    return axios.delete(`${BASE_URL}/jadwal/tenaga-medis/id/${idJadwal}/`)
  },

  updateJadwalTenagaMedis: ({ idJadwal, startTime, endTime, quota, day }) => {
    const data = {
      "start_time": startTime,
      "end_time": endTime,
      "quota": quota,
      "day": day
    }
    return axios.patch(`${BASE_URL}/jadwal/tenaga-medis/id/${idJadwal}/`, data)
  }
};

export default jadwalTenagaMedis;
