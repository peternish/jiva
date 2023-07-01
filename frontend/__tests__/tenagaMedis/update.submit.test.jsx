import { fireEvent, render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

// components
import UpdateTenagaMedis from '@pages/klinik/[idKlinik]/[idCabang]/tenaga-medis/update/[id]';

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setTenagaMedis } from "@redux/modules/tenagaMedis";


describe("UpdateTenagaMedis submit", () => {
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

  it("should submit", async () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap");
    const submitButton = screen.getByRole('button', {
      name: /Simpan/,
    });
    await act(async () => {
      await fireEvent.change(fullNameField, {target: {value: 'dr. Adi Abdullah, Sp.A.'}});
      await fireEvent.click(submitButton);
    });
  });
});
