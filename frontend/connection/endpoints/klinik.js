import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/klinik";

const klinik = {
  createKlinik: ({ clinicName, sikFile } = {}) => {
    const formData = new FormData();
    formData.append("name", clinicName);
    formData.append("sik", sikFile);

    return axios.post(BASE_URL + "/", formData);
  },
  fetch: () => {
    return axios.get(BASE_URL + "/");
  },
};

export default klinik;
