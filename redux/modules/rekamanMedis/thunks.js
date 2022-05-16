// api
import jivaAPI from "@api/index";

// toast
import { toast } from "react-toastify";

// actions
import { setPasien, setListRekamanMedis } from "@redux/modules/rekamanMedis";

export const getPasien = (nik) => {
  return async (dispatch) => {
    try {
      const { data } = await jivaAPI.rekamanMedis.getPasien(nik)
      dispatch(setPasien(data))
    } catch (error) {
      toast("Terjadi kesalahan 😥", { type: toast.TYPE.ERROR });
    }
  }
}

export const tambahEntri = (values, setSubmitting) => {
  return async () => {
    try {
      await jivaAPI.rekamanMedis.tambahEntri(values)
      toast("Entri Berhasil Ditambahkan", { type: toast.TYPE.SUCCESS });
      setSubmitting(false)
    } catch (error) {
      toast("Terjadi kesalahan 😥", { type: toast.TYPE.ERROR });
      setSubmitting(false)
    }
  }
}

export const getListRekamanMedis = (nik) => {
  return async (dispatch) => {
    try {
      const { data } = await jivaAPI.rekamanMedis.getListRekamanMedis(nik);
      dispatch(setListRekamanMedis(data));
    } catch (error) {
      toast("Terjadi kesalahan 😥", { type: toast.TYPE.ERROR });
    }
  }
}
