import styles from '@styles/Home.module.css'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

function DetailTenagaMedisPage() {
  return (
    <main className={styles.container}>
      <h1>Detil Informasi Tenaga Medis</h1>

      <TextField 
        variant="outlined" 
        label="Nama"
        defaultValue="Budi Budiman"
      />

      <TextField 
        variant="outlined" 
        label="Email"
        defaultValue="budi.budiman@email.com"
      />

      <TextField 
        variant="outlined" 
        label="Nomor Telepon"
        defaultValue="081234567890"
      />

      <TextField 
        variant="outlined" 
        label="Input Field"
        defaultValue="Input Field"
      />

      <Button variant="outlined">Hapus</Button>
      <Button variant="contained">Ubah</Button>
    </main>
  )
}

export default DetailTenagaMedisPage
