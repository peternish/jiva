import { fireEvent, render, screen, act } from "@testing-library/react";
import UpdateTenagaMedis from '@pages/tenaga-medis/update/[id]';
import { Provider } from "react-redux";
import { store } from "@redux/store";
import '@testing-library/jest-dom';
import { setTenagaMedis } from "@redux/modules/tenagaMedis";

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('UpdateTenagaMedis', () => {
  beforeEach( async () => {
    await store.dispatch(setTenagaMedis(
      [
        {
          id: 1,
          name: "Anthony",
          tempatTanggalLahir: "Berlin, 12 Maret 1976",
          nik: "1234567890",
        },
      ]
    ));

    useRouter.mockImplementationOnce(() => ({
      query: { id: 1 },
    }));

    render(
      <Provider store={store}>
        <UpdateTenagaMedis />
      </Provider>
    );
  });


  it('should render', () => {
    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
  });


  it('should have the page main heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Update Tenaga Medis/,
    });

    expect(heading).toBeInTheDocument();
  });


  it('should have data fields', () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap");
    const emailField = screen.getByLabelText("Email");

    expect(fullNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
  });


  it('should have the batal button', () => {
    const button = screen.getByRole('link', {
      name: /Batal/,
    });

    expect(button).toBeInTheDocument();
  });

  
  it('should have the simpan button', () => {
    const button = screen.getByRole('button', {
      name: /Simpan/,
    });

    expect(button).toBeInTheDocument();
  });


  it("should show form validation errors", async () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap");
    const emailField = screen.getByLabelText("Email");

    const button = screen.getByRole("button", { 
      name: "Simpan" 
    });

    await act(async () => {
      await fireEvent.change(fullNameField, {target: {value: ''}});
      await fireEvent.change(emailField, {target: {value: ''}});

      await fireEvent.click(button);
    });

    expect(await screen.getAllByText("Input ini wajib diisi")).toHaveLength(2);
  });


  it("should submit when 'Simpan' is pressed", async () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap");
    const emailField = screen.getByLabelText("Email");

    const button = screen.getByRole("button", { 
      name: "Simpan" 
    });

    await act(async () => {
      await fireEvent.change(fullNameField, {target: {value: 'dr. Budiman Budi, Sp.A.'}});
      await fireEvent.change(emailField, {target: {value: 'budiman.budi@email.com'}});

      await fireEvent.click(button);
    });

    expect(await screen.getByLabelText("Nama Lengkap")).toHaveValue('dr. Budiman Budi, Sp.A.');
    expect(await screen.getByLabelText("Email")).toHaveValue('budiman.budi@email.com');
  });
});
