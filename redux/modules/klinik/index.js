import { createSlice } from "@reduxjs/toolkit";

const klinik = createSlice({
  name: "klinik",
  initialState: {
    cabangList: undefined,
    klinik: undefined,
  },
  reducers: {
    setCabangList(state, { payload }) {
      state.cabangList = payload;
      return state;
    },
    setKlinik(state, { payload }) {
      state.klinik = payload;
      return state;
    },
  },
});

export const { setCabangList, setKlinik } = klinik.actions;

export default klinik.reducer;
