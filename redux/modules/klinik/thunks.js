// api
import jivaAPI from "@api/index";

// toast
import { toast } from "react-toastify";

// actions
import { setCabangList, setKlinik } from "@redux/modules/klinik";
import constants from "@utils/constants"

export const getCabang = () => {
  return async (dispatch) => {
    try {
      const res = await jivaAPI.cabang.fetch_all()
      await dispatch(setCabangList(res.data))
    } catch (error) {
      toast(error.toString(), { type: toast.TYPE.ERROR });
    }
  }
}

export const getKlinik = () => {
  return async (dispatch) => {
    try {
      const res = await jivaAPI.klinik.fetch()
      await dispatch(setKlinik(res.data))
    } catch (error) {
      toast(error.toString(), { type: toast.TYPE.ERROR });
    }
  }
}

export const registerCabang = (setSubmitting, { location } = {}) => {
  return async () => {
    try {
      await jivaAPI.cabang.register({ location })
      window.location.assign("/klinik");
      toast('Cabang berhasil dibuat', { type: toast.TYPE.SUCCESS });
    } catch (err) {
      setSubmitting(false)
      toast(err.toString(), { type: toast.TYPE.ERROR });
    }
  };
};

export const createApplication = (setSubmitting, { nik, fields }={}) => {
  return async () => {
    try {
      await jivaAPI.patientApplication({ nik, fields })
      toast("Pendaftaran Anda Sudah Terkirim", { type: toast.TYPE.SUCCESS });
    } catch(error) {
      setSubmitting(false)
      toast(constants.BASE_ERROR_MESSAGE, { type: toast.TYPE.ERROR });
    }
  }
}
