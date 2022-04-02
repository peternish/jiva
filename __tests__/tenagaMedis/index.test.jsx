import { fireEvent, render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

// components
import DashboardTenagaMedis from '@pages/klinik/[idKlinik]/[idCabang]/tenaga-medis/index';

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setTenagaMedisList } from "@redux/modules/tenagaMedis";


describe('DashboardTenagaMedis', () => {
  beforeEach( async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      route: '/klinik/1/1/tenaga-medis', 
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true, 
    }));
    render(
      <Provider store={store}>
        <DashboardTenagaMedis />
      </Provider>
    );
  });


  afterEach(() => {
    let assignMock = jest.fn();
    delete window.location;
    window.location = { assign: assignMock };
    assignMock.mockClear();
  });


  describe('Main components', () => {
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

    it('should have the tambah tenaga medis button', () => {
      const button = screen.getByRole('link', {
        name: /Tambah Tenaga Medis/,
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', expect.stringMatching(/\/klinik\/\d+\/\d+\/tenaga-medis\/create/));
    });
  });


  describe('TenagaMedisTable', () => {
    beforeEach( async () => {
      await store.dispatch(setTenagaMedisList(
        [
          {
            account: {
              email: "budi@email.com",
              full_name: "Budi Doremi",
              id: 1,
            }
          },
          {
            account: {
              email: "andi@email.com",
              full_name: "Andi Doremi",
              id: 2,
            }
          },
          {
            account: {
              email: "carli@email.com",
              full_name: "Carli Doremi",
              id: 3,
            }
          },
        ]
      ));
    });

    it('should have the appropriate table columns', () => {
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
        expect(lihatLink).toHaveAttribute('href', expect.stringMatching(/\/klinik\/\d+\/\d+\/tenaga-medis\/detail\/\d+/));
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
  
    it("should close the dropdown when the dropdown closed", async () => {
      const menus = screen.getAllByTestId("modify-dropdown-menu");
      const menu = menus[0];
      await act(async () => {
        await fireEvent.click(menu);
        await fireEvent.click(await screen.getByRole('presentation').firstChild);
      });
    });
  
    it("should be able to click the 'Ubah' option", async () => {
      const menus = screen.getAllByTestId("modify-dropdown-menu");
      const menu = menus[0];
      await act(async () => {
        await fireEvent.click(menu);
        const ubah = await screen.getByText("Ubah");
        await fireEvent.click(ubah);
      });
    });
    
    it('should show deletion confirmation modal when "Hapus" is pressed', async () => {
      const menus = screen.getAllByTestId("modify-dropdown-menu");
      const menu = menus[0];
      await act(async () => {
        await fireEvent.click(menu);
        const hapus = await screen.getByText("Hapus");
        await fireEvent.click(hapus);
      });
      expect(await screen.getByText("Konfirmasi Hapus Tenaga Medis")).toBeInTheDocument();
    });
  
    it('should close the modal when "Batal" is clicked', async () => {
      const menus = screen.getAllByTestId("modify-dropdown-menu");
      const menu = menus[0];
      await act(async () => {
        await fireEvent.click(menu);
        const hapus = await screen.getByText("Hapus");
        await fireEvent.click(hapus);
        const modalHeading = await screen.getByText("Konfirmasi Hapus Tenaga Medis");
        expect(modalHeading).toBeInTheDocument();
        const batalButton = await screen.getByRole('button', {
          name: /Batal/,
        });
        expect(batalButton).toBeInTheDocument();
        await fireEvent.click(batalButton);
      });
    });
  
    it('should delete the tenaga medis when "Hapus" is selected', async () => {
      const menus = screen.getAllByTestId("modify-dropdown-menu");
      const menu = menus[0];
      await act(async () => {
        await fireEvent.click(menu);
        const Hapus = await screen.getByText("Hapus");
        await fireEvent.click(Hapus);
        const hapusConfirm = await screen.getByRole("button", { name: "Hapus" });
        await fireEvent.click(hapusConfirm);
      });
    });
  });


  describe('TenagaMedisTable empty', () => {
    beforeEach( async () => {
      await store.dispatch(setTenagaMedisList(
        [
          // no tenaga medis registered
        ]
      ));
    });

    it('should display no tenaga medis prompt', () => {
      const prompt = screen.getByText("Belum ada Tenaga Medis yang terdaftar");
      expect(prompt).toBeInTheDocument();
    });
  
    it('should not have any "Lihat" link', () => {
      const lihatLinks = screen.queryAllByRole('link', {
        name: /Lihat/,
      });
      expect(lihatLinks).toHaveLength(0);
    });
  
    it('should not have modify dropdown menu', () => {
      const menus = screen.queryAllByTestId("modify-dropdown-menu");
      expect(menus).toHaveLength(0);
    });
  });
});
