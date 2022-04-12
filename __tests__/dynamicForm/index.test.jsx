import { Provider } from "react-redux";
import * as nextRouter from 'next/router';
import RegistrationForm from '@pages/form/[idKlinik]/[idCabang]/[idForm]/formulir-pendaftaran-pasien'
import { fireEvent, render, screen, act } from "@testing-library/react";
import { store } from "@redux/store";
import '@testing-library/jest-dom'
import { setSchemas } from "@redux/modules/dynamicForm"
import { setJadwalTenagaMedisList } from "@redux/modules/jadwalTenagaMedis"

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

const SAMPLE_JADWAL = [
  {
    "id": 2,
    "tenaga_medis": {
      "account": {
        "id": 2,
        "full_name": "TM 2",
        "email": "tm2@klinik99.com",
        "date_joined": "2022-03-31T12:49:11.378628Z",
        "last_login": "2022-03-31T12:49:11.378628Z",
        "role": "tenaga_medis",
        "cabang": 1,
        "klinik": 1
      },
      "sip": "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
    },
    "start_time": "10:00:00",
    "end_time": "12:00:00",
    "quota": 5,
    "day": "mon"
  },
  {
    "id": 3,
    "tenaga_medis": {
      "account": {
        "id": 3,
        "full_name": "TM 3",
        "email": "tm3@klinik99.com",
        "date_joined": "2022-04-02T10:43:33.797983Z",
        "last_login": "2022-04-02T10:43:33.797983Z",
        "role": "tenaga_medis",
        "cabang": 1,
        "klinik": 1
      },
      "sip": "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
    },
    "start_time": "11:00:00",
    "end_time": "14:00:00",
    "quota": 5,
    "day": "mon"
  }
]

const mockRouter = () => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/form/1/1/1/formulir-pendaftaran-pasien',
    query: { idCabang: 1 },
    isReady: true,
  }));
}

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
    const doctorField = screen.getByLabelText("Pilih Jadwal");

    expect(NIKField).toBeInTheDocument();
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

    const { debug } = render(
      <Provider store={store}>
        <RegistrationForm />
      </Provider>
    );
    debug()
  });

  it('able to submit if filled properly', async () => {
    const nikField = screen.getByLabelText("NIK")
    const tenagaMedisField = screen.getByLabelText("Pilih Tenaga Medis")
    const jadwalSelection = screen.getByLabelText("Pilih Jadwal")
    const firstField = screen.getByLabelText("Field 1*");

    await act(async () => {
      await fireEvent.change(nikField, { target: { value: "2" } })
      await fireEvent.change(tenagaMedisField, { target: { value: "2" } })
      await fireEvent.change(jadwalSelection, { target: { value: "2" } })
      await fireEvent.change(firstField, { target: { value: "text" } })
    })

    const buttonsubmit = screen.getAllByRole('button', {
      name: "Simpan",
    })[0]

    expect(buttonsubmit).not.toHaveAttribute("disabled")

    await act(async () => {
      await fireEvent.click(buttonsubmit)
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
