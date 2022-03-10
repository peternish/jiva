// components
import Button from '@mui/material/Button';
import Layout from '@components/Layout';
import Stack from '@mui/material/Stack';
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";

// styles
import layoutStyles from '@styles/Layout.module.css';

function CreateTenagaMedis() {
  const fields = {
    fullName: "",
    email: "",
    password: "",
  };

  return (
    <main>
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Tambah Tenaga Medis</h1>
          
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

                <Stack spacing={2} direction="row">
                  <Button variant="outlined">Batal</Button>
                  <Button variant="contained" type="submit" disabled={!isValid}>Tambah</Button>
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
