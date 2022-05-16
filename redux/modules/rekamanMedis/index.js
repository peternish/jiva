import { createSlice } from "@reduxjs/toolkit";

const rekamanMedis = createSlice({
  name: "rekamanMedis",
  initialState: {
    pasien: undefined,
    listRekamanMedis: undefined,
  },
  reducers: {
    setPasien(state, { payload }) {
      state.pasien = payload;
      return state;
    },
    setListRekamanMedis(state, { payload }) {
      state.listRekamanMedis = payload;
      return state;
    }
  },
});

export const { setPasien, setListRekamanMedis } = rekamanMedis.actions;

export default rekamanMedis.reducer;
