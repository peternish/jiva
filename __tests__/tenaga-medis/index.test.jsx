import { render, screen } from '@testing-library/react';
import DashboardTenagaMedis from '@pages/tenaga-medis/index';
import { Provider } from "react-redux";
import { store } from "@redux/store";
import '@testing-library/jest-dom';

describe('DashboardTenagaMedis', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <DashboardTenagaMedis />
      </Provider>
    );
  });


  it('should render', () => {
    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
  });


  it('should have the page main heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Daftar Tenaga Medis/,
    });

    expect(heading).toBeInTheDocument();
  });


  it('should have the tenaga medis list table', () => {
    const table = screen.getByRole('table');
    
    expect(table).toBeInTheDocument();
  });


  it('should the appropriate table columns', () => {
    const namaColumn = screen.getByRole('columnheader', {
      name: /Nama/,
    });
    const ttlColumn = screen.getByRole('columnheader', {
      name: /Tempat\/Tanggal Lahir/,
    });
    const nikColumn = screen.getByRole('columnheader', {
      name: /NIK/,
    });
    const lihatColumn = screen.getByRole('columnheader', {
      name: /^$/,
    });
    
    expect(namaColumn).toBeInTheDocument();
    expect(ttlColumn).toBeInTheDocument();
    expect(nikColumn).toBeInTheDocument();
    expect(lihatColumn).toBeInTheDocument();
  });


  it('should have all "Lihat" as link pointing to detail page', () => {
    const lihatLinks = screen.getAllByRole('link', {
      name: /Lihat/,
    });

    lihatLinks.forEach((lihatLink) => {
      expect(lihatLink).toBeInTheDocument();
      expect(lihatLink).toHaveAttribute('href', '/tenaga-medis/detail');
    });
  });


  it('should have the tambah tenaga medis button', () => {
    const button = screen.getByRole('button', {
      name: /Tambah Tenaga Medis/,
    });

    expect(button).toBeInTheDocument();
  });
});
