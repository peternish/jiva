import "@testing-library/jest-dom";
import * as nextRouter from 'next/router';
import { render, screen } from "@testing-library/react";
import RekamanMedisGlobal from "@pages/klinik/[idKlinik]/[idCabang]/rekaman-medis";

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setPasienList } from "@redux/modules/rekamanMedis";

// utils
import { SAMPLE_PASIEN } from "@utils/testUtils/constants"

describe("<RekamanMedisGlobal/>", () => {
    beforeEach(async () => {

        nextRouter.useRouter = jest.fn();
        nextRouter.useRouter.mockImplementation(() => ({
            route: '/klinik/1/1',
            query: { idKlinik: 1, idCabang: 1 },
            isReady: true,
        }));

        await store.dispatch(setPasienList([SAMPLE_PASIEN]))

        render(
            <Provider store={store}>
                <RekamanMedisGlobal />
            </Provider>
        );
    });

    it("renders title correctly", () => {
        expect(screen.getByText("Daftar Pasien")).toBeInTheDocument();
    });

    it("renders patient data correctly", () => {
        expect(screen.getByText("sample")).toBeInTheDocument();
        expect(screen.getByText("123")).toBeInTheDocument();
    });

    it('renders buttons', () => {
        expect(screen.getByText("Tambah Pasien")).toBeInTheDocument()
    });

    it('shows the table are empty', async () => {
        await store.dispatch(setPasienList([]))

        render(
            <Provider store={store}>
                <RekamanMedisGlobal />
            </Provider>
        );

        expect(await screen.getAllByText(/Belum ada Pasien yang terdaftar/) > 0)
    })
});
