import constants from "@api/constants";
import { axiosInstance as axios } from "@api/http";

const BASE_URL = constants?.API_BASE_URL + "/pengaturan-pengguna";

const pengaturanPengguna = {
  getPengaturanPengguna: () => {
    // return {
    //   data: [
    //     {
    //       id: 1,
    //       email: "examels@gomail.com",
    //       full_name: "Sata Ganaga",
    //       password: "what",
    //       role: "Admin",
    //       noTelp: "123654789",
    //     },
    //     {
    //       id: 2,
    //       email: "eximals@gomail.com",
    //       full_name: "Sati Ganagi",
    //       password: "what",
    //       role: "Moderator",
    //       noTelp: "132654789",
    //     },
    //     {
    //       id: 3,
    //       email: "exemalss@gomail.com",
    //       full_name: "SatuGanagu",
    //       password: "what",
    //       role: "Member",
    //       noTelp: "126354789",
    //     },
    //   ]
    // };
    return axios.get(`${BASE_URL}/staf/`);
  },

  getPengaturanPenggunaByID: ({ idPengaturanPengguna }) => 
    {
      // if (idPengaturanPengguna == 1) {
      //   return {
      //     data: [
      //       {
      //         id: 1,
      //         email: "examels@gomail.com",
      //         full_name: "Sata Ganaga",
      //         password: "what",
      //         role: "Admin",
      //         noTelp: "123654789",
      //       },
      //     ]
      //   };
      // } else if (idPengaturanPengguna == 2) {
      //   return {
      //     data: [
      //       {
      //         id: 2,
      //         email: "eximals@gomail.com",
      //         full_name: "Sati Ganagi",
      //         password: "what",
      //         role: "Moderator",
      //         noTelp: "132654789",
      //       },
      //     ]
      //   };
      // } else if (idPengaturanPengguna == 3) {
      //   return {
      //     data: [
      //       {
      //         id: 3,
      //         email: "exemalss@gomail.com",
      //         full_name: "SatuGanagu",
      //         password: "what",
      //         role: "Member",
      //         noTelp: "126354789",
      //       },
      //     ]
      //   };
      // };
      return axios.get(`${BASE_URL}/account/staf/id/${idPengaturanPengguna}/`);
    },

  createPengaturanPengguna: ({ email, password, full_name } = {}) =>
    // const formData = new FormData();
    // formData.append("name", clinicName);
    // formData.append("sik", sikFile);
  
    axios.post(`${BASE_URL}/account/staf/depok`, {
      email,
      password,
      full_name,
    }),

  updatePengaturanPengguna: ({ idPengaturanPengguna, email, full_name } = {}) =>
    axios.put(`${BASE_URL}/account/staf/id/${idPengaturanPengguna}/`, {
      email, 
      full_name,
    }),

  deletePengaturanPengguna: ({ idPengaturanPengguna } = {}) =>
    axios.delete(`${BASE_URL}/account/staf/id/${idPengaturanPengguna}/`, {
    }),
};

export default pengaturanPengguna;