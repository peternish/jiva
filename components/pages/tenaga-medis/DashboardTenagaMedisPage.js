import Button from '@mui/material/Button';
import TenagaMedisTable from 'components/pages/tenaga-medis/TenagaMedisTable'
import styles from '@styles/Home.module.css'

function DashboardTenagaMedisPage() {
  return (
    <main className={styles.container}>
      <h1>Daftar Tenaga Medis</h1>

      <TenagaMedisTable />

      <Button variant="contained">Tambah Tenaga Medis</Button>
    </main>
  )
}

export default DashboardTenagaMedisPage
