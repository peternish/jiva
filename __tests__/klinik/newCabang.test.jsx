import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import NewCabang from "@pages/klinik/newcabang";
import "@testing-library/jest-dom";

describe("<Klinik/>", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <NewCabang />
      </Provider>
    );
  });

  it("has main text above", () => {
    expect(screen.getByText("Tambah Cabang")).toBeInTheDocument();
  })

  it("renders title correctly", () => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders inputs correctly", () => {
    expect(screen.getByLabelText("Lokasi")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Alam Sutra")).toBeInTheDocument();
  });

  it("renders button correctly", () => {
    const btn1 = screen.getByText("Kembali");
    const btn2 = screen.getByText("Buat");
    expect(btn1).toBeInTheDocument();
    expect(btn2).toBeInTheDocument();
  });

});
