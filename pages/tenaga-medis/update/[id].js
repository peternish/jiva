import { useRouter } from 'next/router'

// components
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Layout from '@components/Layout';
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";

// styles
import layoutStyles from '@styles/Layout.module.css';

// redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getTenagaMedisByID } from "@redux/modules/tenagaMedis/thunks";

function UpdateTenagaMedis() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    dispatch(getTenagaMedisByID({ idTenagaMedis: id }));
  }, [router.isReady, dispatch]);
  const { tenagaMedis } = useSelector(state => state.tenagaMedis);

  return (
    <main>
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Update Tenaga Medis</h1>

          {
            tenagaMedis && 
            <Formik
              initialValues={{
                fullName: tenagaMedis.fullName,
                email: tenagaMedis.email,
              }}
              validate={(values) => {
                const errors = {};
                const ERR_MESSAGE = "Input ini wajib diisi";
                ["fullName", "email"].forEach((key) => {
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

                  <Stack spacing={2} direction="row">
                    <Button variant="outlined">Batal</Button>
                    <Button variant="contained" type="submit" disabled={!isValid}>Simpan</Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          }
        </div>
      </Layout>
    </main>
  );
};

export default UpdateTenagaMedis;
