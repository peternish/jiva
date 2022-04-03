import { useRouter } from 'next/router'

// components
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from "@mui/lab/LoadingButton";
import Layout from '@components/Layout';
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";

// redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getTenagaMedisByID, updateTenagaMedisByID } from "@redux/modules/tenagaMedis/thunks";


function UpdateTenagaMedis() {
  const { query, isReady } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReady) return;
    const { id } = query;
    dispatch(getTenagaMedisByID({ idTenagaMedis: id }));
  }, [isReady, dispatch, query]);

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
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                dispatch(updateTenagaMedisByID({ idKlinik, idCabang, idTenagaMedis: tenagaMedis.account.id, fullName: values.fullName }, setSubmitting));
              }}
            >
              {({ isValid, errors, isSubmitting }) => (
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
                    <LoadingButton 
                      variant="contained" 
                      type="submit" 
                      disabled={!isValid}
                      loading={isSubmitting}
                    >
                      Simpan
                    </LoadingButton>
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
