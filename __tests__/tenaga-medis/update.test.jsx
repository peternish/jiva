import { render, screen } from '@testing-library/react'
import UpdateTenagaMedis from 'pages/tenaga-medis/update'
import '@testing-library/jest-dom'

describe('Update tenaga medis page main components', () => {
  it('should render', () => {
    render(<UpdateTenagaMedis />)

    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })


  it('should have the page main heading', () => {
    render(<DetailTenagaMedis />)

    const heading = screen.getByRole('heading', {
      name: /Update Tenaga Medis/,
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


  it('should have the batal button', () => {
    render(<DetailTenagaMedis />)

    const button = screen.getByRole('button', {
      name: /Batal/,
    })

    expect(button).toBeInTheDocument()
  })

  
  it('should have the simpan button', () => {
    render(<DetailTenagaMedis />)

    const button = screen.getByRole('button', {
      name: /Simpan/,
    })

    expect(button).toBeInTheDocument()
  })
})
