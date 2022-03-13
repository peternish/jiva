// component imports
import Head from "next/head";
import Button from "@mui/material/Button";
import Layout from "@components/Layout";
import Container from '@mui/material/Container';
import PenggunaTable from "@components/PengaturanPenggunaComponents/PenggunaTable";

// styles
import CSS from "@components/PengaturanPenggunaComponents/CSS";

import { Provider } from "react-redux";
import { store } from "@redux/store";

const Dashboard = () => {

  return (
        <Layout navType="sidebar">
          <CSS>
            <Head>
              <title>Pengaturan Staf</title>
              <meta name="pengaturan pengguna" content="pengaturan pengguna" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container /*className={layoutStyles.containerWithSidebar}*/>
              <h1>Pengaturan Staf</h1>
              
                <PenggunaTable />

              <Button href="/pengaturan-pengguna/tambah" variant="contained" role="button">
                Tambah Staf
              </Button>
            </Container>
          </CSS>
        </Layout>
  );
};

export default Dashboard;