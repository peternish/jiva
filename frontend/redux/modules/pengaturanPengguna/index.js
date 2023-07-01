import { createSlice } from "@reduxjs/toolkit";

const pengaturanPengguna = createSlice({
  name: "pengaturanPengguna",
  initialState: {
    pengaturanPengguna: undefined,
    penggunaTable: undefined,
  },
  reducers: {
    setPengaturanPengguna(state, { payload }) {
      state.pengaturanPengguna = payload;
      return state;
    },
    setPenggunaTable(state, { payload }) {
      state.penggunaTable = payload;
      return state;
    },
  },
});

export const { setPengaturanPengguna, setPenggunaTable } = pengaturanPengguna.actions;

export default pengaturanPengguna.reducer;
