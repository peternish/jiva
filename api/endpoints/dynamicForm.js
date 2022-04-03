import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL

const DyanmicFormEndpoints = {
  getSchema: ({ idCabang }) => {
    return axios.get(`${BASE_URL}/klinik/cabang/${idCabang}/dform/`)
  },

  getSchemaByID: ({ idCabang, idSchema }) => {
    return axios.get(`${BASE_URL}/klinik/cabang/${idCabang}/dform/${idSchema}/`)
  },

  updateSchema: (schema) => {
    const { cabang_id, id, ...payload } = schema;

    return axios.patch(`${BASE_URL}/klinik/cabang/${cabang_id}/dform/${id}/`, payload)
  },

  createSchema: ({ idCabang, formType, formFields }) => {
    const payload = {
      cabang: idCabang,
      formtype: formType,
      fields: formFields,
    }

    return axios.post(`${BASE_URL}/klinik/cabang/${idCabang}/dform/`, payload)
  },

  deleteSchemaByID: ({ idSchema }) => {
    return axios.delete(`${BASE_URL}/klinik/cabang/${idCabang}/dform/${idSchema}/`)
  },
}

export default DyanmicFormEndpoints;
