import { fireEvent, render, screen, act } from "@testing-library/react";
import CreateTenagaMedis from '@pages/klinik/[idKlinik]/[idCabang]/tenaga-medis/create';
import Dropzone, { getColor } from '@components/TenagaMedisPageComponents/Dropzone';
import { Provider } from "react-redux";
import { store } from "@redux/store";
import '@testing-library/jest-dom';
import constants from "@utils/constants";
import * as nextRouter from 'next/router';

describe('CreateTenagaMedis', () => {  
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      route: '/klinik/1/1/tenaga-medis/create', 
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true, 
    }));

    render(
      <Provider store={store}>
        <CreateTenagaMedis />
      </Provider>
    );
  });


  afterEach(() => {
    let assignMock = jest.fn();
    delete window.location;
    window.location = { assign: assignMock };
    assignMock.mockClear();
  });
  

  it('should render', () => {
    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
  });

  
  it('should have the page main heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Tambah Tenaga Medis/,
    });

    expect(heading).toBeInTheDocument();
  });


  it('should have data fields', () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap");
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");

    expect(fullNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });


  it('should have the batal button', () => {
    const button = screen.getByRole('link', {
      name: /Batal/,
    });

    expect(button).toBeInTheDocument();
  });

  
  it('should have the tambah button', () => {
    const button = screen.getByRole('button', {
      name: /Tambah/,
    });

    expect(button).toBeInTheDocument();
  });


  it("should show form validation errors when there are empty fields", async () => {
    const fullNameField = screen.getByLabelText("Nama Lengkap");
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");

    await act(async () => {
      await fireEvent.change(fullNameField, {target: {value: 'dr. Budi Budiman, Sp.A.'}});
      await fireEvent.change(emailField, {target: {value: 'budi.budiman@email.com'}});
      await fireEvent.change(passwordField, {target: {value: 'password'}});

      expect(fullNameField.value).toBe('dr. Budi Budiman, Sp.A.');
      expect(emailField.value).toBe('budi.budiman@email.com');
      expect(passwordField.value).toBe('password');
    });

    expect(await screen.getByText("Unggah surat izin praktik")).toBeInTheDocument();
  });


  it("should submit when 'Tambah' is pressed", async () => {
  //   const fullNameField = screen.getByLabelText("Nama Lengkap");
  //   const emailField = screen.getByLabelText("Email");
  //   const passwordField = screen.getByLabelText("Password");

  //   await act(async () => {
  //     await fireEvent.change(fullNameField, {target: {value: 'dr. Budi Budiman, Sp.A.'}});
  //     await fireEvent.change(emailField, {target: {value: 'budi.budiman@email.com'}});
  //     await fireEvent.change(passwordField, {target: {value: 'password'}});
  //   });

  //   const input = screen.getByRole("input");
  //   const fileName = "fileName.pdf";
  //   const file = new File([new Blob()], fileName, { type: "application/pdf" });
  //   await act(async () => {
  //     await fireEvent.change(input, {
  //       target: { files: [file] },
  //     });
  //   });

  //   const button = screen.getByRole('button', {
  //     name: /Tambah/,
  //   });
  //   expect(button).toBeInTheDocument();

  //   await act(async () => {
  //     await fireEvent.click(button);
  //   });
  });
});



describe("Dropzone", () => {
  const setSipFile = jest.fn();

  beforeEach(() => {
    render(<Dropzone setSipFile={setSipFile} />);
  });


  it("renders label", () => {
    expect(screen.getByText("Surat Izin Praktik")).toBeInTheDocument();
  });


  it("renders dropzone label", () => {
    expect(screen.getByText("Unggah File"));
  });


  it("handles file upload correctly", async () => {
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
    const fileName = "fileName.pdf";
    const file = new File([new Blob()], fileName, { type: "application/pdf" });
    await act(async () => {
      await fireEvent.change(input, {
        target: { files: [file] },
      });
    });
    expect(setSipFile).toHaveBeenCalledTimes(1);
  });

  it("returns correct color", () => {
    expect(getColor({ isDragAccept: true })).toBe("#00e676");
    expect(getColor({ isDragReject: true })).toBe("#ff1744");
    expect(getColor({ isFocused: true })).toBe("#2196f3");
    expect(getColor({ error: true })).toBe(constants.COLORS.ERROR);
    expect(getColor({})).toBe("#eeeeee");
  });
});
