import { render, screen } from '@testing-library/react';
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
    const fields = screen.getAllByRole('textbox');

    fields.forEach((field) => {
      expect(field).toBeInTheDocument();
    });
  });


  it('should have the batal button', () => {
    const button = screen.getByRole('button', {
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
});
