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

    const namaKlinik = "Klinik Example"

    render(
      <Provider store={store}>
        <RegistrationForm namaKlinik={namaKlinik} fields={fields} />
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
