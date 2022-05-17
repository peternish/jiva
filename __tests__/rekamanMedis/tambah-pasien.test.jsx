import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PatientForm from "@pages/rekaman-medis/tambah-pasien";

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
                <PatientForm />
            </Provider>
        );
    });

    it("renders title correctly", () => {
        expect(screen.getByText("Tambah Pasien")).toBeInTheDocument();
    });

    it("renders fields correctly", () => {
        expect(screen.getByLabelText("fullName")).toBeInTheDocument();
        expect(screen.getByLabelText("nik")).toBeInTheDocument();
    });

    it('renders submit buttons', () => {
        expect(screen.getByText("Simpan")).toBeInTheDocument()
    });

    it('invalidate empty name field', async () => {
        const fullNameField = screen.getByLabelText("fullName")

        await act(async () => {
            await fireEvent.click(fullNameField);
        })

        expect(screen.getByText("Nama lengkap wajib diisi")).toBeInTheDocument();
    });

    it('invalidate empty nik field', async () => {
        const nikField = screen.getByLabelText("nik")

        await act(async () => {
            await fireEvent.click(nikField);
        })

        expect(screen.getByText("NIK wajib diisi")).toBeInTheDocument();
    });

    it('invalidate non-numeric nik field', async () => {
        const nikField = screen.getByLabelText("nik")

        await act(async () => {
            await fireEvent.change(nikField, { target: { value: 'abcdefg' } });
        })

        expect(screen.getByText("NIK tidak valid")).toBeInTheDocument();
    });
});
