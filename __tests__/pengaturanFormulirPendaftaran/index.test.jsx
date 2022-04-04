import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import * as nextRouter from "next/router";
import PengaturanFormulirPendaftaran from "@pages/klinik/[idKlinik]/[idCabang]/pengaturan-formulir-pendaftaran";
import { setSchemas } from "@redux/modules/dynamicForm"

const SAMPLE_SCHEMA = [{
  "id": 1,
  "cabang_id": 1,
  "formtype": "pendaftaran_pasien",
  "fields": [
      {
          "name": "text-1649092362528-0",
          "type": "text",
          "label": "Field 1",
          "access": false,
          "subtype": "text",
          "required": true,
          "className": "form-control"
      }
  ],
  "klinik": {
      "name": "Klinik Staging 1"
  }
}]

describe("<PengaturanFormulirPendaftaran/>", () => {
  beforeEach(async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true,
    }))

    await store.dispatch(setSchemas(SAMPLE_SCHEMA))

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
