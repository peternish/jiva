// api
import jivaAPI from "@api/index";
import { persistor } from "@redux/store";

// toast
import { toast } from "react-toastify";

// utils
import { getStringOrFirstArrayValue, capitalize } from "@utils/index";

// actions
import { setAccessToken, setRefreshToken, setProfile } from "@redux/modules/auth";
import { isLoggedIn as isLoggedInSelector } from "@redux/modules/auth/selectors"

export const signup = ({
  email,
  password,
  fullName,
  clinicName,
  sikFile,
} = {}, setSubmitting) => {
  return async (dispatch) => {
    try {
      await jivaAPI.auth.signup({ email, password, full_name: fullName });
      await dispatch(getTokens({ email, password }));
      await jivaAPI.klinik.createKlinik({ clinicName, sikFile });
      toast("Klinik berhasil dibuat", { type: toast.TYPE.SUCCESS });
      location.assign("/klinik");
    } catch (error) {
      setSubmitting(false)
      let errorMessage = "Terjadi kesalahan 😥";
      if (error?.response?.status === 400 && error?.response?.data) {
        errorMessage = getStringOrFirstArrayValue(
          Object.values(error.response.data)[0]
        );
        errorMessage = capitalize(errorMessage);
      }
      toast(errorMessage, { type: toast.TYPE.ERROR });
    }
  };
};

export const login = ({ email, password } = {}, setSubmitting) => {
  return async (dispatch, _getState) => {
    try {
      await dispatch(getTokens({ email, password }));
      const { data } = await jivaAPI.auth.profile()
      await dispatch(setProfile(data))
      await dispatch(redirectHandler())
    } catch (error) {
      setSubmitting(false)
      let errorMessage = "Terjadi kesalahan 😥";
      if (error?.response?.status === 401 && error?.response?.data) {
        const { detail } = error.response.data;
        errorMessage = capitalize(detail);
      }
      toast(errorMessage, { type: toast.TYPE.ERROR });
    }
  };
};

export const getTokens = ({ email, password } = {}) => {
  return async (dispatch) => {
    const {
      data: { access, refresh },
    } = await jivaAPI.auth.login({
      email,
      password,
    });
    await dispatch(setAccessToken(access));
    await dispatch(setRefreshToken(refresh));
  };
};

export const refreshToken = () => {
  return async (dispatch, _getState) => {
    const {
      data: { access },
    } = await jivaAPI.auth.refresh({
      refresh: _getState().auth.refreshToken,
    });
    await dispatch(setAccessToken(access));
  };
};

export const logout = () => {
  return async () => {
    await persistor.purge();
    window.location.assign("/");
  };
};

export const redirectHandler = () => {
  return (_, getState) => {
    const isLoggedIn = isLoggedInSelector(getState())
    const publicRoutes = [ /^\/login$/, /^\/$/, /^\/register$/, /^\/form.*$/ ]
    const isPublicRoute = publicRoutes.some(rx => rx.test(location.pathname))
    if (!isPublicRoute && !isLoggedIn) {
      location.assign("/login")
    }
  
    if ([/^\/$/, /^\/login$/].some(rx => rx.test(location.pathname)) && isLoggedIn) {
      const { cabang, klinik, role } = getState().auth.profile
      
      switch(role) {
        case "owner":
          location.assign("/klinik");
          break;
        case "staf":
          location.assign(`/klinik/${klinik}/${cabang}/tenaga-medis`);
          break
        case "tenaga_medis":
          location.assign(`/klinik/${klinik}/${cabang}/pengaturan-formulir-rekaman-medis`);
          break
        default:
          throw new Error("No role found")
      }
    }
  }
}
