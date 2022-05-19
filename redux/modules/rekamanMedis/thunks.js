// api
import jivaAPI from "@api/index";

// toast
import { toast } from "react-toastify";

// actions
import { setPasien, setListRekamanMedis, setPasienList } from "@redux/modules/rekamanMedis";


export const getAllPasien = () => {
  return async (dispatch) => {
    try {
      const { data } = await jivaAPI.rekamanMedis.getAllPasien();
      await dispatch(setPasienList(data));
    } catch (error) {
      let errorMessage = "Gagal mengambil informasi pasien 😥";
      toast(errorMessage, { type: toast.TYPE.ERROR });
      console.error(error)
    }
  };
};

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

export const registerPatient = (setSubmitting, { full_name, nik } = {}) => {
  return async () => {
    try {
      setSubmitting(true)
      jivaAPI.rekamanMedis.postPasien({ full_name, nik })
      window.location.href = '../rekaman-medis'
      toast('Berhasil mendaftarkan pasien', { type: toast.TYPE.SUCCESS });
    } catch (err) {
      setSubmitting(false)
      console.error(err.toString())
      toast('Gagal mendaftarkan pasien', { type: toast.TYPE.ERROR });
    }
  };
};


export const tambahEntri = (values, setSubmitting) => {
  return async () => {
    try {
      await jivaAPI.rekamanMedis.postPasien(values)
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
