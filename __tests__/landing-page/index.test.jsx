import { render, screen } from '@testing-library/react'
import Landing from 'pages/landing-page'
import '@testing-library/jest-dom'

describe('Landing Page', () => {
    it('should render', () => {
        render(<Landing/>)

        const main = screen.getByRole('main')

        expect(main).toBeInTheDocument()
    })
})