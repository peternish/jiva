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

// redux
import { useDispatch, useSelector } from "react-redux";
import { getSchemas } from "@redux/modules/dynamicForm/thunks";
import { findSchema } from "@redux/modules/dynamicForm/selectors";
import { tambahEntri, getPasien } from "@redux/modules/rekamanMedis/thunks";

const CSS = styled.div`
.sub-header {
  font-weight: bold;
  color: #AEAEAE;
}

form {
  margin: 0 !important;
}
`

function TambahEntri() {
  const dispatch = useDispatch();

  const { query, isReady } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    const { idCabang, nik } = query;
    dispatch(getSchemas({ idCabang }));
    dispatch(getPasien(nik))
  }, [isReady,query, dispatch]);

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
            >
              {({ isValid, isSubmitting, setFieldValue, submitForm }) => (
                <div>
                  <label className="sub-header">Informasi Pasien</label>

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

                  <label className="sub-header">Rekam Medis</label>

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