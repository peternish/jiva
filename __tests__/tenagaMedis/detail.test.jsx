import { render, screen } from '@testing-library/react';
import DetailTenagaMedis from '@pages/klinik/[idKlinik]/[idCabang]/tenaga-medis/detail/[id]';
import { Provider } from "react-redux";
import { store } from "@redux/store";
import '@testing-library/jest-dom';
import { setTenagaMedis } from "@redux/modules/tenagaMedis";
import * as nextRouter from 'next/router';

describe('DetailTenagaMedis', () => {
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
      route: '/klinik/1/1/tenaga-medis/detail/1', 
      query: { idKlinik: 1, idCabang: 1, id: 1 },
      isReady: true, 
    }));

    render(
      <Provider store={store}>
        <DetailTenagaMedis />
      </Provider>
    );
  });
  

  it('should render', () => {
    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
  });


  it('should have the page main heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Detil Informasi Tenaga Medis/,
    });

    expect(heading).toBeInTheDocument();
  });


  it('should have data fields', () => {
    const fields = screen.getAllByRole('textbox');

    fields.forEach((field) => {
      expect(field).toBeInTheDocument();
    });
  });


  it('should have the hapus button', () => {
    const button = screen.getByRole('button', {
      name: /Hapus/,
    });

    expect(button).toBeInTheDocument();
  });

  
  it('should have the ubah button', () => {
    const button = screen.getByRole('link', {
      name: /Ubah/,
    });

    expect(button).toBeInTheDocument();
  });
});
