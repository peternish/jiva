import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RekamanMedisGlobal from "@pages/rekaman-medis";

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setPasienList } from "@redux/modules/rekamanMedis";

// utils
import { SAMPLE_PASIEN } from "@utils/testUtils/constants"

describe("<RekamanMedisGlobal/> empty", () => {
    beforeEach(async () => {

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
        expect(screen.getByText("sample patient")).toBeInTheDocument();
        expect(screen.getByText("123")).toBeInTheDocument();
    });

    it('renders buttons', () => {
        expect(screen.getByText("Tambah Pasien")).toBeInTheDocument()
    });

    it('shows the table are empty', async () => {
        await store.dispatch(setSchemas([]))

        render(
            <Provider store={store}>
                <RekamanMedisGlobal />
            </Provider>
        );

        expect(screen.getByText("Belum ada Pasien yang terdaftar")).toBeInTheDocument()
    })
});
