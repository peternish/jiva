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
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Detil Informasi Tenaga Medis</h1>
          
          {
            tenagaMedis && 
            <Formik 
              initialValues={{
                fullName: tenagaMedis.account.full_name,
                email: tenagaMedis.account.email,
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
                  <Button href={`/klinik/${idKlinik}/${idCabang}/tenaga-medis`}>Kembali</Button>
                  <Button variant="outlined" onClick={handleModalOpen} style={{ color: "#F44336", borderColor: "#F44336" }}>Hapus</Button>
                  <Button href={`/klinik/${idKlinik}/${idCabang}/tenaga-medis/update/${tenagaMedis.account.id}`} variant="contained">Ubah</Button>
                </Stack>

                <DeleteConfirmationModal idKlinik={idKlinik} idCabang={idCabang} tenagaMedis={tenagaMedis} open={modalOpen} handleClose={handleModalClose}/>
              </Form>
            </Formik>
          }
        </div>
      </Layout>
    </main>
  );
}

export default DetailTenagaMedis;
