import { render, screen } from '@testing-library/react'
import Landing from 'pages/landing-page'
import '@testing-library/jest-dom'

describe('Landing Page Main Components', () => {
    it('should render', () => {
        render(<Landing/>)

        const main = screen.getByRole('main')

        expect(main).toBeInTheDocument()
    })

    it('should have a page heading', () => {
        render(<Landing/>)

        const heading = screen.getByRole('heading', {
            name: /Jiva/,
        })

        expect(heading).toBeInTheDocument()
    })

    it('should have Daftar and Masuk buttons', () => {
        render(<Landing/>)

        const daftar_button = screen.getByRole('button', {
            name: /Daftar/,
        })

        const masuk_button = screen.getByRole('button', {
            name: /Masuk/,   
        })

        expect(daftar_button).toBeInTheDocument()
        expect(masuk_button).toBeInTheDocument()
    })

    it('should have a title text and subtitle text for promotion texts', () => {
        render(<Landing/>)

        const title_h1 = screen.getByRole('h1', {
            name: /ERP terpercaya untuk klinik Anda/,
        })

        const subtitle_h2 = screen.getByRole('h2', {
            name: /Aplikasi penyelamat klinik Anda.\/9 dari 10 klinik terpercaya\/merekomendasikan aplikasi ini./,
        })


        expect(title_h1).toBeInTheDocument()
        expect(subtitle_h2).toBeInTheDocument()
    })

    it('should have Daftar Klinik Anda Sekarang button', () => {
        render(<Landing/>)

        const daftar_klinik_button = screen.getByRole('button', {
            name: /Daftarkan Klinik Anda Sekarang/,
        })

        expect(daftar_klinik_button).toBeInTheDocument()
    })

    it('should have an image with someone holding a masked globe while being masked by themselves (yeah, it is on the figma)', () => {
        render(<Landing/>)

        const landing_image = screen.getByRole('img')
        
        expect(landing_image).toHaveAttribute('src', '/landing_image.png')
        expect(landing_image).toHaveAttribute('alt', 'landing_image')
    })

    
})