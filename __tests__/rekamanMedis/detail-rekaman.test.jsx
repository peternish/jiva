import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

// components
import DetailRekamanMedis from "@pages/klinik/[idKlinik]/[idCabang]/rekaman-medis/[nik]/detail/[rekamanMedisId]";

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setPasien, setListRekamanMedis } from "@redux/modules/rekamanMedis";

const dummyData =
    [{
        author: {
            account: {
                cabang: 1,
                date_joined: "2022-04-25T08:42:34.655857Z",
                email: "tm4@klinik99.com",
                full_name: "tm4@klinik99.com",
                id: 3,
                klinik: 1,
                last_login: "2022-04-25T08:42:34.655857Z",
                role: "tenaga_medis"
            },
            sip: "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
        },
        fields: [
            {
                label: "Tanggal",
                name: "date-1653145023592-0",
                required: false,
                type: "date",
                value: "2022-05-22"
            },
            {
                label: "Nama",
                name: "text-1653145060181-0",
                required: false,
                type: "text",
                value: "Reine"
            }
        ],
        id: 2,
        patient: 1,
        time_created: "22 Mei 2022"
    }]

describe("Detail Rekaman Medis", () => {
    beforeEach(async () => {
        await store.dispatch(setPasien({
            full_name: "Pavolia Reine",
            id: 1,
            nik: 3175070201011003
        }))
        await store.dispatch(setListRekamanMedis(dummyData))
        nextRouter.useRouter = jest.fn();
        nextRouter.useRouter.mockImplementation(() => ({
            route: '/klinik/1/1/rekaman-medis/3175070201011003/detail/2',
            query: { idKlinik: 1, idCabang: 1, nik: 3175070201011003, rekamanMedisId: 2 },
            isReady: true,
        }));
        render(
            <Provider store={store}>
                <DetailRekamanMedis />
            </Provider>
        )
    });

    afterEach(() => {
        let assignMock = jest.fn();
        delete window.location;
        window.location = { assign: assignMock };
        assignMock.mockClear();
    });

    describe("Main Components", () => {
        it("should render correctly", () => {
            const heading = screen.getByRole('heading');
            expect(heading).toBeInTheDocument();
        });

        it("should render every fields", () => {

            dummyData[0].fields.map((field) => {
                const label = field.label
                const labels = screen.getByText(label)

                expect(labels).toBeInTheDocument();
            })
        })
    })
})