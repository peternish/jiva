import { fireEvent, render, screen, act, waitFor } from '@testing-library/react'
import { Provider } from "react-redux"
import { store } from "@redux/store"
import Dashboard from '@pages/klinik/[idKlinik]/[idCabang]/pengaturan-pengguna/index'
import '@testing-library/jest-dom'
import { setPenggunaTable } from "@redux/modules/pengaturanPengguna";
import * as nextRouter from 'next/router';

describe("Pengaturan Pengguna Main", () => {
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

  it('renders a button with link', () => {

    const button = screen.getByRole('button', {
      name: /Tambah Staf/,
    })

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href');
  })

  it('should have modify dropdown menu', () => {
    const menus = screen.getAllByTestId("modify-dropdown-menu");

    const expectedLength = store.getState().pengaturanPengguna.penggunaTable.length;

    expect(menus).toHaveLength(expectedLength);
  });


  it("should show dropdown when kebab menu icon is pressed", async () => {
    const menus = screen.getAllByTestId("modify-dropdown-menu");
    const menu = menus[0];

    /*kalau ditest klo pake `await act(async () => {` malah error gk tau kenapa 
    - router.prefetch is not a function
    - TestingLibraryElementError: Unable to find an element with the text: Konfirmasi Hapus Staf.
    */
    act(async () => {
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
