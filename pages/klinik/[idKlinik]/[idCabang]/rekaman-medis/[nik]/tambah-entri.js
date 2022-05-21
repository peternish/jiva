import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from "styled-components";
import constants from "@utils/constants";

// components
import Button from '@mui/material/Button';
import Layout from '@components/Layout';
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";
import FormRender from "@components/common/FormRender";
import Divider from '@mui/material/Divider';

// redux
import { useDispatch, useSelector } from "react-redux";
import { getSchemas } from "@redux/modules/dynamicForm/thunks";
import { findSchema } from "@redux/modules/dynamicForm/selectors";
import { tambahEntri, getPasien } from "@redux/modules/rekamanMedis/thunks";

const CSS = styled.div`
#form-container {
  display: flex;
  flex-direction: column;
}

.sub-header {
  font-weight: bold;
}

form {
  margin-top: 1em;
}
`

function TambahEntri() {
  const dispatch = useDispatch();

  const { query, isReady } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    dispatch(getSchemas({ idCabang: query.idCabang }));
    dispatch(getPasien(query.nik))
  }, [isReady, query, dispatch]);

  const schema = useSelector(state => findSchema(state, constants.FORM_TYPES.HEALTH_RECORD))
  const pasien = useSelector(state => state.rekamanMedis.pasien)
  
  const { idKlinik, idCabang } = query;

  return schema && pasien ? (
    <main>
      <Layout title="Tambah Entri Rekaman Medis">
          <CSS>
            <Formik
              enableReinitialize
              initialValues={{
                fullName: pasien.full_name,
                nik: pasien.nik,
                fields: []
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                console.log(values)
                dispatch(tambahEntri(values, setSubmitting, { idCabang, idKlinik }))
              }}
            >
              {({ isValid, isSubmitting, setFieldValue, submitForm }) => (
                <div id="form-container">
                  <h4 className="sub-header">Informasi Pasien</h4>
                  <small>Data pasien tidak dapat diubah</small>

                  <Form>
                    <TextInput 
                      name="fullName"
                      type="text"
                      label="Nama"
                      disabled
                    />

                    <TextInput 
                      name="nik"
                      type="text"
                      label="NIK"
                      disabled
                    />
                  </Form>

                  <Divider sx={{ margin: "1em 0" }}/>

                  <h4 className="sub-header">Rekam Medis</h4>
                  <small>Isi detail rekaman medis pada formulir di bawah</small>

                  <FormRender
                    schema={schema.fields}
                    submit={async (e) => {
                      await setFieldValue("fields", e)
                      submitForm()
                    }}
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    extraButton={() => <Button href={`/klinik/${idKlinik}/${idCabang}/rekaman-medis`} variant="outlined">Batal</Button>}
                  />
                </div>
              )}
            </Formik>
          </CSS>
      </Layout>
    </main>
  ) : null;
}

export default TambahEntri;