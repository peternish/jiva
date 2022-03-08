// api
import jivaAPI from "@api";

// actions
import { setAccessToken, setRefreshToken } from "@api/modules/auth";

export const signup = ({ email, password, full_name }={}) => {
  return async (dispatch, _getState) => {
    try {
      const { data } = await jivaAPI.auth.signup({ email, password, full_name })
    } catch (error) {
      // ignore for now
    }
  };
};

export const login = async (email, password) => {
  return async (dispatch) => {};
};

export const logout = async () => {};
