import { Provider } from "react-redux";
import * as nextRouter from 'next/router';
import RegistrationForm from '@pages/form/[idKlinik]/[idCabang]/[idForm]/formulir-pendaftaran-pasien'
import { fireEvent, render, screen, act } from "@testing-library/react";
import { store } from "@redux/store";
import '@testing-library/jest-dom'
import { setSchemas } from "@redux/modules/dynamicForm"
import { setJadwalTenagaMedisList } from "@redux/modules/jadwalTenagaMedis"
import { SAMPLE_SCHEMA, SAMPLE_JADWAL } from "@utils/testUtils/constants"

const mockRouter = () => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/form/1/1/1/formulir-pendaftaran-pasien',
    query: { idCabang: 1 },
    isReady: true,
  }));
}

jest.setTimeout(20000)

describe("Dynamic Form", () => {
  beforeEach(async () => {
    mockRouter()

    await store.dispatch(setJadwalTenagaMedisList(SAMPLE_JADWAL))
    await store.dispatch(setSchemas(SAMPLE_SCHEMA))

    render(
      <Provider store={store}>
        <RegistrationForm />
      </Provider>
    );
  });

  it('renders a heading', () => {

    const heading = screen.getAllByRole('heading', {
      name: "Formulir Pendaftaran Pertemuan Dokter",
    })[0]

    expect(heading).toBeInTheDocument()
  })

  it('renders mandatory fields', () => {
    const NIKField = screen.getByLabelText("NIK");
    const emailField = screen.getByLabelText("Email");
    const doctorField = screen.getByLabelText("Pilih Jadwal");

    expect(NIKField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(doctorField).toBeInTheDocument();
  });

  it('renders data fields', () => {
    const firstField = screen.getByLabelText("Field 1*");

    expect(firstField).toBeInTheDocument();
  });

  it('renders submit button', () => {
    const buttonsubmit = screen.getAllByRole('button', {
      name: "Simpan",
    })[0]
    expect(buttonsubmit).toBeInTheDocument()
  });

  it('enables jadwal selection when doctor is selected', async () => {
    const tenagaMedisSelection = screen.getByLabelText("Pilih Tenaga Medis")
    const jadwalSelection = screen.getByLabelText("Pilih Jadwal")
    expect(tenagaMedisSelection).toBeInTheDocument()
    expect(jadwalSelection).toBeDisabled()

    await act(async () => {
      fireEvent.change(tenagaMedisSelection, { target: { value: 2 } })
      fireEvent.click(jadwalSelection)
    })

    expect(jadwalSelection).not.toBeDisabled()
  });
});


describe("Dynamic Form Submission", () => {
  beforeEach(async () => {
    mockRouter()

    await store.dispatch(setJadwalTenagaMedisList(SAMPLE_JADWAL))
    await store.dispatch(setSchemas(SAMPLE_SCHEMA))

    render(
      <Provider store={store}>
        <RegistrationForm />
      </Provider>
    );
  });

  it('able to submit if filled properly', async () => {
    const nikField = screen.getByLabelText("NIK")
    const emailField = screen.getByLabelText("Email")
    const tenagaMedisField = screen.getByLabelText("Pilih Tenaga Medis")
    const jadwalSelection = screen.getByLabelText("Pilih Jadwal")
    const firstField = screen.getByLabelText("Field 1*");

    await act(async () => {
      await fireEvent.change(nikField, { target: { value: "2" } })
      await fireEvent.change(emailField, { target: { value: "email@email.com" } })
      await fireEvent.change(tenagaMedisField, { target: { value: "2" } })
      await fireEvent.change(jadwalSelection, { target: { value: "2" } })
      await fireEvent.change(firstField, { target: { value: "text" } })
    })

    const buttonsubmit = screen.getAllByRole('button', {
      name: "Simpan",
    })[0]

    expect(buttonsubmit).not.toHaveAttribute("disabled")

    await act(async () => {
      fireEvent.click(buttonsubmit)
    })
  });
});

describe("Dynamic Form with no data", () => {
  beforeEach(() => {
    mockRouter()

    render(
      <Provider store={store}>
        <RegistrationForm />
      </Provider>
    );
  })

  it('has zero available doctor', async () => {
    const tenagaMedisSelection = await screen.queryAllByTestId("tenagamedis")
    expect(tenagaMedisSelection.length).toBe(0)
  })
})
