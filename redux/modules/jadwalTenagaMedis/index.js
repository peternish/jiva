import { createSlice } from "@reduxjs/toolkit";

const jadwalTenagaMedis = createSlice({
  name: "jadwalTenagaMedis",
  initialState: {
    jadwalTenagaMedisList: undefined,
    jadwalTenagaMedis: undefined,
  },
  reducers: {
    setJadwalTenagaMedisList(state, { payload }) {
      state.jadwalTenagaMedisList = payload;
      console.log(state.jadwalTenagaMedisList)
      return state;
    },
    setJadwalTenagaMedis(state, {payload}) {
        state.jadwalTenagaMedis = payload;
        return state;
    }
  },
});

export const { setJadwalTenagaMedisList, setJadwalTenagaMedis } = jadwalTenagaMedis.actions;

export default jadwalTenagaMedis.reducer;
