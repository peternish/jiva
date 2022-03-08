// components
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Layout from '@components/Layout';

// styles
import layoutStyles from '@styles/Layout.module.css';

function DetailTenagaMedis() {
  return (
    <main>
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
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
            <Button variant="outlined">Hapus</Button>
            <Button variant="contained">Ubah</Button>
          </Stack>
        </div>
      </Layout>
    </main>
  );
};

export default DetailTenagaMedis;
