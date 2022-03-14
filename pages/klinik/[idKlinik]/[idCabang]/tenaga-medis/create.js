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
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Tambah Tenaga Medis</h1>
          
          <Formik
            initialValues={{ ...fields }}
            validate={(values) => {
              const errors = {};
              const ERR_MESSAGE = "Input ini wajib diisi";
              Object.keys(fields).forEach((key) => {
                if (!values[key]) errors[key] = ERR_MESSAGE;
              });
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
        </div>
      </Layout>
    </main>
  );
};

export default CreateTenagaMedis;
