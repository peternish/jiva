import { fireEvent, render, screen, act } from '@testing-library/react'
import { Provider } from "react-redux"
import { store } from "@redux/store"
import Dashboard from '@pages/klinik/[idKlinik]/[idCabang]/pengaturan-pengguna/index'
import '@testing-library/jest-dom'
import { setPenggunaTable } from "@redux/modules/pengaturanPengguna";
import * as nextRouter from 'next/router';

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: { idKlinik: 1, idCabang: 1 },
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));

describe('Pengaturan Pengguna Main (empty)', () => {
  beforeEach( async () => {
    await store.dispatch(setPenggunaTable(
      [ /* empty */ ]
    ));

    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      route: '/klinik/1/1/pengaturan-pengguna', 
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true, 
    }));

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  });

  
  afterEach(() => {
    let assignMock = jest.fn();
    delete window.location;
    window.location = { assign: assignMock };
    assignMock.mockClear();
  });

  it('renders a heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Pengaturan Staf/,
    });

    expect(heading).toBeInTheDocument();
  });


  it('renders a table', () => {
    const table = screen.getByRole('table')

    expect(table).toBeInTheDocument()
  })


  it('should have the appropriate table columns', () => {
    const namaLengkapColumn = screen.getByRole('columnheader', {
      name: /Nama/,
    });
    const emailColumn = screen.getByRole('columnheader', {
      name: /Email/,
    });
    const sideColumns = screen.getAllByRole('columnheader', {
      name: /^$/,
    });
    
    expect(namaLengkapColumn).toBeInTheDocument();
    expect(emailColumn).toBeInTheDocument();
    expect(sideColumns).toHaveLength(1);
  });


  it('renders no staf prompt', () => {
    const prompt = screen.getByText("Belum ada Staf yang terdaftar");

    expect(prompt).toBeInTheDocument();
  });


  it('no "Lihat" rendered', () => {
    const lihatLinks = screen.queryAllByRole('link', {
      name: /Lihat/,
    });

    expect(lihatLinks).toHaveLength(0);
  });


  it('no dropdown menu rendered', () => {
    const menus = screen.queryAllByTestId("modify-dropdown-menu");

    expect(menus).toHaveLength(0);
  });


  it('renders tambah button', () => {

    const button = screen.getByRole('button', {
      name: /Tambah Staf/,
    })

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href');
  })
});

describe("Pengaturan Pengguna Main (exist)", () => {
  beforeEach( async () => {
    await store.dispatch(setPenggunaTable(
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

    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      route: '/klinik/1/1/pengaturan-pengguna', 
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true, 
    }));

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  });

  it('renders a heading', () => {

    const heading = screen.getByRole('heading', {
      name: /Pengaturan Staf/,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders a table', () => {

    const table = screen.getByRole('table')

    expect(table).toBeInTheDocument()
  })

  it('renders tambah button', () => {

    const button = screen.getByRole('button', {
      name: /Tambah Staf/,
    })

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href');
  })

  it('render modify dropdown menu', () => {
    const menus = screen.getAllByTestId("modify-dropdown-menu");

    const expectedLength = store.getState().pengaturanPengguna.penggunaTable.length;

    expect(menus).toHaveLength(expectedLength);
  });


  it("should show dropdown when kebab menu icon is pressed", async () => {
    const menus = screen.getAllByTestId("modify-dropdown-menu");
    const menu = menus[0];

    await act(async () => {
      await fireEvent.click(menu);
    });

    expect(await screen.getByText("Hapus")).toBeInTheDocument();
  });

  it('should show deletion confirmation modal when "Hapus" is pressed', async () => {
    const menus = screen.getAllByTestId("modify-dropdown-menu");
    const menu = menus[0];
    
    await act(async () => {
      await fireEvent.click(menu);
      const Hapus = await screen.getByText("Hapus");
      await fireEvent.click(Hapus);
    });

    expect(await screen.getByText("Konfirmasi Hapus Staf")).toBeInTheDocument();
  });
});
