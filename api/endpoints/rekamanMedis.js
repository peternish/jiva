import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/ehr";

const rekamMedisEndpoints = {

    createPasien: ({ nik, fullName }) => {
        return axios.post(`${BASE_URL}/pasien/`, {
            nik: nik, 
            full_name: fullName
        })
    }
};

export default rekamMedisEndpoints;
