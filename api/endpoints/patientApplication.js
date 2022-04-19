import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/klinik/pasien";

const patientApplication = {
  createApplication: ({ nik, email, fields }={}) => axios.post(`${BASE_URL}/`, {
    nik,
    email,
    fields
  })
};

export default patientApplication;
