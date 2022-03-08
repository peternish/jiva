// component imports
import Head from "next/head";
import { Formik, Field, Form } from "formik"
import Button from "@mui/material/Button"
import TextInput from "components/common/TextInput"
import Layout from "@components/Layout";
import Container from '@mui/material/Container'

import CSS from "@components/PengaturanPenggunaComponents/CSS";

const TambahForm = () => {
  return (
    <>
      <TextInput
        name="email"
        type="email"
        label="Email"
        placeholder="jiva@goog.com"
      />
      <TextInput
        name="password"
        type="password"
        label="Password"
        placeholder="password"
      />
      <TextInput
        name="input_value"
        type="text"
        label="Input Value"
        placeholder="Input Value"
      />
    </>
  );
};

const fields = {
  email: "",
  password: "",
  input_value: "",
};

const Tambah = () => {

  return (
        <Layout navType="sidebar">
          <CSS>
            <Head>
              <title>Tambah | Pengaturan Pengguna</title>
              <meta name="tambah pengaturan pengguna" content="tambah pengaturan pengguna" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
              <h1>Tambah Pengguna</h1>
              <Formik
                initialValues={{fields}}
                >
                {() => (
                  <Form className="form" role="form">
                    <TambahForm />
                  </Form>
                )}
              </Formik>
              <Button variant="outlined">Batal</Button>
              <Button type="submit" variant="contained" >Simpan</Button>
            </Container>
          </CSS>
        </Layout>
  );
};

export default Tambah;