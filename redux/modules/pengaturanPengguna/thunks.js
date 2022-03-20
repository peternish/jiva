// api
import jivaAPI from "@api/index";
//toast
import { toast } from "react-toastify";
// actions
import { setPengaturanPengguna, setPenggunaTable } from "@redux/modules/pengaturanPengguna";

export const getPengaturanPenggunaByID = ({ idPengaturanPengguna }) => {
  return async (dispatch) => {
    try {
      const { data } = await jivaAPI.pengaturanPengguna.getPengaturanPenggunaByID(
        { idPengaturanPengguna });
      await dispatch(setPengaturanPengguna(data));
    } catch (error) {
      console.log(error)
      toast("Terjadi kesalahan 😥", { type: toast.TYPE.ERROR });
    }
  };
};

export const getPengaturanPengguna = ( { idCabang }) => {
  return async (dispatch) => {
    try {
      const { data } = await jivaAPI.pengaturanPengguna.getPengaturanPengguna({ idCabang });
      await dispatch(setPenggunaTable(data));
    } catch (error) {
      // toast(error.toString(), { type: toast.TYPE.ERROR });
    }
  };
};

export const deletePengaturanPengguna = ({ idPengaturanPengguna }) => {
  return async (dispatch) => {
    try {
      await jivaAPI.pengaturanPengguna.deletePengaturanPengguna(
        { idPengaturanPengguna });
    } catch (error) {
      console.log(error)
      toast("Terjadi kesalahan 😥", { type: toast.TYPE.ERROR });
    }
  };
};

export const createPengaturanPengguna = ({ 
  idKlinik,
  idCabang,
  email,
  password,
  fullName,
} = {}) => {
  return async (dispatch) => {
    try {
      await jivaAPI.pengaturanPengguna.createPengaturanPengguna({ idCabang, email, password, full_name: fullName });
      window.location.assign(`/klinik/${idKlinik}/${idCabang}/pengaturan-pengguna`);
    } catch (error) { 
      console.log(error);
      if (error.response.data != null){
        toast(error.response.data.email.toString(), { type: toast.TYPE.ERROR });
      } else if (error?.response?.status === 400 && error?.response?.data) {
        errorMessage = getStringOrFirstArrayValue(
          Object.values(error.response.data)[0]
        );
        errorMessage = capitalize(errorMessage);
        toast("Terjadi kesalahan 😥, " + errorMessage, { type: toast.TYPE.ERROR });
      } else {
        toast("Terjadi kesalahan 😥", { type: toast.TYPE.ERROR })
      }
    }
  }
};

