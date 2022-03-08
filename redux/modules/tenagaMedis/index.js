import { createSlice } from "@reduxjs/toolkit";

const tenagaMedis = createSlice({
  name: "tenagaMedis",
  initialState: {
    tenagaMedisList: undefined,
  },
  reducers: {
    setTenagaMedisList(state, { payload }) {
      state.tenagaMedisList = payload;
      return state;
    },
  },
});

export const { setTenagaMedisList } = tenagaMedis.actions;

export default tenagaMedis.reducer;
