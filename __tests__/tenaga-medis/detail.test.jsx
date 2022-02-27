import { render, screen } from '@testing-library/react'
import DetailTenagaMedis from 'pages/tenaga-medis/detail'
import '@testing-library/jest-dom'

describe('Detail tenaga medis page main components', () => {
  it('should render', () => {
    render(<DetailTenagaMedis />)

    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })
})
