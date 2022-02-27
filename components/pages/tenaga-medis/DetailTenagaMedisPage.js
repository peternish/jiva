import styles from '@styles/Home.module.css'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

function DetailTenagaMedisPage() {
  return (
    <main className={styles.container}>
      <h1>Detil Informasi Tenaga Medis</h1>

      <Stack spacing={2} style={{marginTop: "2em", width: "50%",}}>
        <TextField 
          fullWidth 
          variant="outlined" 
          label="Nama"
          defaultValue="Budi Budiman"
        />

        <TextField 
          fullWidth 
          variant="outlined" 
          label="Email"
          defaultValue="budi.budiman@email.com"
        />

        <TextField 
          fullWidth 
          variant="outlined" 
          label="Nomor Telepon"
          defaultValue="081234567890"
        />

        <TextField 
          fullWidth 
          variant="outlined" 
          label="Input Field"
          defaultValue="Input Field"
        />
      </Stack>

      <Button variant="outlined">Hapus</Button>
      <Button variant="contained">Ubah</Button>
    </main>
  )
}

export default DetailTenagaMedisPage
