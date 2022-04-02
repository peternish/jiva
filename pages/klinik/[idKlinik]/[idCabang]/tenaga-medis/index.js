import { useRouter } from 'next/router';

// components
import Button from '@mui/material/Button';
import TenagaMedisTable from '@components/TenagaMedisPageComponents/TenagaMedisTable';
import Layout from '@components/Layout';

// styles
import layoutStyles from '@styles/Layout.module.css';

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
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Daftar Tenaga Medis</h1>

          <TenagaMedisTable />

          <Button href={`/klinik/${idKlinik}/${idCabang}/tenaga-medis/create`} variant="contained">Tambah Tenaga Medis</Button>
        </div>
      </Layout>
    </main>
  );
}

export default DashboardTenagaMedis;
