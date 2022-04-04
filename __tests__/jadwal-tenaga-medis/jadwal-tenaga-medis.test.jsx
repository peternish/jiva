import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

import Jadwal from '@pages/klinik/[idKlinik]/[idCabang]/jadwal-tenaga-medis';

import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setJadwalTenagaMedis, setJadwalTenagaMedisList } from '@redux/modules/jadwalTenagaMedis';

describe('JadwalTenagaMedis', () => {
    
})