import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import * as nextRouter from "next/router";
import PengaturanFormulirPendaftaran from "@pages/klinik/[idKlinik]/[idCabang]/pengaturan-formulir-pendaftaran";

describe("<PengaturanFormulirPendaftaran/>", () => {
  beforeEach(async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true,
    }))

    render(
      <Provider store={store}>
        <PengaturanFormulirPendaftaran />
      </Provider>
    )
  })

  it("renders a heading", () => {
    const heading = screen.getByRole("heading", {
      name: /Pengaturan Formulir Pendaftaran/,
    })

    expect(heading).toBeInTheDocument();
  })

  it("renders necessary buttons", () => {
    const buttons = screen.getAllByRole("button")
    expect(buttons).toHaveLength(3)
  })
})
