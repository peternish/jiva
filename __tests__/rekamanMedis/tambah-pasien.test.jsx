import { fireEvent, render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as nextRouter from 'next/router';

// components
import PasienCreatePage from '@pages/klinik/[idKlinik]/[idCabang]/rekaman-medis/tambah-pasien';

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";


describe('PasienCreatePage', () => {  
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      route: '/klinik/1/1/rekaman-medis/tambah-pasien', 
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true, 
    }));
    render(
      <Provider store={store}>
        <PasienCreatePage />
      </Provider>
    );
  });


  afterEach(() => {
    let assignMock = jest.fn();
    delete window.location;
    window.location = { assign: assignMock };
    assignMock.mockClear();
  });
  
  it('renders the correct heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Tambah Pasien/,
    });
    expect(heading).toBeInTheDocument();
  });


  it('renders necessary data fields', () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap")
    const nikField = screen.getByLabelText("NIK");
    expect(fullNameField).toBeInTheDocument();
    expect(nikField).toBeInTheDocument();
  });


  it('renderes Batal button', () => {
    const button = screen.getByRole('link', {
      name: /Batal/,
    });
    expect(button).toBeInTheDocument();
  });

  
  it('renders Tambah button', () => {
    const button = screen.getByRole('button', {
      name: /Tambah/,
    });
    expect(button).toBeInTheDocument();
  });


  it("updates field values based on input", async () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap")
    const nikField = screen.getByLabelText("NIK");
    await act(async () => {
      const testFullName = 'Budi Budiman'
      const testNIK = '3276001122330001'
      await fireEvent.change(fullNameField, {target: {value: testFullName}});
      await fireEvent.change(nikField, {target: {value: testNIK}});
      expect(fullNameField.value).toBe(testFullName);
      expect(nikField.value).toBe(testNIK);
    });
  });
});
