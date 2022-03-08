import { render, screen } from '@testing-library/react';
import UpdateTenagaMedis from '@pages/tenaga-medis/update';
import { Provider } from "react-redux";
import { store } from "@redux/store";
import '@testing-library/jest-dom';

describe('UpdateTenagaMedis', () => {
  beforeEach(() => {
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
