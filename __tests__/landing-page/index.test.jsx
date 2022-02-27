import { render, screen } from '@testing-library/react'
import DashboardTenagaMedis from 'pages/tenaga-medis/index'
import '@testing-library/jest-dom'

describe('Landing Page', () => {
    it('renders the page', () => {
        render(<LandingPage/>)

        const main = screen.getByRole('main')

        expect(main).toBeInTheDocument()
    })
})