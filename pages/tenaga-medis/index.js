import { createTheme } from '@mui/material/styles';

// components
import Button from '@mui/material/Button';
import TenagaMedisTable from '@components/TenagaMedisPageComponents/TenagaMedisTable';

// styles
import styles from '@styles/Home.module.css';
import buttonStyles from '@styles/Button.module.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052D0',
    },
  },
});

function DashboardTenagaMedis() {
  return (
    <main className={styles.container}>
      <h1>Daftar Tenaga Medis</h1>

      <TenagaMedisTable />

      <Button variant="contained" theme={theme} className={buttonStyles.button}>Tambah Tenaga Medis</Button>
    </main>
  );
};

export default DashboardTenagaMedis;
