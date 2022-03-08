import { render, screen } from '@testing-library/react';
import DetailTenagaMedis from '@pages/tenaga-medis/detail';
import { Provider } from "react-redux";
import { store } from "@redux/store";
import '@testing-library/jest-dom';

describe('DetailTenagaMedis', () => {
  beforeEach(() => {
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
    const button = screen.getByRole('button', {
      name: /Ubah/,
    });

    expect(button).toBeInTheDocument();
  });
});
