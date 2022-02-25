import { render, screen } from '@testing-library/react'
import DashboardTenagaMedis from 'pages/tenaga-medis/index'
import '@testing-library/jest-dom'

describe('Dashboard Tenaga Medis', () => {
  it('should render', () => {
    render(<DashboardTenagaMedis />)

    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })
})
