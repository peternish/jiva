import { createSlice } from "@reduxjs/toolkit";

const rekamanMedis = createSlice({
  name: "rekamanMedis",
  initialState: {
    pasien: undefined,
  },
  reducers: {
    setPasien(state, { payload }) {
      state.pasien = payload;
      return state;
    }
  },
});

export const { setPasien } = rekamanMedis.actions;

export default rekamanMedis.reducer;
