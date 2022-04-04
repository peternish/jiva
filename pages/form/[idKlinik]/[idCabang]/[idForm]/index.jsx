import { useState, useEffect } from "react"
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import FormRender from "@components/common/FormRender";
import TextInput from "@components/common/TextInput";
import Card from "@mui/material/Card";
import constants from "@utils/constants"
import { useRouter } from 'next/router';
import Link from "next/link"
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

const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const { query, isReady } = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isReady) return;
    const { idCabang } = query;
    dispatch(getSchemas({ idCabang }));
    dispatch(getJadwalTenagaMedisList({ idCabang }))
  }, [isReady, query, dispatch]);

  const schema = useSelector(state => findSchema(state, constants.FORM_TYPES.PATIENT_APPLICATION))
  const { jadwalTenagaMedisList } = useSelector(state => state.jadwalTenagaMedis)

  const mandatoryFields = {
    nik: "",
    tenaga_medis: "",
    jadwal: "",
    fields: []
  }

  return schema && jadwalTenagaMedisList ? (
    <CSS>
      <Card id="card">
        <h1 id="title">
          Pendaftaran
          {' '}
          {schema.klinik.name}
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
                if (!values.tenaga_medis) errors.tenaga_medis = "Tenaga medis wajib dipilih"
                if (!values.jadwal) errors.jadwal = "Jadwal wajib dipilih"
                return errors
              }}
              onSubmit={async (values, { setSubmitting, isSubmitting }) => {
                setSubmitting(true)
                await dispatch(createApplication(setSubmitting, values))
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
                      label="Pilih Tenaga Medis"
                      as="select" 
                      id="tenagamedis" 
                      data-testid="tenagamedis" 
                      name="tenaga_medis"
                      error={errors.tenaga_medis}
                    >
                      <option value="" disabled={true} hidden={true}>Pilih tenaga medis</option>
                      {jadwalTenagaMedisList.map(({ tenaga_medis: { account: { full_name, id } } }) => (
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
                        jadwalTenagaMedisList.filter(({ tenaga_medis: { account: { id } } }) => id == values.tenaga_medis).map(({ start_time, end_time, day, id }, idx) => (
                          <option value={id} key={idx}>
                            {`${day}: ${start_time} - ${end_time}`}
                          </option>
                        )))}
                    </TextInput>
                  </Form>
                  <FormRender
                    schema={schema.fields}
                    submit={async (e) => {
                      setFieldValue("fields", e);
                      await submitForm()
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
  ) : null
};

export default RegistrationForm;
