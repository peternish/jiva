import styles from '@styles/Home.module.css'
import buttonStyles from '@styles/Button.module.css'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052D0',
    },
  },
})

function DetailTenagaMedisPage() {
  return (
    <main className={styles.container} style={{width: "50%"}}>
      <h1>Tambah Tenaga Medis</h1>

      <Stack spacing={2} style={{marginTop: "2em"}}>
        <TextField 
          fullWidth 
          variant="outlined" 
          label="Nama"
          placeholder="Budi Budiman"
        />

        <TextField 
          fullWidth 
          variant="outlined" 
          label="Email"
          placeholder="budi.budiman@email.com"
        />

        <TextField 
          fullWidth 
          variant="outlined" 
          label="Nomor Telepon"
          placeholder="081234567890"
        />

        <TextField 
          fullWidth 
          variant="outlined" 
          label="Input Field"
          placeholder="Input Field"
        />
      </Stack>

      <Stack spacing={2} direction="row" style={{marginTop: "2em"}}>
        <Button variant="outlined" theme={theme} className={buttonStyles.button}>Batal</Button>
        <Button variant="contained" theme={theme} className={buttonStyles.button}>Tambah</Button>
      </Stack>
    </main>
  )
}

export default DetailTenagaMedisPage
