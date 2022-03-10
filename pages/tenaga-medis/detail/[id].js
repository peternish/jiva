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

function DetailTenagaMedis() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    dispatch(getTenagaMedisByID({ idTenagaMedis: id }));
  }, [router.isReady]);
  const { tenagaMedis } = useSelector(state => state.tenagaMedis);
  
  return (
    <main>
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Detil Informasi Tenaga Medis</h1>
          
          {
            tenagaMedis && 
            <Formik 
              initialValues={{
                fullName: tenagaMedis.fullName,
                email: tenagaMedis.email,
              }}
            >
              <Form>
                <TextInput 
                  name="fullName"
                  type="text"
                  label="Nama Lengkap"
                  disabled={true}
                />

                <TextInput 
                  name="email"
                  type="email"
                  label="Email"
                  disabled={true}
                />

                <Stack spacing={2} direction="row">
                  <Button variant="outlined">Hapus</Button>
                  <Button variant="contained">Ubah</Button>
                </Stack>
              </Form>
            </Formik>
          }
        </div>
      </Layout>
    </main>
  );
};

export default DetailTenagaMedis;
