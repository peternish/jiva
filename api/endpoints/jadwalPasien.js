import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL;

const jadwalPasien = {
    getJadwalPasienList: ({ idCabang }) => {
        return axios.get(`${BASE_URL}/jadwal/pasien/bycabang/${idCabang}`)
    }
};

export default jadwalPasien;