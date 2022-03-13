import { render, screen, act, fireEvent } from "@testing-library/react";
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

  it("shows error correctly", async () => {
    const btn1 = screen.getByText("Buat");

    await act(async () => {
      await fireEvent.click(btn1);
    });

    expect(screen.getByText("Input ini wajib diisi")).toBeInTheDocument();
  });

  it("submits correctly", async () => {
    const locationInput = screen.getByLabelText("Lokasi");

    const DUMMY_TEXT = "Alam Baka";
    const options = {
      target: { value: DUMMY_TEXT },
    }

    await act(async () => {
      await fireEvent.change(locationInput, options);
    });

    const btn1 = screen.getByText("Buat");
    await act(async () => {
      await fireEvent.click(btn1);
    });

  });

  it("redirects correctly", async () => {
    const backBtn = screen.getByLabelText("Kembali");

    await act(async () => {
      await fireEvent.click(backBtn);
    });

    expect(global.window.location.pathname).toEqual("/klinik");
  });

});
