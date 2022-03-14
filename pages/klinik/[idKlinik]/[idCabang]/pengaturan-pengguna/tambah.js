// component imports
import Head from "next/head";
import { Formik, Form } from "formik"
import Button from "@mui/material/Button"
import TextInput from "components/common/TextInput"
import Layout from "@components/Layout";
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack';
import Router from 'next/router'

import CSS from "@components/PengaturanPenggunaComponents/CSS";

import { useDispatch } from "react-redux";
import { createPengaturanPengguna } from "@redux/modules/pengaturanPengguna/thunks";



const Tambah = () => {
  const dispatch = useDispatch();
  const fields = {
    email: "",
    password: "",
    full_name: "",
  };

  return (
        <Layout navType="sidebar">
          <CSS>
            <Head>
              <title>Tambah | Pengaturan Staf</title>
              <meta name="tambah pengaturan Staf" content="tambah pengaturan Staf" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container /*className={layoutStyles.containerWithSidebar}*/>
              <h1>Tambah Staf</h1>
              <Formik
                initialValues={fields}
                validate={(values) => {
                  const errors = {};
                  const ERR_MESSAGE = "Input ini wajib diisi";
                  Object.keys(fields).forEach((key) => {
                    if (!values[key]) errors[key] = ERR_MESSAGE;
                  });
                  return errors;
                }}
                onSubmit={(values) => {
                  try {
                    console.log(values);
                    dispatch(createPengaturanPengguna({ ...values }))
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                {({ isValid, errors }) => (
                <Form>
                  <TextInput
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="jiva@goog.com"
                    error={errors.email}
                  />
                  <TextInput
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="password"
                    error={errors.password}
                  />
                  <TextInput
                    name="full_name"
                    type="text"
                    label="Full Name"
                    placeholder="Satudua Tiga"
                    error={errors.full_name}
                  />
                  <Stack spacing={2} direction="row">
                    <Button variant="outlined" onClick={() => Router.back()}>Batal</Button>
                    <Button variant="contained" type="submit" disabled={!isValid}>Simpan</Button>
                  </Stack>
                </Form>
                )}
              </Formik>
            </Container>
          </CSS>
        </Layout>
  );
};

export default Tambah;