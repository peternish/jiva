import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    accessToken: undefined,
    refreshToken: undefined,
    sikFile: undefined,
  },
  reducers: {
    setAccessToken(state, { payload }) {
      state.accessToken = payload;
      return state;
    },
    setRefreshToken(state, { payload }) {
      state.refreshToken = payload;
      return state;
    },
    setSikFile(state, { payload }) {
      state.sikFile = payload;
      return state;
    },
  },
});

export const { setAccessToken, setRefreshToken, setSikFile } = auth.actions;

export default auth.reducer;
