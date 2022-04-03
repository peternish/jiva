import { Provider } from "react-redux";
import * as nextRouter from 'next/router';
import RegistrationForm from '@pages/form/[idKlinik]/[idCabang]/[idForm]/index'
import { fireEvent, render, screen, act } from "@testing-library/react";
import { store } from "@redux/store";
import '@testing-library/jest-dom'

describe("Dynamic Form", () => {
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({
      route: '/form/1/1/1',
      isReady: true,
    }));

    const fields = [
      {
        type: "text",
        required: false,
        label: "Field 1",
        className: "form-control",
        name: "text-1648102772033-0",
        access: false,
        subtype: "text",
      },
      {
        type: "text",
        required: true,
        label: "Field 2",
        className: "form-control",
        name: "text-1648102772980-0",
        access: false,
        subtype: "text",
      },
    ]

    const jadwal = [
      {
        "id": 2,
        "tenaga_medis": {
          "account": {
            "id": 2,
            "full_name": "TM 2",
            "email": "tm2@klinik99.com",
            "date_joined": "2022-03-31T12:49:11.378628Z",
            "last_login": "2022-03-31T12:49:11.378628Z",
            "role": "tenaga_medis",
            "cabang": 1,
            "klinik": 1
          },
          "sip": "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
        },
        "start_time": "10:00:00",
        "end_time": "12:00:00",
        "quota": 5,
        "day": "mon"
      },
      {
        "id": 3,
        "tenaga_medis": {
          "account": {
            "id": 3,
            "full_name": "TM 3",
            "email": "tm3@klinik99.com",
            "date_joined": "2022-04-02T10:43:33.797983Z",
            "last_login": "2022-04-02T10:43:33.797983Z",
            "role": "tenaga_medis",
            "cabang": 1,
            "klinik": 1
          },
          "sip": "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
        },
        "start_time": "11:00:00",
        "end_time": "14:00:00",
        "quota": 5,
        "day": "mon"
      }
    ]

    const namaKlinik = "Klinik Example"

    render(
      <Provider store={store}>
        <RegistrationForm namaKlinik={namaKlinik} fields={fields} jadwal={jadwal} />
      </Provider>
    );
  });

  it('renders a heading', () => {

    const heading = screen.getAllByRole('heading', {
      name: /.*Pendaftaran Klinik.*/i,
    })[0]

    expect(heading).toBeInTheDocument()
  })

  it('renders mandatory fields', () => {
    const NIKField = screen.getByLabelText(/.*NIK.*/i);
    const doctorField = screen.getByLabelText(/.*Jadwal dokter.*/i);

    expect(NIKField).toBeInTheDocument();
    expect(doctorField).toBeInTheDocument();
  });

  it('renders data fields', () => {
    const firstField = screen.getByLabelText(/.*Field 2.*/i);
    const secondField = screen.getByLabelText(/.*Field 2.*/i);

    expect(firstField).toBeInTheDocument();
    expect(secondField).toBeInTheDocument();
  });

  it('renders submit button', () => {
    const buttonsubmit = screen.getAllByRole('button', {
      name: /Simpan/,
    })[0]
    expect(buttonsubmit).toBeInTheDocument()
  });
});
