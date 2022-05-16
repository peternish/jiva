import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TambahEntri from "@pages/klinik/[idKlinik]/[idCabang]/rekaman-medis/[nik]/tambah-entri";

// redux
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { setSchemas } from "@redux/modules/dynamicForm"
import { setPasien } from "@redux/modules/rekamanMedis"

// utils
import { mockRouter } from "@utils/testUtils/index"
import { SAMPLE_SCHEMA, SAMPLE_PASIEN } from "@utils/testUtils/constants"

const PATH = "/klinik/1/1/rekaman-medis/1/tambah-entri"

describe("<TambahEntri/> with proper state", () => {
  beforeEach(async () => {
    mockRouter(PATH)

    await store.dispatch(setSchemas(SAMPLE_SCHEMA))
    await store.dispatch(setPasien(SAMPLE_PASIEN))
    
    render(
      <Provider store={store}>
        <TambahEntri />
      </Provider>
    );
  });

  it("renders title correctly", () => {
    expect(screen.getByText("Tambah Entri Rekaman Medis")).toBeInTheDocument();
  });

  it("renders subheaders correctly", () => {
    expect(screen.getByText("Informasi Pasien")).toBeInTheDocument();
    expect(screen.getByText("Rekam Medis")).toBeInTheDocument();
  })

  it("renders patient identity correctly", () => {
    expect(screen.getByLabelText("Nama")).toBeInTheDocument();
    expect(screen.getByLabelText("NIK")).toBeInTheDocument();
  })

  it("renders dynamic form correctly", () => {
    expect(screen.getByLabelText("Field 1*")).toBeInTheDocument();
  })

  it('renders buttons', () => {
    expect(screen.getByText("Batal")).toBeInTheDocument()
    expect(screen.getByText("Simpan")).toBeInTheDocument()
  });

  it("does not render dynamic form", async () => {
    await store.dispatch(setSchemas([]))

    render(
      <Provider store={store}>
        <TambahEntri />
      </Provider>
    );

    expect(screen.queryByLabelText("Field 1")).toBeNull()
  })
});

describe("<TambahEntri/> without proper state", () => {
  beforeEach(async () => {
    mockRouter(PATH)
    
    render(
      <Provider store={store}>
        <TambahEntri />
      </Provider>
    );
  });

  it("does not render title correctly", () => {
    expect(screen.queryByText("Tambah Entri Rekaman Medis")).toBeNull()
  });

  it("does not render subheaders correctly", () => {
    expect(screen.queryByText("Informasi Pasien")).toBeNull()
    expect(screen.queryByText("Rekam Medis")).toBeNull()
  })

  it("does not render patient identity correctly", () => {
    expect(screen.queryByLabelText("Nama")).toBeNull()
    expect(screen.queryByLabelText("NIK")).toBeNull()
  })
});
