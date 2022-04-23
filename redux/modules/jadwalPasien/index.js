import { createSlice } from "@reduxjs/toolkit";

const jadwalPasien = createSlice ({
    name: "jadwalPasien",
    initialState: {
        jadwalPasien: undefined
    },
    reducers: {
        setJadwalPasien(state, { payload }) {
            state.jadwalPasien = payload;
            return state;
        }
    }
});

export const {setJadwalPasien} = jadwalPasien;

export default jadwalPasien.reducer;