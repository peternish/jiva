import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/pengaturan-pengguna";

const Endpoints = {
  getPengaturanPengguna: () => {
    return {
      data: [
        {
          id: 1,
          email: "examels@gomail.com",
          password: "Sata Ganaga",
          inputValue: "what",
          role: "Admin",
          noTelp: "123654789",
        },
        {
          id: 2,
          email: "eximals@gomail.com",
          password: "Sati Ganagi",
          inputValue: "what",
          role: "Moderator",
          noTelp: "132654789",
        },
        {
          id: 3,
          email: "exemalss@gomail.com",
          password: "SatuGanagu",
          inputValue: "what",
          role: "Member",
          noTelp: "126354789",
        },
      ]
    };
    // return axios.get(BASE_URL);
  },

  getTenagaMedisByID: ({ idPengaturanPengguna }) => {
    if (idPengaturanPengguna == 1) {
      return {
        data: [
          {
            id: 1,
            email: "examels@gomail.com",
            password: "Sata Ganaga",
            inputValue: "what",
            role: "Admin",
            noTelp: "123654789",
          },
        ]
      };
    } else if (idPengaturanPengguna == 2) {
      return {
        data: [
          {
            id: 2,
            email: "eximals@gomail.com",
            password: "Sati Ganagi",
            inputValue: "what",
            role: "Moderator",
            noTelp: "132654789",
          },
        ]
      };
    } else if (idPengaturanPengguna == 3) {
      return {
        data: [
          {
            id: 3,
            email: "exemalss@gomail.com",
            password: "SatuGanagu",
            inputValue: "what",
            role: "Member",
            noTelp: "126354789",
          },
        ]
      };
    };
  },

  createPengaturanPengguna: ({ email }) => {
    return axios.post(BASE_URL, { email });
  },
};

export default Endpoints;