import { render, screen } from '@testing-library/react'
import CreateTenagaMedis from 'pages/tenaga-medis/create'
import '@testing-library/jest-dom'

describe('Create tenaga medis page main components', () => {
  it('should render', () => {
    render(<CreateTenagaMedis />)

    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })

  
  it('should have the page main heading', () => {
    render(<CreateTenagaMedis />)

    const heading = screen.getByRole('heading', {
      name: /Tambah Tenaga Medis/,
    })

    expect(heading).toBeInTheDocument()
  })


  it('should have data fields', () => {
    render(<CreateTenagaMedis />)

    const fields = screen.getAllByRole('textbox')

    fields.forEach((field) => {
      expect(field).toBeInTheDocument()
    })
  })


  it('should have the batal button', () => {
    render(<CreateTenagaMedis />)

    const button = screen.getByRole('button', {
      name: /Batal/,
    })

    expect(button).toBeInTheDocument()
  })

  
  it('should have the tambah button', () => {
    render(<CreateTenagaMedis />)

    const button = screen.getByRole('button', {
      name: /Tambah/,
    })

    expect(button).toBeInTheDocument()
  })
})
