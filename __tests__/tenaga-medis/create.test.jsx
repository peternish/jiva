import { render, screen } from '@testing-library/react'
import CreateTenagaMedis from 'pages/tenaga-medis/create'
import '@testing-library/jest-dom'

describe('Create tenaga medis page main components', () => {
  it('should render', () => {
    render(<CreateTenagaMedis />)

    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })
})
