import { render, screen } from '@testing-library/react'
import { Provider } from "react-redux"
import { store } from "@redux/store"
import Dashboard from '@pages/klinik/[idKlinik]/[idCabang]/pengaturan-pengguna/index'
import '@testing-library/jest-dom'

describe("Pengaturan Pengguna Main", () => {
  beforeEach(() => {
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

});
