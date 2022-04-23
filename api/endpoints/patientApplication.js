import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/klinik/pasien";

const patientApplication = {
  createApplication: ({ nik, email, fields, jadwal_tenaga_medis_pk }={}) => axios.post(`${BASE_URL}/compound/`, {
    nik,
    email,
    fields,
    jadwal_tenaga_medis_pk
  })
};

export default patientApplication;
