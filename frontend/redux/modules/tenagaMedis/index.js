import { createSlice } from "@reduxjs/toolkit";

const tenagaMedis = createSlice({
  name: "tenagaMedis",
  initialState: {
    tenagaMedis: undefined,
    tenagaMedisList: undefined,
  },
  reducers: {
    setTenagaMedis(state, { payload }) {
      state.tenagaMedis = payload;
      return state;
    },
    setTenagaMedisList(state, { payload }) {
      state.tenagaMedisList = payload;
      return state;
    },
  },
});

export const { setTenagaMedis, setTenagaMedisList } = tenagaMedis.actions;

export default tenagaMedis.reducer;
