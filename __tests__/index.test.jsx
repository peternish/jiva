import { render, screen, fireEvent } from '@testing-library/react'
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

  it('toggles the sidebar when the arrow button is clicked', () => {
    render(<Sidebar/>)

    const rightArrow = screen.getByTestId('ChevronRightIcon')
    expect(rightArrow).toBeInTheDocument()
    
    fireEvent.click(rightArrow)
    
    const leftArrow = screen.getByTestId('ChevronLeftIcon')
    expect(leftArrow).toBeInTheDocument()
    
    fireEvent.click(leftArrow)
    expect(screen.getByTestId('ChevronRightIcon')).toBeInTheDocument()

  })

  it('renders the navigation links', () => {
    render(<Sidebar/>)

    const navList = [
      'Pengaturan Formulir Pendaftaran',
      'List Pendaftaran',
      'Pengaturan Klinik',
      'Pengaturan Pengguna',
      'Pengaturan Jadwal Praktik',
      'Pengaturan Formulir Rekaman Medis',
      'Rekaman Medis',
    ]

    navList.forEach((navItem) => {
      expect(screen.getByText(navItem)).toBeInTheDocument
    })
  })
})