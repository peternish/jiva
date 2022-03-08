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
            <Stack spacing={2}>
              <TextField 
                fullWidth 
                variant="outlined" 
                label="Nama"
                defaultValue={tenagaMedis.name}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField 
                fullWidth 
                variant="outlined" 
                label="Tempat Tanggal Lahir"
                defaultValue={tenagaMedis.tempatTanggalLahir}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField 
                fullWidth 
                variant="outlined" 
                label="NIK"
                defaultValue={tenagaMedis.nik}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack> 
          }

          <Stack spacing={2} direction="row">
            <Button variant="outlined">Hapus</Button>
            <Button variant="contained">Ubah</Button>
          </Stack>
        </div>
      </Layout>
    </main>
  );
};

export default DetailTenagaMedis;
