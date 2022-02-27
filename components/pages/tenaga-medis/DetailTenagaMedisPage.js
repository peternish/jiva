import styles from '@styles/Home.module.css'
import buttonStyles from '@styles/Button.module.css'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { createTheme } from '@mui/material/styles'

const blueTheme = createTheme({
  palette: {
    primary: {
      main: '#0052D0',
    },
  },
})

const redTheme = createTheme({
  palette: {
    primary: {
      main: '#F44336',
    },
  },
})

function DetailTenagaMedisPage() {
  return (
    <main className={styles.container} style={{width: "50%"}}>
      <h1>Detil Informasi Tenaga Medis</h1>

      <Stack spacing={2} style={{marginTop: "2em"}}>
        <TextField 
          fullWidth 
          variant="outlined" 
          label="Nama"
          defaultValue="Budi Budiman"
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField 
          fullWidth 
          variant="outlined" 
          label="Email"
          defaultValue="budi.budiman@email.com"
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField 
          fullWidth 
          variant="outlined" 
          label="Nomor Telepon"
          defaultValue="081234567890"
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField 
          fullWidth 
          variant="outlined" 
          label="Input Field"
          defaultValue="Input Field"
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>

      <Stack spacing={2} direction="row" style={{marginTop: "2em"}}>
        <Button variant="outlined" theme={redTheme} className={buttonStyles.button}>Hapus</Button>
        <Button variant="contained" theme={blueTheme} className={buttonStyles.button}>Ubah</Button>
      </Stack>
    </main>
  )
}

export default DetailTenagaMedisPage
