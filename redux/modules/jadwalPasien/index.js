import { createSlice } from "@reduxjs/toolkit";

const jadwalPasien = createSlice ({
    name: "jadwalPasien",
    initialState: {
        jadwalPasien: undefined
    },
    reducers: {
        setJadwalPasien(state, { payload }) {
            state.jadwalPasien = payload;
            console.log("state pasien", state.jadwalPasien)
            return state;
        }
    },
});

export const { setJadwalPasien } = jadwalPasien.actions;

export default jadwalPasien.reducer;