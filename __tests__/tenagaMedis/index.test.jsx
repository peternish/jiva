import { fireEvent, render, screen, act } from "@testing-library/react";
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
    const sideColumns = screen.getAllByRole('columnheader', {
      name: /^$/,
    });
    
    expect(namaLengkapColumn).toBeInTheDocument();
    expect(emailColumn).toBeInTheDocument();
    expect(sideColumns).toHaveLength(2);
  });


  it('should have all "Lihat" as link pointing to detail page', () => {
    const lihatLinks = screen.getAllByRole('link', {
      name: /Lihat/,
    });

    expect(lihatLinks).toHaveLength(3);
    lihatLinks.forEach((lihatLink) => {
      expect(lihatLink).toBeInTheDocument();
      expect(lihatLink).toHaveAttribute('href', expect.stringMatching(/\/tenaga-medis\/detail\/\d+/));
    });
  });


  it('should have modify dropdown menu', () => {
    const menus = screen.getAllByTestId("modify-dropdown-menu");

    expect(menus).toHaveLength(3);
  });


  it("should show dropdown when kebab menu icon is pressed", async () => {
    const menus = screen.getAllByTestId("modify-dropdown-menu");
    const menu = menus[0];

    act(async () => {
      await fireEvent.click(menu);
    });

    expect(await screen.getByText("Ubah")).toBeInTheDocument();
    expect(await screen.getByText("Hapus")).toBeInTheDocument();
  });


  it("should close dropdown when a menu option is clicked", async () => {
    const menus = screen.getAllByTestId("modify-dropdown-menu");
    const menu = menus[0];

    await act(async () => {
      await fireEvent.click(menu);
      const ubah = await screen.getByText("Ubah");
      await fireEvent.click(ubah);

      await fireEvent.click(menu);
      const Hapus = await screen.getByText("Hapus");
      await fireEvent.click(Hapus);
    });

    // expect(await screen.getByText("Ubah")).not.toBeInTheDocument();
    // expect(await screen.getByText("Hapus")).not.toBeInTheDocument();
  });


  it("should close dropdown when button is pressed again", async () => {
    const menus = screen.getAllByTestId("modify-dropdown-menu");
    const menu = menus[0];

    await act(async () => {
      await fireEvent.click(menu);
      await fireEvent.click(menu);
    });

    // expect(await screen.getByText("Ubah")).not.toBeInTheDocument();
    // expect(await screen.getByText("Hapus")).not.toBeInTheDocument();
  });


  it('should have the tambah tenaga medis button', () => {
    const button = screen.getByRole('link', {
      name: /Tambah Tenaga Medis/,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/tenaga-medis/create');
  });
});
