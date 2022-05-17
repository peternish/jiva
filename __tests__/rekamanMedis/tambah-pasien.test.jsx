import "@testing-library/jest-dom";
import { render, screen, act, fireEvent } from "@testing-library/react";
import PatientForm from "@pages/rekaman-medis/tambah-pasien";
import * as nextRouter from 'next/router';

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setPasienList } from "@redux/modules/rekamanMedis";

// utils
import { SAMPLE_PASIEN } from "@utils/testUtils/constants"

describe("<PatientForm/>", () => {
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
                <PatientForm />
            </Provider>
        );
    });

    it("renders title correctly", () => {
        expect(screen.getByText("Tambah Pasien")).toBeInTheDocument();
    });

    it("renders fields correctly", () => {
        expect(screen.getByLabelText("Nama Lengkap")).toBeInTheDocument();
        expect(screen.getByLabelText("NIK")).toBeInTheDocument();
    });

    it('renders submit buttons', () => {
        expect(screen.getByText("Simpan")).toBeInTheDocument()
    });

    it('invalidate empty name field', async () => {
        const submitButton = screen.getByText("Simpan")

        await act(async () => {
            await fireEvent.click(submitButton);
        })

        expect(screen.getByText("Nama lengkap wajib diisi")).toBeInTheDocument();
    });

    it('invalidate empty nik field', async () => {
        const submitButton = screen.getByText("Simpan")

        await act(async () => {
            await fireEvent.click(submitButton);
        })

        expect(screen.getByText("NIK wajib diisi")).toBeInTheDocument();
    });

    it('invalidate non-numeric nik field', async () => {
        const nikField = screen.getByLabelText("NIK")

        await act(async () => {
            await fireEvent.change(nikField, { target: { value: 'abcdefg' } });
        })

        expect(screen.getByText("NIK tidak valid")).toBeInTheDocument();
    });
});
