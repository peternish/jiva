// components
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Layout from '@components/Layout';

// styles
import layoutStyles from '@styles/Layout.module.css';

function UpdateTenagaMedis() {
  return (
    <main>
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
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
            <Button variant="outlined">Batal</Button>
            <Button variant="contained">Simpan</Button>
          </Stack>
        </div>
      </Layout>
    </main>
  );
};

export default UpdateTenagaMedis;
