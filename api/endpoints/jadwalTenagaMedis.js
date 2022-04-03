import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL;

const jadwalTenagaMedisEndpoints = {
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
    console.log(data, "API")
    return axios.post(`${BASE_URL}/jadwal/tenaga-medis/create/${idTenagaMedis}/`, data)
  }
};

export default jadwalTenagaMedisEndpoints;
