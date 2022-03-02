import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux"
import { store } from "@redux/store"

// components
import Register from "@pages/register";

describe("<Register/>", () => {
  beforeEach(() => {
    render(<Provider store={store}><Register/></Provider>)
  })

  describe("Renders first page correctly", () => {
    it("renders owner register form", () => {
      expect(screen.getByText("Daftar Pemilik Klinik")).toBeInTheDocument();
  
      // Labels
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(screen.getByLabelText("Nama Lengkap")).toBeInTheDocument();
  
      // Input
      expect(screen.getByPlaceholderText("jiva@gmail.com")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("John Doe")).toBeInTheDocument();
    });
  
    it("renders buttons correctly", () => {
      const cta1 = screen.getByText("Batal")
      const cta2 = screen.getByText("Lanjut")
      expect(cta1).toBeInTheDocument()
      expect(cta2).toBeInTheDocument()
    })
  })

  describe("Renders second page correctly", () => {
    beforeEach(() => {
      const nextButton = screen.getByText("Lanjut")
      fireEvent.click(nextButton)
    })

    it("renders owner register form", () => {
      expect(screen.getByText("Daftar Klinik")).toBeInTheDocument();
  
      // Labels
      expect(screen.getByLabelText("Nama Klinik")).toBeInTheDocument();
      expect(screen.getByText("Surat Izin Klinik")).toBeInTheDocument();
  
      // Input
      expect(screen.getByPlaceholderText("Jiva")).toBeInTheDocument();
    });
  
    it("renders buttons correctly", () => {
      expect(screen.getByText("Kembali")).toBeInTheDocument()
      expect(screen.getByText("Daftar")).toBeInTheDocument()
      expect(screen.getByText("Daftar").getAttribute("type")).toBe("submit")
    })
  })
});
