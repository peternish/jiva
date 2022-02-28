import { render, screen } from '@testing-library/react'
import Tambah from 'pages/pengaturan-pengguna/tambah'
import '@testing-library/jest-dom'

describe("Pengaturan Pengguna Tambah", () => {
  it('renders a heading', () => {
    render(<Tambah/>)

    const heading = screen.getByRole('heading', {
      name: /Tambah Pengguna/,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders a form', () => {
    render(<Tambah/>)

    const form = screen.getByRole('form')

    expect(form).toBeInTheDocument()
  })

  it('renders a button', () => {
    render(<Tambah/>)

    const buttonback = screen.getByRole('button', {
      name: /Batal/,
    })
    const buttonsubmit = screen.getByRole('button', {
      name: /Simpan/,
    })

    expect(buttonback).toBeInTheDocument()
    expect(buttonsubmit).toBeInTheDocument()
  })
});
