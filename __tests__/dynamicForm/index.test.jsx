import { Provider } from "react-redux";
import * as nextRouter from 'next/router';
import Tambah from '@pages/klinik/[idKlinik]/[idCabang]/pengaturan-pengguna/tambah'
import { fireEvent, render, screen, act } from "@testing-library/react";
import { store } from "@redux/store";
import jivaAPI from "@api/index"
import '@testing-library/jest-dom'

describe("Dynamic Form", () => {
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({
      route: '/form/1/1/1',
      isReady: true,
    }));

    jivaAPI.dynamicForm = jest.fn();
    jivaAPI.dynamicForm.mockImplementation(({ cabang_id, form_id }) => ({
      data: {
        cabang_id: 1,
        klinik: {
          name: "Klinik Example"
        },
        formtype: "test",
        fields: [
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
      }
    }))

    render(
      <Provider store={store}>
        <Tambah />
      </Provider>
    );
  });

  it('renders a heading', () => {

    const heading = screen.getAllByRole('heading', {
      name: /Pendaftaran Klinik Example/,
    })[0]

    expect(heading).toBeInTheDocument()
  })

  it('renders mandatory fields', () => {
    const NIKField = screen.getByLabelText("NIK");
    const doctorField = screen.getByLabelText("Jadwal dokter");

    expect(NIKField).toBeInTheDocument();
    expect(doctorField).toBeInTheDocument();
  });

  it('renders data fields', () => {
    const firstField = screen.getByLabelText("Field 1");
    const secondField = screen.getByLabelText("Field 2");

    expect(firstField).toBeInTheDocument();
    expect(secondField).toBeInTheDocument();
  });

  it('renders submit button', () => {
    const buttonsubmit = screen.getAllByRole('button', {
      name: /Simpan/,
    })[0]
    expect(buttonsubmit).toBeInTheDocument()
  })

  it("renders form validation errors", async () => {
    const button = screen.getAllByRole('button', {
      name: /Simpan/,
    })[0]

    await act(async () => {
      await fireEvent.click(button);
    });

    expect(await screen.getAllByText(/is required/)).toHaveLength(3);
  });

});
