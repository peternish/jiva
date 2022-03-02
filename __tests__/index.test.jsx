import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'

describe('Navbar', () => {
  it('renders a navbar', () => {
    render(<Navbar/>)

    const nav = screen.getByRole('navigation')

    expect(nav).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar/>)

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(3)
  })
})

describe('Sidebar', () => {
  it('renders a sidebar', () => {
    render(<Sidebar/>)

    const sidebar = screen.getByTestId('sidebar')

    expect(sidebar).toBeInTheDocument()
  })
})