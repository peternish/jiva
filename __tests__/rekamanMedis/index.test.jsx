import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

// components
import TambahEntri from "@pages/klinik/[idKlinik]/[idCabang]/rekaman-medis/[nik]/tambah-entri";
import DaftarRekamanMedis from '@pages/klinik/[idKlinik]/[idCabang]/rekaman-medis/[nik]/index';

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setSchemas } from "@redux/modules/dynamicForm"
import { setPasien, setListRekamanMedis } from "@redux/modules/rekamanMedis";

// utils
import { mockRouter } from "@utils/testUtils/index"
import { SAMPLE_SCHEMA, SAMPLE_PASIEN } from "@utils/testUtils/constants"

const PATH = "/klinik/1/1/rekaman-medis/1/tambah-entri"

describe("<TambahEntri/> with proper state", () => {
  beforeEach(async () => {
    mockRouter(PATH)

    await store.dispatch(setSchemas(SAMPLE_SCHEMA))
    await store.dispatch(setPasien(SAMPLE_PASIEN))

    render(
      <Provider store={store}>
        <TambahEntri />
      </Provider>
    );
  });

  it("renders title correctly", () => {
    expect(screen.getByText("Tambah Entri Rekaman Medis")).toBeInTheDocument();
  });

  it("renders subheaders correctly", () => {
    expect(screen.getByText("Informasi Pasien")).toBeInTheDocument();
    expect(screen.getByText("Rekam Medis")).toBeInTheDocument();
  })

  it("renders patient identity correctly", () => {
    expect(screen.getByLabelText("Nama")).toBeInTheDocument();
    expect(screen.getByLabelText("NIK")).toBeInTheDocument();
  })

  it("renders dynamic form correctly", () => {
    expect(screen.getByLabelText("Field 1*")).toBeInTheDocument();
  })

  it('renders buttons', () => {
    expect(screen.getByText("Batal")).toBeInTheDocument()
    expect(screen.getByText("Simpan")).toBeInTheDocument()
  });

  it("does not render dynamic form", async () => {
    await store.dispatch(setSchemas([]))

    render(
      <Provider store={store}>
        <TambahEntri />
      </Provider>
    );

    expect(screen.queryByLabelText("Field 1")).toBeNull()
  })
});

describe("<TambahEntri/> without proper state", () => {
  beforeEach(async () => {
    mockRouter(PATH)

    render(
      <Provider store={store}>
        <TambahEntri />
      </Provider>
    );
  });

  it("does not render title correctly", () => {
    expect(screen.queryByText("Tambah Entri Rekaman Medis")).toBeNull()
  });

  it("does not render subheaders correctly", () => {
    expect(screen.queryByText("Informasi Pasien")).toBeNull()
    expect(screen.queryByText("Rekam Medis")).toBeNull()
  })

  it("does not render patient identity correctly", () => {
    expect(screen.queryByLabelText("Nama")).toBeNull()
    expect(screen.queryByLabelText("NIK")).toBeNull()
  })
});


describe('DaftarRekamanMedis', () => {
  beforeEach(async () => {
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
    beforeEach(async () => {
      await store.dispatch(setListRekamanMedis(
        [
          {
            id: 1,
            time_created: "1999-12-16",
            author: {
              account: {
                "full_name": "dr. Budi",
              }
            },
          },
          {
            id: 2,
            time_created: "2001-05-16",
            author: {
              account: {
                "full_name": "dr. Budi",
              }
            },
          },
          {
            id: 3,
            time_created: "2022-05-19",
            author: {
              account: {
                "full_name": "dr. Budi",
              }
            },
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
    beforeEach(async () => {
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
