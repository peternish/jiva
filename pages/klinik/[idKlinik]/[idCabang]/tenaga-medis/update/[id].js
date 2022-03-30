import { useRouter } from 'next/router'

// components
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Layout from '@components/Layout';
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";

// redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getTenagaMedisByID, updateTenagaMedisByID } from "@redux/modules/tenagaMedis/thunks";

function UpdateTenagaMedis() {
  const { query, isReady } = useRouter();
  useEffect(() => {
    if (!isReady) return;
  }, [isReady]);

  const dispatch = useDispatch();
  useEffect(() => {
    const { id } = query;
    dispatch(getTenagaMedisByID({ idTenagaMedis: id }));
  }, [dispatch, query]);
  const { idKlinik, idCabang } = query;

  const { tenagaMedis } = useSelector(state => state.tenagaMedis);

  return (
    <main>
      <Layout title="Update Tenaga Medis">
          {
            tenagaMedis && 
            <Formik
              initialValues={{
                fullName: tenagaMedis.account.full_name,
                email: tenagaMedis.account.email,
              }}
              validate={(values) => {
                const errors = {};
                
                if (!values.fullName) errors.fullName = "Nama lengkap wajib diisi";
                
                return errors;
              }}
              onSubmit={(values) => {
                dispatch(updateTenagaMedisByID({ idKlinik, idCabang, idTenagaMedis: tenagaMedis.account.id, fullName: values.fullName }));
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
                    disabled={true}
                  />

                  <Stack spacing={2} direction="row">
                    <Button href={`/klinik/${idKlinik}/${idCabang}/tenaga-medis/detail/${tenagaMedis.account.id}`} variant="outlined">Batal</Button>
                    <Button variant="contained" type="submit" disabled={!isValid}>Simpan</Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          }
      </Layout>
    </main>
  );
}

export default UpdateTenagaMedis;
