import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/tenaga-medis";

const tenagaMedisEndpoints = {
  getTenagaMedis: () => {
    return {
      data: [
        {
          id: 1,
          email: "anthony.davis@email.com",
          fullName: "Anthony Davis",
          sipFile: "https://jiva.storage.com/sip/1",
        },
        {
          id: 2,
          email: "brandon.jones@email.com",
          fullName: "Brandon Jones",
          sipFile: "https://jiva.storage.com/sip/2",
        },
        {
          id: 3,
          email: "connor.brown@email.com",
          fullName: "Connor Brown",
          sipFile: "https://jiva.storage.com/sip/3",
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
            email: "anthony.davis@email.com",
            fullName: "Anthony Davis",
            sipFile: "https://jiva.storage.com/sip/1",
          },
        ]
      };
    } else if (idTenagaMedis == 2) {
      return {
        data: [
          {
            id: 2,
            email: "brandon.jones@email.com",
            fullName: "Brandon Jones",
            sipFile: "https://jiva.storage.com/sip/2",
          },
        ]
      };
    } else if (idTenagaMedis == 3) {
      return {
        data: [
          {
            id: 3,
            email: "connor.brown@email.com",
            fullName: "Connor Brown",
            sipFile: "https://jiva.storage.com/sip/3",
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
