import { render, screen } from '@testing-library/react'
import UpdateTenagaMedis from 'pages/tenaga-medis/update'
import '@testing-library/jest-dom'

describe('Update tenaga medis page main components', () => {
  it('should render', () => {
    render(<UpdateTenagaMedis />)

    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })
})
