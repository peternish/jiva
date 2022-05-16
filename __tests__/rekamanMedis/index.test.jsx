import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

// components
import DaftarRekamanMedis from '@pages/klinik/[idKlinik]/[idCabang]/rekaman-medis/[nik]/index';

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setPasien, setListRekamanMedis } from "@redux/modules/rekamanMedis";

describe('DaftarRekamanMedis', () => {
  beforeEach( async () => {
    await store.dispatch(setPasien(
      {
        "full_name": "Adi Suryadi",
      }
    ));
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      route: '/klinik/1/1/rekaman-medis/123', 
      query: { idKlinik: 1, idCabang: 1, nik: 123 },
      isReady: true, 
    }));
    render(
      <Provider store={store}>
        <DaftarRekamanMedis />
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
        name: /Daftar Rekaman Medis (\w| )+/,
      });
      expect(heading).toBeInTheDocument();
    });

    it('should have the rekaman medis list table', () => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });

    it('should have the tambah rekaman medis button', () => {
      const button = screen.getByRole('link', {
        name: /Tambah Rekaman Medis/,
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', expect.stringMatching(/\/klinik\/\d+\/\d+\/rekaman-medis\/\d+\/tambah-entri/));
    });
  });


  describe('RekamanMedisTable', () => {
    beforeEach( async () => {
      await store.dispatch(setListRekamanMedis(
        [
          {
            id: 1,
            time_created: "Senin, 1 Januari 1970",
            author: "dr. Budi",
          },
          {
            id: 2,
            time_created: "Selasa, 2 Januari 1970",
            author: "dr. Budi",
          },
          {
            id: 3,
            time_created: "Rabu, 3 Januari 1970",
            author: "dr. Budi",
          },
        ]
      ));
    });

    it('should have the appropriate table columns', () => {
      const tanggalColumn = screen.getByRole('columnheader', {
        name: /Tanggal/,
      });
      const dokterColumn = screen.getByRole('columnheader', {
        name: /Dokter/,
      });
      const rekamanMedisColumns = screen.getByRole('columnheader', {
        name: /Rekaman Medis/,
      });
      expect(tanggalColumn).toBeInTheDocument();
      expect(dokterColumn).toBeInTheDocument();
      expect(rekamanMedisColumns).toBeInTheDocument();
    });

    it('should have all "Lihat" as link pointing to detail page', () => {
      const lihatLinks = screen.getAllByRole('link', {
        name: /Lihat/,
      });
      expect(lihatLinks).toHaveLength(3);
      lihatLinks.forEach((lihatLink) => {
        expect(lihatLink).toBeInTheDocument();
        expect(lihatLink).toHaveAttribute('href', expect.stringMatching(/\/klinik\/\d+\/\d+\/rekaman-medis\/\d+\/detail\/\d+/));
      });
    });
  });


  describe('RekamanMedisTable empty', () => {
    beforeEach( async () => {
      await store.dispatch(setListRekamanMedis(
        [
          // no rekaman medis registered
        ]
      ));
    });

    it('should display no rekaman medis prompt', () => {
      const prompt = screen.getByText("Belum ada Rekaman Medis yang tersimpan");
      expect(prompt).toBeInTheDocument();
    });
  
    it('should not have any "Lihat" link', () => {
      const lihatLinks = screen.queryAllByRole('link', {
        name: /Lihat/,
      });
      expect(lihatLinks).toHaveLength(0);
    });
  });
});
