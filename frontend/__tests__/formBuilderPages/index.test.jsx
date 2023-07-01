import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import * as nextRouter from "next/router";
import PengaturanFormulirPendaftaran from "@pages/klinik/[idKlinik]/[idCabang]/pengaturan-formulir-pendaftaran";
import PengaturanFormulirRekamanMedis from "@pages/klinik/[idKlinik]/[idCabang]/pengaturan-formulir-rekaman-medis";
import { setSchemas } from "@redux/modules/dynamicForm"
import constants from "@utils/constants";


const sampleSchema = (formType) => {
  return [{
    "id": 1,
    "cabang_id": 1,
    "formtype": formType,
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
} 

describe("<PengaturanFormulirPendaftaran/>", () => {
  beforeEach(async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true,
    }))

    await store.dispatch(setSchemas(sampleSchema(constants.FORM_TYPES.PATIENT_APPLICATION)))

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

describe("<PengaturanFormulirRekamanMedis/>", () => {
  beforeEach(async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({
      query: { idKlinik: 1, idCabang: 1 },
      isReady: true,
    }))
    
    await store.dispatch(setSchemas(sampleSchema(constants.FORM_TYPES.HEALTH_RECORD)))
    
    render(
      <Provider store={store}>
        <PengaturanFormulirRekamanMedis />
      </Provider>
    )
  })

  it("renders a heading", () => {
    const heading = screen.getByRole("heading", {
      name: /Pengaturan Formulir Rekaman Medis/,
    })

    expect(heading).toBeInTheDocument();
  })

  it("renders necessary buttons", () => {
    const buttons = screen.getAllByRole("button")
    expect(buttons).toHaveLength(3)
  })
})

