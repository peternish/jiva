// component imports
import Button from "@mui/material/Button";
import Layout from "@components/Layout";
import Box from "@mui/material/Box";
import PenggunaTable from "@components/PengaturanPenggunaComponents/PenggunaTable";
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';

// styles
import CSS from "@components/PengaturanPenggunaComponents/CSS";

import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const { query, isReady } = useRouter();
  useEffect(() => {
    if (!isReady) return;
  }, [isReady]);
  const { idKlinik, idCabang } = query;

  return (
    <Layout navType="sidebar" title="Pengaturan Staf">
      <CSS>
        <Box sx={{ width : '85%'}}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%',
            rowGap: 2,
            my: 2
          }}>
            <Link href={`/klinik/${idKlinik}/${idCabang}/pengaturan-pengguna/tambah`} passHref={true}>
              <Button variant="contained" type="submit" sx={{
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                width: 'min-content'
              }}>
                <AddIcon />
                <Box sx={{ pt: 0.2, pl: 1 }}>
                  Tambah Staf
                </Box>
              </Button>
            </Link>
          </Box>
          <PenggunaTable />
        </Box>
      </CSS>
    </Layout>
  );
};

export default Dashboard;
