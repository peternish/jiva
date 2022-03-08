import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/tenaga-medis";

const tenagaMedisEndpoints = {
  getTenagaMedis: () => {
    return {
      data: [
        {
          id: 1,
          name: "Anthony",
          tempatTanggalLahir: "Berlin, 12 Maret 1976",
          nik: "1234567890",
        },
        {
          id: 2,
          name: "Brandon",
          tempatTanggalLahir: "Hamburg, 5 Oktober 1980",
          nik: "2345678901",
        },
        {
          id: 3,
          name: "Connor",
          tempatTanggalLahir: "Munich, 27 Agustus 1970",
          nik: "3456789012",
        },
      ]
    };
    // return axios.get(BASE_URL);
  },

  getTenagaMedisByID: ({ idTenagaMedis }) => {
    if (idTenagaMedis == 1) {
      return {
        data: [
          {
            id: 1,
            name: "Anthony",
            tempatTanggalLahir: "Berlin, 12 Maret 1976",
            nik: "1234567890",
          },
        ]
      };
    } else if (idTenagaMedis == 2) {
      return {
        data: [
          {
            id: 2,
            name: "Brandon",
            tempatTanggalLahir: "Hamburg, 5 Oktober 1980",
            nik: "2345678901",
          },
        ]
      };
    } else if (idTenagaMedis == 3) {
      return {
        data: [
          {
            id: 3,
            name: "Connor",
            tempatTanggalLahir: "Munich, 27 Agustus 1970",
            nik: "3456789012",
          },
        ]
      };
    };
  },

  updateTenagaMedisByID: ({ id, name, tempatTanggalLahir, nik }) => {
    return null;
  },

  createTenagaMedis: ({ nomorTelepon }) => {
    return axios.post(BASE_URL, { nomorTelepon });
  },
};

export default tenagaMedisEndpoints;
