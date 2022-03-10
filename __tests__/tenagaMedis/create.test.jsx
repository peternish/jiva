import { fireEvent, render, screen, act } from "@testing-library/react";
import CreateTenagaMedis from '@pages/tenaga-medis/create';
import { Provider } from "react-redux";
import { store } from "@redux/store";
import '@testing-library/jest-dom';

describe('CreateTenagaMedis', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CreateTenagaMedis />
      </Provider>
    );
  });
  

  it('should render', () => {
    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
  });

  
  it('should have the page main heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Tambah Tenaga Medis/,
    });

    expect(heading).toBeInTheDocument();
  });


  it('should have data fields', () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap");
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");

    expect(fullNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });


  it('should have the batal button', () => {
    const button = screen.getByRole('button', {
      name: /Batal/,
    });

    expect(button).toBeInTheDocument();
  });

  
  it('should have the tambah button', () => {
    const button = screen.getByRole('button', {
      name: /Tambah/,
    });

    expect(button).toBeInTheDocument();
  });


  it("should show form validation errors", async () => {
    const button = screen.getByRole("button", { 
      name: "Tambah" 
    });

    await act(async () => {
      await fireEvent.click(button);
    });

    expect(await screen.getAllByText("Input ini wajib diisi")).toHaveLength(3);
  });


  it("should submit when 'Tambah' is pressed", async () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap");
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");

    const button = screen.getByRole("button", { 
      name: "Tambah" 
    });

    await act(async () => {
      await fireEvent.change(fullNameField, {target: {value: 'dr. Budi Budiman, Sp.A.'}});
      await fireEvent.change(emailField, {target: {value: 'budi.budiman@email.com'}});
      await fireEvent.change(passwordField, {target: {value: 'password'}});

      await fireEvent.click(button);
    });

    expect(await screen.getByLabelText("Nama Lengkap")).toHaveValue('dr. Budi Budiman, Sp.A.');
    expect(await screen.getByLabelText("Email")).toHaveValue('budi.budiman@email.com');
    expect(await screen.getByLabelText("Password")).toHaveValue('password');
  });
});
