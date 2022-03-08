// components
import Button from '@mui/material/Button';
import TenagaMedisTable from '@components/TenagaMedisPageComponents/TenagaMedisTable';
import Layout from '@components/Layout';

// styles
import layoutStyles from '@styles/Layout.module.css';

function DashboardTenagaMedis() {
  return (
    <main>
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Daftar Tenaga Medis</h1>

          <TenagaMedisTable />

          <Button variant="contained">Tambah Tenaga Medis</Button>
        </div>
      </Layout>
    </main>
  );
};

export default DashboardTenagaMedis;
