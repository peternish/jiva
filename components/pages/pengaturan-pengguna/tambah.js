import { useState } from "react"

import styled from "styled-components"

// component imports
import { Formik, Field, Form } from "formik"
import Button from "@mui/material/Button"

const TambahForm = () => {
  return (
    <>
    </>
  );
};

const Tambah = () => {

  return (
    <main>
    <h1>Pengaturan Pengguna</h1>
    <Formik
      initialValues={{
        email: "",
        password: "",
        input_value: "",
      }}
      validate={(values) => {}}
      onSubmit={(values, { setSubmitting }) => {}}
    >
      {() => (
        <Form className="form">
          <TambahForm />
        </Form>
      )}
    </Formik>
    

    <Button variant="outlined">Batal</Button>
    <Button type="submit" variant="contained" >Simpan</Button>
    </main>
  );
};

export default Tambah;