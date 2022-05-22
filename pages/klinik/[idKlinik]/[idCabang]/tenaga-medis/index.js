import { useRouter } from 'next/router';

// components
import Button from '@mui/material/Button';
import TenagaMedisTable from '@components/TenagaMedisPageComponents/TenagaMedisTable';
import Layout from '@components/Layout';
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';

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
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%',
            rowGap: 2,
            my: 2
          }}>
            <Link href={`/klinik/${idKlinik}/${idCabang}/tenaga-medis/create`} passHref={true}>
              <Button variant="contained" type="submit" sx={{
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                width: 'min-content'
              }}>
                <AddIcon />
                <Box sx={{ pt: 0.2, pl: 1 }}>
                  Tambah Tenaga Medis
                </Box>
              </Button>
            </Link>
          </Box>
          <TenagaMedisTable />
        </Box>
      </Layout>
    </main>
  );
}

export default DashboardTenagaMedis;
