import { useRouter } from 'next/router'
import { useState } from 'react';

// components
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Layout from '@components/Layout';
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";
import DeleteConfirmationModal from "@components/TenagaMedisPageComponents/DeleteConfirmationModal"

// styles
import layoutStyles from '@styles/Layout.module.css';

// redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getTenagaMedisByID } from "@redux/modules/tenagaMedis/thunks";

function DetailTenagaMedis() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

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
                  <Button variant="outlined" onClick={handleModalOpen}>Hapus</Button>
                  <Button href={`/tenaga-medis/update/${tenagaMedis.id}`} variant="contained">Ubah</Button>
                </Stack>

                <DeleteConfirmationModal tenagaMedis={tenagaMedis} open={modalOpen} handleClose={handleModalClose}/>
              </Form>
            </Formik>
          }
        </div>
      </Layout>
    </main>
  );
};

export default DetailTenagaMedis;
