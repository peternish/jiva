// component imports
import Head from "next/head";
import Button from "@mui/material/Button"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Link from '@mui/material/Link'
import Layout from "@components/Layout";
import Container from '@mui/material/Container'

import CSS from "@components/PengaturanPenggunaComponents/CSS";

const PengaturanPenggunaTable = () => {
  return (
    <>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>No.Telp</TableCell>
            <TableCell>Role</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>Sata Ganaga</TableCell>
            <TableCell>examels@gomail.com</TableCell>
            <TableCell>081234567890</TableCell>
            <TableCell>Moderator</TableCell>
            <TableCell>:</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Sata Ganaga</TableCell>
            <TableCell>examels@gomail.com</TableCell>
            <TableCell>081234567890</TableCell>
            <TableCell>Moderator</TableCell>
            <TableCell>:</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Sata Ganaga</TableCell>
            <TableCell>examels@gomail.com</TableCell>
            <TableCell>081234567890</TableCell>
            <TableCell>Moderator</TableCell>
            <TableCell>:</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

const Dashboard = () => {

  return (
        <Layout navType="sidebar">
          <CSS>
            <Head>
              <title>Pengaturan Pengguna</title>
              <meta name="pengaturan pengguna" content="pengaturan pengguna" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
              <h1>Pengaturan Pengguna</h1>

              <PengaturanPenggunaTable />

              <Link href="/pengaturan-pengguna/tambah">
                <Button variant="contained" >
                  Tambah Pengguna
                </Button>
              </Link>
            </Container>
          </CSS>
        </Layout>
  );
};

export default Dashboard;