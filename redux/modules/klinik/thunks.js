// api
import jivaAPI from "@api/index";

// toast
import { toast } from "react-toastify";

// actions
import { setCabangList, setKlinik } from "@redux/modules/klinik";

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

export const registerCabang = ({ location } = {}) => {
  return async () => {
    try {
      await jivaAPI.cabang.register({ location })
      window.location.assign("/klinik");
    } catch (err) {
      toast(err.toString(), { type: toast.TYPE.ERROR });
    }
  };
};
