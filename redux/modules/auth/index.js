import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    accessToken: undefined,
    refreshToken: undefined,
  },
  reducers: {
    setAccessToken(state, { payload }) {
      state.token = payload;
      return state;
    },
    setRefreshToken(state, { payload }) {
      state.refreshToken = payload;
      return state;
    },
  },
});

export const { setAccessToken, setRefreshToken } = auth.actions;

export default auth.reducer;
