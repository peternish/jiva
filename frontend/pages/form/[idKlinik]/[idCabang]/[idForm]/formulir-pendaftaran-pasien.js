import { useState, useEffect } from "react"
import styled from "styled-components";
import { Formik, Form } from "formik";
import FormRender from "@components/common/FormRender";
import TextInput from "@components/common/TextInput";
import Card from "@mui/material/Card";
import constants from "@utils/constants"
import { useRouter } from 'next/router';
import Button from "@mui/material/Button"

// redux
import { createApplication } from "@redux/modules/klinik/thunks"
import { getSchemas } from "@redux/modules/dynamicForm/thunks"
import { getJadwalTenagaMedisList } from "@redux/modules/jadwalTenagaMedis/thunks"
import { findSchema } from "@redux/modules/dynamicForm/selectors"
import { useDispatch, useSelector } from "react-redux"

const CSS = styled.div`
  height: max-content;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #E4EAEE;

  input {
    width: 100% !important;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.2em;
  }

  #title {
    font-size: 1.875em;
    text-align: center;
  }

  #card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3em;
    width: 45.75em;
    box-sizing: border-box;
    height: max-content;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

const FormulirPendaftaranPasien = ({ isPreview, previewSchema }) => {
  const [submitted, setSubmitted] = useState(false)
  const { query, isReady } = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isReady) return;
    const { idCabang } = query;
    if (!isPreview) dispatch(getSchemas({ idCabang }));
    dispatch(getJadwalTenagaMedisList({ idCabang, getAvailable: true }))
  }, [isReady, query, dispatch, isPreview]);

  let schema = useSelector(state => findSchema(state, constants.FORM_TYPES.PATIENT_APPLICATION))
  if (isPreview) schema = previewSchema
  const { jadwalTenagaMedisList } = useSelector(state => state.jadwalTenagaMedis)

  const mandatoryFields = {
    nik: "",
    email: "",
    tenaga_medis: "",
    jadwal: "",
    fields: []
  }

  const getUniqueAccounts = (jadwalTenagaMedisListData) => {
    const set = new Set()
    const uniqueAccounts = []
    jadwalTenagaMedisListData.forEach(obj => {
      const { tenaga_medis: { account: { id } } } = obj
      if (!set.has(id)) uniqueAccounts.push(obj)
      set.add(id)
    })
    return uniqueAccounts
  }

  return schema && jadwalTenagaMedisList ? (
    <CSS>
      <Card id="card">
        <h4>
          {schema.klinik.name}
        </h4>
        <h1 id="title">
          Formulir Pendaftaran Pertemuan Dokter
        </h1>

        {submitted
          ? (
            <div>
              <p data-testid="success_message">Reservasi anda telah tersimpan! Mohon datang tepat waktu!</p>
              <Button onClick={() => location.assign(location.pathname)}>Daftar lagi</Button>
            </div>
          ) : (
            <Formik
            enableReinitialize
              initialValues={{ ...mandatoryFields }}
              validate={(values) => {
                const errors = {}
                if (!values.nik) errors.nik= "NIK wajib diisi"
                if (!values.email) errors.email= "Email wajib diisi"
                if (!values.tenaga_medis) errors.tenaga_medis = "Tenaga medis wajib dipilih"
                if (!values.jadwal) errors.jadwal = "Jadwal wajib dipilih"
                return errors
              }}
              onSubmit={async (values, { setSubmitting, isSubmitting }) => {
                const jadwal = jadwalTenagaMedisList.find(({ id }) => id == values.jadwal)
                setSubmitting(true)
                await dispatch(createApplication(setSubmitting, { ...values, jadwal_tenaga_medis_pk: values.jadwal, date: jadwal.date }))
                setSubmitted(!isSubmitting)
              }}
            >
              {({ errors, isSubmitting, submitForm, values, isValid, setFieldValue }) => (
                <>
                  <Form id="form">
                    <TextInput
                      name="nik"
                      type="text"
                      label="NIK"
                      placeholder="1234567890"
                      error={errors.nik}
                    />
                    <TextInput
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="alamat@email.com"
                      error={errors.email}
                    />
                    <TextInput
                      label="Pilih Tenaga Medis"
                      as="select" 
                      id="tenagamedis" 
                      data-testid="tenagamedis" 
                      name="tenaga_medis"
                      error={errors.tenaga_medis}
                    >
                      <option value="" disabled={true} hidden={true}>Pilih tenaga medis</option>
                      {getUniqueAccounts(jadwalTenagaMedisList).map(({ tenaga_medis: { account: { full_name, id } } }) => (
                        <option value={id} key={id}>{full_name}</option>
                      ))}
                    </TextInput>
                    <TextInput
                      as="select"
                      data-testid="jadwal" 
                      disabled={!values.tenaga_medis} 
                      name="jadwal"
                      label="Pilih Jadwal"
                      error={errors.jadwal}
                    >
                      <option value="" disabled={true} hidden={true}>Pilih jadwal pertemuan</option>
                      {values.tenaga_medis && (
                        jadwalTenagaMedisList.filter(({ tenaga_medis: { account: { id } } }) => id == values.tenaga_medis).map(({ start_time, end_time, day, id, date }, idx) => (
                          <option value={id} key={idx}>
                            {`(${new Date(date).toLocaleDateString()}) ${day}: ${start_time} - ${end_time}`}
                          </option>
                        )))}
                    </TextInput>
                  </Form>
                  <FormRender
                    schema={schema.fields}
                    submit={async (e) => {
                      setFieldValue("fields", e);
                      if (!isPreview) {
                        await submitForm()
                      }
                    }}
                    isSubmitting={isSubmitting}
                    isValid={!isPreview ? isValid : true}
                  />
                </>
              )}
            </Formik>
          )
        }
      </Card>
    </CSS>
  ) : "Loading Form..."
};

export default FormulirPendaftaranPasien;
