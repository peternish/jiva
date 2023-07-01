import { fireEvent, render, screen, act } from "@testing-library/react";
import Tambah from '@pages/klinik/[idKlinik]/[idCabang]/pengaturan-pengguna/tambah'
import { Provider } from "react-redux";
import { store } from "@redux/store";
import '@testing-library/jest-dom'
import * as nextRouter from 'next/router';

describe("Pengaturan Pengguna Tambah", () => {
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      route: '/klinik/1/1/pengaturan-pengguna/tambah', 
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true, 
    }));

    render(
      <Provider store={store}>
        <Tambah />
      </Provider>
    );
  });

  it('renders a heading', () => {

    const heading = screen.getAllByRole('heading', {
      name: /Tambah Staf/,
    })[0]

    expect(heading).toBeInTheDocument()
  })

  it('renders data fields', () => {
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");
    const fullNameField = screen.getByLabelText("Full Name");

    expect(emailField ).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(fullNameField).toBeInTheDocument();
  });

  it('renders the buttons and buttonlinks', () => {

    const buttonlinkback = screen.getAllByRole('link', {
      name: /Batal/,
    })[0]
    const buttonsubmit = screen.getAllByRole('button', {
      name: /Simpan/,
    })[0]

    expect(buttonlinkback).toBeInTheDocument()
    expect(buttonsubmit).toBeInTheDocument()
  })

  it("renders form validation errors", async () => {
    const button = screen.getAllByRole('button', {
      name: /Simpan/,
    })[0]

    await act(async () => {
      await fireEvent.click(button);
    });

    expect(await screen.getAllByText("Input ini wajib diisi")).toHaveLength(3);
  });
});
