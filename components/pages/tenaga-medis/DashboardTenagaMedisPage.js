import Head from 'next/head'
import Button from '@mui/material/Button';
import TenagaMedisTable from 'components/pages/tenaga-medis/TenagaMedisTable'

function DashboardTenagaMedisPage() {
  return (
    <main>
      <h1>Daftar Tenaga Medis</h1>

      <TenagaMedisTable />

      <Button variant="contained">Tambah Tenaga Medis</Button>
    </main>
  )
}

export default DashboardTenagaMedisPage
