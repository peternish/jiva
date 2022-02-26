import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from 'components/Navbar'

describe('Navbar', () => {
  it('renders a navbar', () => {
    render(<Navbar />)

    const nav = screen.getByRole('navigation')

    expect(nav).toBeInTheDocument()
  })
})