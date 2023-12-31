import "@testing-library/jest-dom";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@redux/store";

// components
import Register from "@pages/register";
import Dropzone, {
  getColor,
} from "@components/RegisterPageComponents/Dropzone";
import constants from "@utils/constants";

describe("<Register/>", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
  });

  describe("Renders first page correctly", () => {
    it("renders owner register form", () => {
      expect(
        screen.getByRole("heading", { name: "Daftar Pemilik Klinik" })
      ).toBeInTheDocument();

      // Labels
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(screen.getByLabelText("Nama Lengkap")).toBeInTheDocument();

      // Input
      expect(screen.getByPlaceholderText("jiva@gmail.com")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
    });

    it("renders buttons correctly", async () => {
      const cta1 = screen.getByText("Batal");
      const cta2 = screen.getByText("Lanjut");
      expect(cta1).toBeInTheDocument();
      expect(cta2).toBeInTheDocument();

      await act(async () => {
        await fireEvent.click(cta1);
      });
    });

    it("renders errors correctly", async () => {
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const fullNameInput = screen.getByLabelText("Nama Lengkap");

      const nextButton = screen.getByText("Lanjut");
      await act(async () => {
        await fireEvent.click(nextButton);
      });

      expect(screen.getByText("Email wajib diisi")).toBeInTheDocument();
      expect(screen.getByText("Password wajib diisi")).toBeInTheDocument();
      expect(screen.getByText("Nama lengkap wajib diisi")).toBeInTheDocument();

      const DUMMY_TEXT = "dummy";
      const options = {
        target: { value: DUMMY_TEXT },
      };
      await act(async () => {
        await fireEvent.change(emailInput, options);
        await fireEvent.change(passwordInput, options);
        await fireEvent.change(fullNameInput, options);
      });

      await act(async () => {
        await fireEvent.click(nextButton);
      });

      expect(screen.getByText("Masukkan email yang valid")).toBeInTheDocument();
    });
  });

  describe("Renders second page correctly", () => {
    const DUMMY_TEXT = "dummy@email.com";
    beforeEach(async () => {
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const fullNameInput = screen.getByLabelText("Nama Lengkap");
      const options = {
        target: { value: DUMMY_TEXT },
      };
      await act(async () => {
        await fireEvent.change(emailInput, options);
        await fireEvent.change(passwordInput, options);
        await fireEvent.change(fullNameInput, options);
      });
      expect(emailInput.getAttribute("value")).toBe(DUMMY_TEXT);
      expect(passwordInput.getAttribute("value")).toBe(DUMMY_TEXT);
      expect(fullNameInput.getAttribute("value")).toBe(DUMMY_TEXT);

      const nextButton = screen.getByText("Lanjut");
      await act(async () => {
        await fireEvent.click(nextButton);
      });
    });

    it("renders owner register form", () => {
      expect(screen.getByText("Daftar Klinik")).toBeInTheDocument();

      // Labels
      expect(screen.getByLabelText("Nama Klinik")).toBeInTheDocument();
      expect(screen.getByText("Surat Izin Klinik")).toBeInTheDocument();

      // Input
      expect(screen.getByPlaceholderText("Jiva")).toBeInTheDocument();
    });

    it("renders buttons correctly", () => {
      expect(screen.getByText("Kembali")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Daftar/ })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Daftar/ }).getAttribute("type")
      ).toBe("submit");
    });

    it("submits correctly", async () => {
      const clinicNameInput = screen.getByLabelText("Nama Klinik");
      await act(async () => {
        await fireEvent.change(clinicNameInput, {
          target: { value: "Kinik Test" },
        });
      });

      const input = screen.getByTestId("input");
      const fileName = "fileName.pdf";
      const file = new File([new Blob()], fileName, {
        type: "application/pdf",
      });
      await act(async () => {
        await fireEvent.change(input, {
          target: { files: [file] },
        });
      });

      const submitButton = screen.getByRole("button", { name: /Daftar/ });
      expect(submitButton.getAttribute("disabled")).toBeNull();
      await act(async () => {
        await fireEvent.click(submitButton);
      });
    });
  });
});

describe("<Dropzone/>", () => {
  const setSikFile = jest.fn();
  beforeEach(() => {
    render(<Dropzone setSikFile={setSikFile} />);
  });

  it("renders label", () => {
    expect(screen.getByText("Surat Izin Klinik")).toBeInTheDocument();
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
    expect(setSikFile).toHaveBeenCalledTimes(1);
  });

  it("returns correct color", () => {
    expect(getColor({ isDragAccept: true })).toBe("#00e676");
    expect(getColor({ isDragReject: true })).toBe("#ff1744");
    expect(getColor({ isFocused: true })).toBe("#2196f3");
    expect(getColor({ error: true })).toBe(constants.COLORS.ERROR);
    expect(getColor({})).toBe("#eeeeee");
  });
});
