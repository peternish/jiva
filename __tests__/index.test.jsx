import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from '@components/Layout/Sidebar'
import Navbar from "@components/Layout/Navbar";
import Layout from "@components/Layout";
import { store } from "@redux/store";
import { Provider } from "react-redux";
import Home from "@pages/index";
import * as nextRouter from 'next/router';
import { setProfile } from "@redux/modules/auth";

describe("Layout", () => {
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      route: '/klinik/1/1', 
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true, 
    }));
  });
  
  it("renders a head", () => {
    const text = "Hello";
    render(
      <Provider store={store}>
        <Layout>{text}</Layout>
      </Provider>
    );
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

describe("Navbar", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Navbar/>
      </Provider>
    );
  });

  it("renders a navbar", () => {
    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    const links = screen.getAllByRole("link");
    
    expect(links).toHaveLength(3)
  })
})

const renderSidebar = async (role) => {
  await store.dispatch(setProfile({ role }))
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({ 
    route: '/klinik/1/1', 
    query: { idKlinik: 1, idCabang: 1 },
    isReady: false, 
  }));

  render(
    <Provider store={store}>
      <Sidebar/>
    </Provider>
  )
}

describe('Sidebar', () => {
  it('renders a sidebar', async () => {
    await renderSidebar('owner')
    const sidebar = screen.getByTestId('sidebar')

    expect(sidebar).toBeInTheDocument()
  })

  it('toggles the sidebar when the arrow button is clicked', async () => {
    await renderSidebar('owner')
    const rightArrow = screen.getByTestId('ChevronRightIcon')
    expect(rightArrow).toBeInTheDocument()
    
    fireEvent.click(rightArrow)
    
    const leftArrow = screen.getByTestId('ChevronLeftIcon')
    expect(leftArrow).toBeInTheDocument()
    
    fireEvent.click(leftArrow)
    expect(screen.getByTestId('ChevronRightIcon')).toBeInTheDocument()

  })

  it('renders the navigation links for owner', async () => {
    const ownerNavList = [
      'Pengaturan Formulir Pendaftaran',
      'List Pendaftaran',
      'Pengaturan Klinik',
      'Pengaturan Staf',
      'Pengaturan Jadwal Praktik',
      'Logout'
    ]
    
    await renderSidebar('owner')
    ownerNavList.forEach((navItem) => {
      expect(screen.getByText(navItem)).toBeInTheDocument
    })
  })

  it('renders the navigation links for staf', async () => {
    const stafNavList = [
      'Pengaturan Formulir Pendaftaran',
      'List Pendaftaran',
      'Pengaturan Klinik',
      'Pengaturan Jadwal Praktik',
      'Logout'
    ]

    await renderSidebar('staf')
    stafNavList.forEach((navItem) => {
      expect(screen.getByText(navItem)).toBeInTheDocument
    })
  })

  it('renders the navigation links for tenaga_medis', async () => {
    const tenagaMedisNavList = [
      'List Pendaftaran',
      'Pengaturan Formulir Rekaman Medis',
      'Rekaman Medis',
    ]
    
    await renderSidebar('tenaga_medis')
    tenagaMedisNavList.forEach((navItem) => {
      expect(screen.getByText(navItem)).toBeInTheDocument
    })
  })
})

describe("Home Page", () => {
  beforeEach(() => {
    render(
    <Provider store={store}>
      <Home />
    </Provider>);
  });

  it('renders a title', () => {
    const title = screen.getByText('ERP terpercaya untuk klinik Anda')

    expect(title).toBeInTheDocument()
  })

  it('renders a subtitle', () => {
    const subtitle = screen.getByText('Aplikasi penyelamat klinik Anda. 9 dari 10 klinik terpercaya merekomendasikan aplikasi ini.')

    expect(subtitle).toBeInTheDocument()
  })

  it('renders a daftarkan klinik button', () => {
    const button = screen.getByText("Daftarkan Klinik Anda Sekarang")

    expect(button).toBeInTheDocument()
  })

  it('renders an image', () => {
    const img = screen.getByRole('img')

    expect(img).toBeInTheDocument()
  })

})