import { render, screen } from '@testing-library/react';
import DetailTenagaMedis from '@pages/klinik/[idKlinik]/[idCabang]/tenaga-medis/detail/[id]';
import { Provider } from "react-redux";
import { store } from "@redux/store";
import '@testing-library/jest-dom';
import { setTenagaMedis } from "@redux/modules/tenagaMedis";

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('DetailTenagaMedis', () => {
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
