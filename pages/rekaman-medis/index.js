import Link from '@mui/material/Link';

// components
import Button from '@mui/material/Button';
import PasienListTable from '@components/RekamMedisComponents/PasienListTable';
import AddIcon from '@mui/icons-material/Add';
import Layout from '@components/Layout';
import Box from "@mui/material/Box";

function PasienList() {
    return (
        <main>
            <Layout title="Daftar Pasien">
                <Box sx={{ width: '85%' }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        width: '100%',
                        rowGap: 2,
                        my: 2
                    }}>
                        <Link href="/rekaman-medis/tambah-pasien" passHref={true}>
                            <Button variant="contained" type="submit" sx={{
                                whiteSpace: 'nowrap',
                                minWidth: 'auto',
                                width: 'min-content'
                            }}>
                                <AddIcon />
                                <Box sx={{ pt: 0.2, pl: 1 }}>
                                    Tambah Pasien
                                </Box>
                            </Button>
                        </Link>
                    </Box>
                    <PasienListTable />
                </Box>
            </Layout>
        </main>
    );
}

export default PasienList;
