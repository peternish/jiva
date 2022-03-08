
import { createTheme } from '@mui/material/styles';

// components
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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

function UpdateTenagaMedis() {
  return (
    <main className={styles.container} style={{width: "50%"}}>
      <h1>Update Tenaga Medis</h1>

      <Stack spacing={2} style={{marginTop: "2em"}}>
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

      <Stack spacing={2} direction="row" style={{marginTop: "2em"}}>
        <Button variant="outlined" theme={theme} className={buttonStyles.button}>Batal</Button>
        <Button variant="contained" theme={theme} className={buttonStyles.button}>Simpan</Button>
      </Stack>
    </main>
  );
};

export default UpdateTenagaMedis;
