import { fireEvent, render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

// components
import CreateTenagaMedis from '@pages/klinik/[idKlinik]/[idCabang]/tenaga-medis/create';

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";


describe("CreateTenagaMedis", () => {
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      route: '/klinik/1/1/tenaga-medis/create', 
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true, 
    }));
    render(
      <Provider store={store}>
        <CreateTenagaMedis />
      </Provider>
    );
  });

  afterEach(() => {
    let assignMock = jest.fn();
    delete window.location;
    window.location = { assign: assignMock };
    assignMock.mockClear();
  });

  it("should submit", async () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap");
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");
    const fileInput = screen.getByTestId("input");
    const submitButton = screen.getByRole('button', {
      name: /Tambah/,
    });
    const file = new File([new Blob()], "fileName.pdf", { type: "application/pdf" });
    await act(async () => {
      await fireEvent.change(fullNameField, {target: {value: 'dr. Budi Budiman, Sp.A.'}});
      await fireEvent.change(emailField, {target: {value: 'budi.budiman@email.com'}});
      await fireEvent.change(passwordField, {target: {value: 'password'}});
      await fireEvent.change(fileInput, {
        target: { files: [file] },
      });
      await fireEvent.click(submitButton);
    });
  });
});
