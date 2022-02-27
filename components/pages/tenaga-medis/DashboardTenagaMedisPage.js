import Button from '@mui/material/Button'
import TenagaMedisTable from 'components/pages/tenaga-medis/TenagaMedisTable'
import styles from '@styles/Home.module.css'
import buttonStyles from '@styles/Button.module.css'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052D0',
    },
  },
})

function DashboardTenagaMedisPage() {
  return (
    <main className={styles.container}>
      <h1>Daftar Tenaga Medis</h1>

      <TenagaMedisTable />

      <Button variant="contained" theme={theme} className={buttonStyles.button}>Tambah Tenaga Medis</Button>
    </main>
  )
}

export default DashboardTenagaMedisPage
