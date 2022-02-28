import { render, screen } from '@testing-library/react'
import Dashboard from 'pages/pengaturan-pengguna/index'
import '@testing-library/jest-dom'

describe("Pengaturan Pengguna Main", () => {
  it('renders a heading', () => {
    render(<Dashboard/>)

    const heading = screen.getByRole('heading', {
      name: /Pengaturan Pengguna/,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders a table', () => {
    render(<Dashboard/>)

    const table = screen.getByRole('table')

    expect(table).toBeInTheDocument()
  })

  it('renders a button with link', () => {
    render(<Dashboard/>)

    const button = screen.getByRole('button', {
      name: /Tambah Pengguna/,
    })

    expect(button).toBeInTheDocument()
  })

  it('renders a link to tambah', () => {
    render(<Dashboard/>)

    const linktambah = screen.getByRole('link', {
      name: /Tambah Pengguna/,
    })

    expect(linktambah).toBeInTheDocument()
  })
});
