import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/ehr";

const rekamanMedis = {
  getAllPasien: () => axios.get(`${BASE_URL}/pasien/`),
  postPasien: ({ full_name, nik }) => axios.post(`${BASE_URL}/pasien/`, {
    full_name,
    nik
  }),
  getPasien: (nik) => axios.get(BASE_URL + "/pasien/" + nik + "/"),
  tambahEntri: ({ nik, fields } = {}) => axios.post(BASE_URL + "//", {
    patient: nik,
    fields
  }),
  getListRekamanMedis: ({ nik }) => {
    return axios.get(`${BASE_URL}/rekaman/${nik}/`);
  },
};

export default rekamanMedis;
