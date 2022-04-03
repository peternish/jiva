import { useRouter } from 'next/router';

// components
import Button from '@mui/material/Button';
import TenagaMedisTable from '@components/TenagaMedisPageComponents/TenagaMedisTable';
import Layout from '@components/Layout';
import Box from "@mui/material/Box";

// redux
import { useEffect } from 'react';


function DashboardTenagaMedis() {
  const { query, isReady } = useRouter();

  useEffect(() => {
    if (!isReady) return;
  }, [isReady]);
  
  const { idKlinik, idCabang } = query;

  return (
    <main>
      <Layout title="Daftar Tenaga Medis">
        <Box sx={{ width : '85%'}}>
          <TenagaMedisTable />
          <Button href={`/klinik/${idKlinik}/${idCabang}/tenaga-medis/create`} variant="contained">Tambah Tenaga Medis</Button>
        </Box>
      </Layout>
    </main>
  );
}

export default DashboardTenagaMedis;
