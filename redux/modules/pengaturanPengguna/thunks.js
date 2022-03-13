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
    };
  };
};

export const getPengaturanPengguna = () => {
  return async (dispatch) => {
    try {
      const { data } = await jivaAPI.pengaturanPengguna.getPengaturanPengguna();
      await dispatch(setPenggunaTable(data));
    } catch (error) {
      toast(error.toString(), { type: toast.TYPE.ERROR });
    };
  };
};

export const createPengaturanPengguna = ({ email }) => {
  return async (dispatch) => {
    try {
      await jivaAPI.pengaturanPengguna.createPengaturanPengguna();
    } catch (error) {
      toast(error.toString(), { type: toast.TYPE.ERROR });
    };
  };
};

