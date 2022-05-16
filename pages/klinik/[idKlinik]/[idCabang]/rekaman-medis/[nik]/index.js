import { useRouter } from 'next/router';

// components
import Button from '@mui/material/Button';
import RekamanMedisTable from '@components/RekamanMedisPageComponents/RekamanMedisTable';
import Layout from '@components/Layout';
import Box from "@mui/material/Box";

// redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getPasien } from "@redux/modules/rekamanMedis/thunks";


function DaftarRekamanMedis() {
  const { query, isReady } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReady) return;
    const { nik } = query;
    dispatch(getPasien(nik));
  }, [isReady, dispatch, query]);
  
  const { idKlinik, idCabang, nik } = query;
  const { pasien } = useSelector(state => state.rekamanMedis);

  return (
    <main>
      <Layout title={`Daftar Rekaman Medis ${pasien.full_name}`}>
        <Box sx={{ width : '85%'}}>
          <RekamanMedisTable />
          <Button href={`/klinik/${idKlinik}/${idCabang}/rekaman-medis/${nik}/tambah-entri`} variant="contained">Tambah Rekaman Medis</Button>
        </Box>
      </Layout>
    </main>
  );
}

export default DaftarRekamanMedis;
