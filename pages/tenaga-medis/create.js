// components
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Layout from '@components/Layout';

// styles
import layoutStyles from '@styles/Layout.module.css';

function CreateTenagaMedis() {
  return (
    <main>
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Tambah Tenaga Medis</h1>

          <Stack spacing={2}>
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

          <Stack spacing={2} direction="row">
            <Button variant="outlined">Batal</Button>
            <Button variant="contained">Tambah</Button>
          </Stack>
        </div>
      </Layout>
    </main>
  );
};

export default CreateTenagaMedis;
