import { fireEvent, render, screen, act } from "@testing-library/react";
import UpdateTenagaMedis from '@pages/klinik/[idKlinik]/[idCabang]/tenaga-medis/update/[id]';
import { Provider } from "react-redux";
import { store } from "@redux/store";
import '@testing-library/jest-dom';
import { setTenagaMedis } from "@redux/modules/tenagaMedis";
import * as nextRouter from 'next/router';

describe('UpdateTenagaMedis', () => {
  beforeEach( async () => {
    await store.dispatch(setTenagaMedis(
      {
        account: {
          email: "budi@email.com",
          full_name: "Budi Doremi",
          id: 1,
        }
      }
    ));

    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      route: '/klinik/1/1/tenaga-medis/update/1', 
      query: { idKlinik: 1, idCabang: 1, id: 1 },
      isReady: true, 
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

    const button = screen.getByRole("button", { 
      name: "Simpan" 
    });

    await act(async () => {
      await fireEvent.change(fullNameField, {target: {value: ''}});
      await fireEvent.click(button);
    });

    expect(await screen.getAllByText("Input ini wajib diisi")).toHaveLength(1);
  });


  it("should submit when 'Simpan' is pressed", async () => {
    // const fullNameField = screen.getByLabelText("Nama Lengkap");

    // const button = screen.getByRole("button", { 
    //   name: "Simpan" 
    // });

    // await act(async () => {
    //   await fireEvent.change(fullNameField, {target: {value: 'dr. Budiman Budi, Sp.A.'}});
    //   await fireEvent.click(button);
    // });

    // expect(await screen.getByLabelText("Nama Lengkap")).toHaveValue('dr. Budiman Budi, Sp.A.');
    // expect(await screen.getByLabelText("Email")).toHaveValue('budiman.budi@email.com');
  });
});
