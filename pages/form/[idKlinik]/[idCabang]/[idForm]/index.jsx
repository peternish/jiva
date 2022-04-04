import { useState, useEffect } from "react"
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import FormRender from "@components/common/FormRender";
import TextInput from "@components/common/TextInput";
import Layout from "@components/DynamicForm/Layout";
import Card from "@mui/material/Card";
import constants from "@utils/constants"
import { useRouter } from 'next/router';

// redux
import { createApplication } from "@redux/modules/klinik/thunks"
import { getSchemas } from "@redux/modules/dynamicForm/thunks"
import { getJadwalTenagaMedisList } from "@redux/modules/jadwalTenagaMedis/thunks"
import { findSchema } from "@redux/modules/dynamicForm/selectors"
import { useDispatch, useSelector } from "react-redux"

const CSS = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 100% !important;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.2em;
  }

  #title {
    font-size: 3em;
  }

  #card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3em;
    width: max-content;
    box-sizing: border-box;
    height: max-content;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 0.5em;
  }

  #form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0;
    &, * {
      width: 100%;
    }
  }

  button {
    width: 100%;
  }

  #button-container {
    display: flex;
    width: 100%;
    gap: 1em;

    button {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 2em 0;

    #card {
      width: 100%;
    }
  }
`;

/* istanbul ignore next */
// export async function getServerSideProps({ params, res }) {
//   const { idCabang, idForm } = params
//   const jadwalTenagaMedis = [
//     {
//       "id": 2,
//       "tenaga_medis": {
//         "account": {
//           "id": 2,
//           "full_name": "TM 2",
//           "email": "tm2@klinik99.com",
//           "date_joined": "2022-03-31T12:49:11.378628Z",
//           "last_login": "2022-03-31T12:49:11.378628Z",
//           "role": "tenaga_medis",
//           "cabang": 1,
//           "klinik": 1
//         },
//         "sip": "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
//       },
//       "start_time": "10:00:00",
//       "end_time": "12:00:00",
//       "quota": 5,
//       "day": "mon"
//     },
//     {
//       "id": 3,
//       "tenaga_medis": {
//         "account": {
//           "id": 3,
//           "full_name": "TM 3",
//           "email": "tm3@klinik99.com",
//           "date_joined": "2022-04-02T10:43:33.797983Z",
//           "last_login": "2022-04-02T10:43:33.797983Z",
//           "role": "tenaga_medis",
//           "cabang": 1,
//           "klinik": 1
//         },
//         "sip": "https://django-surat-izin-klinik-jiva.s3.amazonaws.com/static/HW2204B4.txt"
//       },
//       "start_time": "11:00:00",
//       "end_time": "14:00:00",
//       "quota": 5,
//       "day": "mon"
//     }
//   ]

//   let jadwalByDoctor
//   try {
//     const jadwalTenagaMedis = await axios.get(`${constants?.API_BASE_URL}/jadwal/tenaga-medis/available/${idCabang}/`, {
//       date: `${new Date(Date.now()).toLocaleString().split(',')[0]}` // dd/mm/yyyy
//     })
//     jadwalByDoctor = jadwalTenagaMedis.reduce((r, a) => {
//       r[a.tenaga_medis.account.id] = r[a.tenaga_medis.account.id] || []
//       r[a.tenaga_medis.account.id].push(a)
//       return r
//     }, Object.create(null))
//   } catch (error) {
//     console.log(error)
//   }

//   const {
//     data: { cabang_id, klinik, fields },
//   } = await axios.get(`${constants?.API_BASE_URL}/klinik/cabang/${idCabang}/dform/${idForm}}/`)
//   return {
//     props: {
//       idKlinik,
//       idCabang,
//       fields,
//       namaKlinik: klinik.name,
//       jadwal: jadwalByDoctor,
//     }
//   }
// }

const RegistrationForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const submitted = false
  const { query, isReady } = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isReady) return;
    const { idCabang } = query;
    dispatch(getSchemas({ idCabang }));
    dispatch(getJadwalTenagaMedisList({ idCabang }))
  }, [isReady, query, dispatch]);

  const schema = useSelector(state => findSchema(state, constants.FORM_TYPES.PATIENT_APPLICATION))
  // const { jadwalTenagaMedisList } = useSelector(state => state.jadwalTenagaMedis)
  const jadwalTenagaMedisList = [
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

  const mandatoryFields = {
    nik: "",
    tenaga_medis: "",
    jadwal: "",
    fields: []
  }

  console.log(schema)

  return (
    <Layout navType="topbar">
      <CSS>
        <Card id="card">
          <h1 id="title">
            Pendaftaran
            {' '}
            {schema.klinik.name}
          </h1>

          {submitted
            ? (
              <p data-testid="success_message">Reservasi anda telah tersimpan! Mohon datang tepat waktu!</p>
            ) : (
              <Formik
                initialValues={{ ...mandatoryFields }}
                validate={(values) => {
                  const errors = {}
                  if (!values.nik) errors.email = "NIK wajib diisi"
                  if (!values.tenaga_medis) errors.tenaga_medis = "Tenaga medis wajib dipilih"
                  if (!values.jadwal) errors.jadwal = "Jadwal wajib dipilih"
                  return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true)
                  dispatch(createApplication(values))
                }}
              >
                {({ errors, isSubmitting, submitForm, values, isValid, validateForm, setFieldValue }) => (
                  <>
                    <Form id="form">
                      <TextInput
                        name="nik"
                        type="text"
                        label="NIK"
                        placeholder="1234567890"
                        error={errors.nik}
                      />
                      <label htmlFor={"tenagamedis"}>Jadwal dokter</label>
                      <Field as="select" id="tenagamedis" data-testid="tenagamedis" name="tenaga_medis">
                        <option value="" disabled={true} hidden={true}>Pilih tenaga medis</option>
                        {jadwalTenagaMedisList.map(({ tenaga_medis: { account: { full_name, id } } }) => (
                          <option value={id} key={id}>{full_name}</option>
                        ))}
                      </Field>
                      <Field as="select" data-testid="jadwal" disabled={!values.tenaga_medis} name="jadwal">
                        <option value="" disabled={true} hidden={true}>Pilih jadwal pertemuan</option>
                        {values.tenaga_medis && (
                          jadwalTenagaMedisList.filter(({ tenaga_medis: { account: { id } } }) => id == values.tenaga_medis).map(({ start_time, end_time, day, id }, idx) => (
                            <option value={id} key={idx}>
                              {`${day}: ${start_time} - ${end_time}`}
                            </option>
                          )))}
                      </Field>
                    </Form>
                    <FormRender
                      schema={schema.fields}
                      submit={async (e) => {
                        setFieldValue("fields", e);
                        await submitForm(e)
                      }}
                      isSubmitting={isSubmitting}
                      isValid={isValid}
                    />
                  </>
                )}
              </Formik>
            )
          }
        </Card>
      </CSS>
    </Layout >
  );
};

export default RegistrationForm;
