import Layout from "@components/Layout";
import React from "react";
import { createPasien } from "@redux/modules/rekamMedis/thunks";
import { useDispatch } from "react-redux";

// components
import Button from '@mui/material/Button';
import { Formik, Form } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from '@mui/material/Stack';
import TextInput from "@components/common/TextInput";

export default function PasienCreatePage() {
  const disptach = useDispatch()

  const validateFields = (values) => {
    const errors = {};
    
    if (!values.fullName) {
      errors.fullName = "Nama lengkap wajib diisi";
    }

    if (!values.nik) errors.password = "NIK wajib diisi";
    return errors;
  }

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    disptach(createPasien({ ...values }, setSubmitting))
  }

  return (
    <Layout title="Tambah Pasien">
      <Formik 
        initialValues={{ NIK: "", fullName: "",}}
        validate={validateFields}
        onSubmit={handleSubmit}
      >
        {({ isValid, errors, isSubmitting }) => (
          <Form>
            <TextInput
              name="fullName"
              type="text"
              label="Nama Lengkap"
              placeholder="Nama Lengkap"
              error={errors.fullName}
            />

            <TextInput
              name="nik"
              type="number"
              label="NIK"
              placeholder="3276040001112223"
              error={errors.nik}
            />

            <Stack spacing={2} direction="row">
              <Button
                href='/rekaman-medis/'
                variant="outlined"
              >
                Batal
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                disabled={!isValid}
                loading={isSubmitting}
              >
                Tambah
              </LoadingButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};