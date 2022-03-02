import { render, screen } from '@testing-library/react'
import DetailTenagaMedis from 'pages/tenaga-medis/detail'
import '@testing-library/jest-dom'

describe('Detail tenaga medis page main components', () => {
  it('should render', () => {
    render(<DetailTenagaMedis />)

    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })


  it('should have the page main heading', () => {
    render(<DetailTenagaMedis />)

    const heading = screen.getByRole('heading', {
      name: /Detil Informasi Tenaga Medis/,
    })

    expect(heading).toBeInTheDocument()
  })


  it('should have data fields', () => {
    render(<DetailTenagaMedis />)

    const fields = screen.getAllByRole('textbox')

    fields.forEach((field) => {
      expect(field).toBeInTheDocument()
    })
  })


  it('should have the hapus button', () => {
    render(<DetailTenagaMedis />)

    const button = screen.getByRole('button', {
      name: /Hapus/,
    })

    expect(button).toBeInTheDocument()
  })

  
  it('should have the ubah button', () => {
    render(<DetailTenagaMedis />)

    const button = screen.getByRole('button', {
      name: /Ubah/,
    })

    expect(button).toBeInTheDocument()
  })
})
