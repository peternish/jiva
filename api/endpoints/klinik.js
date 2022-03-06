import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/klinik";

const endpoints = {
  createKlinik: ({ clinicName, sikFile } = {}) => {
    const formData = new FormData();
    formData.append("name", clinicName);
    formData.append("sik", sikFile);

    return axios.post(BASE_URL + "/", formData);
  },
};

export default endpoints;
