import "@testing-library/jest-dom";
import { render, screen, act, fireEvent } from "@testing-library/react";
import * as nextRouter from 'next/router';

// components
import PasienCreatePage from '@pages/klinik/[idKlinik]/[idCabang]/rekaman-medis/tambah-pasien';
import PatientForm from "@pages/rekaman-medis/tambah-pasien";

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

    describe('PasienCreatePage', () => {
        beforeEach(() => {
            nextRouter.useRouter = jest.fn();
            nextRouter.useRouter.mockImplementation(() => ({
                route: '/klinik/1/1/rekaman-medis/tambah-pasien',
                query: { idKlinik: 1, idCabang: 1 },
                isReady: true,
            }));
            render(
                <Provider store={store}>
                    <PasienCreatePage />
                </Provider>
            );
        });


        afterEach(() => {
            let assignMock = jest.fn();
            delete window.location;
            window.location = { assign: assignMock };
            assignMock.mockClear();
        });

        it('renders the correct heading', () => {
            const heading = screen.getAllByRole('heading', {
                name: /Tambah Pasien/,
            });
            expect(heading.length > 0).toBeTruthy();
        });


        it('renders necessary data fields', () => {
            const fullNameField = screen.getByLabelText("Nama Lengkap")
            const nikField = screen.getByLabelText("NIK");
            expect(fullNameField).toBeInTheDocument();
            expect(nikField).toBeInTheDocument();
        });


        it('renderes Batal button', () => {
            const button = screen.getByRole('link', {
                name: /Batal/,
            });
            expect(button).toBeInTheDocument();
        });


        it('renders Tambah button', () => {
            const button = screen.getByRole('button', {
                name: /Tambah/,
            });
            expect(button).toBeInTheDocument();
        });


        it("updates field values based on input", async () => {
            const fullNameField = screen.getByLabelText("Nama Lengkap")
            const nikField = screen.getByLabelText("NIK");
            await act(async () => {
                const testFullName = 'Budi Budiman'
                const testNIK = '3276001122330001'
                await fireEvent.change(fullNameField, { target: { value: testFullName } });
                await fireEvent.change(nikField, { target: { value: testNIK } });
                expect(fullNameField.value).toBe(testFullName);
                expect(nikField.value).toBe(testNIK);
            });
        });
    });
});
