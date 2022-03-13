// api
import jivaAPI from "@api/index";

// toast
import { toast } from "react-toastify";

// actions
import { setPengaturanPengguna, setPenggunaTable } from "@redux/modules/pengaturanPengguna";

export const getPengaturanPenggunaByID = ({ idPengaturanPengguna }) => {
  return async (dispatch) => {
    try {
      const { data } = await jivaAPI.pengaturanPengguna.getPengaturanPenggunaByID(
        { idPengaturanPengguna });
      await dispatch(setPengaturanPengguna(data[0]));
    } catch (error) {
      toast(error.toString(), { type: toast.TYPE.ERROR });
    }
  };
};

export const getPengaturanPengguna = () => {
  return async (dispatch) => {
    try {
      const { data } = await jivaAPI.pengaturanPengguna.getPengaturanPengguna();
      await dispatch(setPenggunaTable(data));
    } catch (error) {
      toast(error.toString(), { type: toast.TYPE.ERROR });
    }
  };
};

export const deletePengaturanPengguna = ({ idPengaturanPengguna }) => {
  return async (dispatch) => {
    try {
      const { data } = await jivaAPI.pengaturanPengguna.getPengaturanPenggunaByID(
        { idPengaturanPengguna });
      await dispatch(setPengaturanPengguna(data[0]));
      await jivaAPI.pengaturanPengguna.deletePengaturanPengguna(
        { idPengaturanPengguna });
    } catch (error) {
      toast(error.toString(), { type: toast.TYPE.ERROR });
    }
  };
};

export const createPengaturanPengguna = ({ 
  email,
  password,
  fullName,
} = {}) => {
  return async (dispatch) => {
    try {
      await jivaAPI.pengaturanPengguna.createPengaturanPengguna({ email, password, full_name: fullName });
      const { data } = await jivaAPI.pengaturanPengguna.getPengaturanPengguna()[-1]
      await dispatch(setPengaturanPengguna(data))
    } catch (error) { 
      let errorMessage = "Something went wrong 😥";
      if (error?.response?.status === 400 && error?.response?.data) {
        errorMessage = getStringOrFirstArrayValue(
          Object.values(error.response.data)[0]
        );
      }
      toast(error.toString(), { type: toast.TYPE.ERROR });
    };
  }
};

