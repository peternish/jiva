import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/klinik/cabang";

const dynamicForm = {
  fetchAll: ({ cabang_id } = {}) => axios.get(`${BASE_URL}/${cabang_id}/dform/`),
  fetch: ({ cabang_id, form_id } = {}) => axios.get(`${BASE_URL}/${cabang_id}/dform/${form_id}}/`),
  create: ({ cabang_id } = {}) => axios.post(`${BASE_URL}/${cabang_id}/dform/`),
  update: ({ cabang_id, form_id } = {}) => axios.patch(`${BASE_URL}/${cabang_id}/dform/${form_id}}/`),
  remove: ({ cabang_id, form_id } = {}) => axios.patch(`${BASE_URL}/${cabang_id}/dform/${form_id}}/`),
};

export default dynamicForm;
