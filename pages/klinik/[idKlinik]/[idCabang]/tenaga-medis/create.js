import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import Button from '@mui/material/Button';
import Layout from '@components/Layout';
import Stack from '@mui/material/Stack';
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";
import Dropzone from '@components/TenagaMedisPageComponents/Dropzone';

// styles
import layoutStyles from '@styles/Layout.module.css';

// redux
import { useDispatch } from "react-redux";
import { createTenagaMedis as createTenagaMedisHelper } from "@redux/modules/tenagaMedis/thunks";
import { useEffect } from 'react';

function CreateTenagaMedis() {
  const dispatch = useDispatch();
  const [sipFile, setSipFile] = useState(null);

  const { query, isReady } = useRouter();
  useEffect(() => {
    if (!isReady) return;
  }, [isReady]);
  const { idKlinik, idCabang } = query;

  const fields = {
    email: "",
    password: "",
    fullName: "",
  };

  return (
    <main>
      <Layout title="Tambah Tenaga Medis">
          <Formik
            initialValues={{ ...fields }}
            validate={(values) => {
              const errors = {};
              
              if (!values.email) {
                errors.email = "Email wajib diisi";
              } else if (!/.+@.+\..+/.test(values.email)) {
                errors.email = "Masukkan email yang valid";
              }

              if (!values.password) errors.password = "Password wajib diisi";
              if (!values.fullName) errors.fullName = "Nama lengkap wajib diisi";
              
              return errors;
            }}
            onSubmit={(values) => {
              dispatch(createTenagaMedisHelper({ idKlinik, idCabang, ...values, sipFile }));
            }}
          >
            {({ isValid, errors }) => (
              <Form>
                <TextInput 
                  name="fullName"
                  type="text"
                  label="Nama Lengkap"
                  placeholder="dr. Budi Budiman, Sp.A."
                  error={errors.fullName}
                />

                <TextInput 
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="budi.budiman@email.com"
                  error={errors.email}
                />

                <TextInput 
                  name="password"
                  type="password"
                  label="Password"
                  placeholder=""
                  error={errors.password}
                />

                <Dropzone setSipFile={setSipFile} sipFile={sipFile} />

                <Stack spacing={2} direction="row">
                  <Button href={`/klinik/${idKlinik}/${idCabang}/tenaga-medis`} variant="outlined">Batal</Button>
                  <Button variant="contained" type="submit" disabled={!isValid || !sipFile }>Tambah</Button>
                </Stack>
              </Form>
            )}
          </Formik>
      </Layout>
    </main>
  );
}

export default CreateTenagaMedis;
