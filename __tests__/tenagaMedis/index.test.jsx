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
    const namaLengkapColumn = screen.getByRole('columnheader', {
      name: /Nama Lengkap/,
    });
    const emailColumn = screen.getByRole('columnheader', {
      name: /Email/,
    });
    const lihatColumn = screen.getByRole('columnheader', {
      name: /^$/,
    });
    
    expect(namaLengkapColumn).toBeInTheDocument();
    expect(emailColumn).toBeInTheDocument();
    expect(lihatColumn).toBeInTheDocument();
  });


  it('should have all "Lihat" as link pointing to detail page', () => {
    const lihatLinks = screen.getAllByRole('link', {
      name: /Lihat/,
    });

    lihatLinks.forEach((lihatLink) => {
      expect(lihatLink).toBeInTheDocument();
      expect(lihatLink).toHaveAttribute('href', expect.stringMatching(/\/tenaga-medis\/detail\/\d+/));
    });
  });


  it('should have the tambah tenaga medis button', () => {
    const button = screen.getByRole('link', {
      name: /Tambah Tenaga Medis/,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/tenaga-medis/create');
  });
});
