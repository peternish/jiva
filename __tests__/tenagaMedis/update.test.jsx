import { fireEvent, render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

// components
import UpdateTenagaMedis from '@pages/klinik/[idKlinik]/[idCabang]/tenaga-medis/update/[id]';

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setTenagaMedis } from "@redux/modules/tenagaMedis";


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


  afterEach(() => {
    let assignMock = jest.fn();
    delete window.location;
    window.location = { assign: assignMock };
    assignMock.mockClear();
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


  it("should not show validation errors when no empty fields", async () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap");
    await act(async () => {
      await fireEvent.change(fullNameField, {target: {value: 'dr. Adi Abdullah, Sp.A.'}});
    });
    expect(fullNameField.value).toBe('dr. Adi Abdullah, Sp.A.');
    expect(screen.queryByText("Input ini wajib diisi")).toBe(null);
  });
});
