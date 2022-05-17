import { createSlice } from "@reduxjs/toolkit";

const rekamanMedis = createSlice({
  name: "rekamanMedis",
  initialState: {
    pasien: undefined,
    pasienList: undefined,
  },
  reducers: {
    setPasien(state, { payload }) {
      state.pasien = payload;
      return state;
    },
    setPasienList(state, { payload }) {
      state.pasienList = payload;
      return state;
    },
  },
});

export const { setPasien, setPasienList } = rekamanMedis.actions;

export default rekamanMedis.reducer;
