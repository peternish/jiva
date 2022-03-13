// component imports
import Head from "next/head";
import { Formik, Field, Form } from "formik"
import Button from "@mui/material/Button"
import TextInput from "components/common/TextInput"
import Layout from "@components/Layout";
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack';

import CSS from "@components/PengaturanPenggunaComponents/CSS";

const fields = {
  email: "",
  password: "",
  inputValue: "",
};

const Tambah = () => {

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
                    name="inputValue"
                    type="text"
                    label="Input Value"
                    placeholder="Input Value"
                    error={errors.inputValue}
                  />
                  <Stack spacing={2} direction="row">
                    <Button variant="outlined">Batal</Button>
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