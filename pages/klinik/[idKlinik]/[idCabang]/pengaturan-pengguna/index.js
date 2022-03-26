// component imports
import Button from "@mui/material/Button";
import Layout from "@components/Layout";
import Box from "@mui/material/Box";
import PenggunaTable from "@components/PengaturanPenggunaComponents/PenggunaTable";

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
        <Box>
          <PenggunaTable />
          <Button
            href={`/klinik/${idKlinik}/${idCabang}/pengaturan-pengguna/tambah`}
            variant="contained"
            role="button"
          >
            Tambah Staf
          </Button>
        </Box>
      </CSS>
    </Layout>
  );
};

export default Dashboard;
