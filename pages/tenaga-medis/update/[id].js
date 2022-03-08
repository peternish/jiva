import { useRouter } from 'next/router'

// components
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Layout from '@components/Layout';

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
  }, [router.isReady]);
  const { tenagaMedis } = useSelector(state => state.tenagaMedis);

  return (
    <main>
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Update Tenaga Medis</h1>

          {
            tenagaMedis && 
            <Stack spacing={2}>
              <TextField 
                fullWidth 
                variant="outlined" 
                label="Nama"
                defaultValue={tenagaMedis.name}
              />

              <TextField 
                fullWidth 
                variant="outlined" 
                label="Tempat Tanggal Lahir"
                defaultValue={tenagaMedis.tempatTanggalLahir}
              />

              <TextField 
                fullWidth 
                variant="outlined" 
                label="NIK"
                defaultValue={tenagaMedis.nik}
              />
            </Stack> 
          }
          
          <Stack spacing={2} direction="row">
            <Button variant="outlined">Batal</Button>
            <Button variant="contained">Simpan</Button>
          </Stack>
        </div>
      </Layout>
    </main>
  );
};

export default UpdateTenagaMedis;
