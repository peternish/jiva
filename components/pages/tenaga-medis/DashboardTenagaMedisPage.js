import Head from 'next/head'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

function DashboardTenagaMedisPage() {
  return (
    <main>
      <h1>Daftar Tenaga Medis</h1>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>Tempat/Tanggal Lahir</TableCell>
              <TableCell>NIK</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>Budi Budiman</TableCell>
              <TableCell>Jakarta, 2 Januari 2001</TableCell>
              <TableCell>081234567890</TableCell>
              <TableCell><Link href="#">Lihat</Link></TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Budi Budiman</TableCell>
              <TableCell>Jakarta, 2 Januari 2001</TableCell>
              <TableCell>081234567890</TableCell>
              <TableCell><Link href="#">Lihat</Link></TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Budi Budiman</TableCell>
              <TableCell>Jakarta, 2 Januari 2001</TableCell>
              <TableCell>081234567890</TableCell>
              <TableCell><Link href="#">Lihat</Link></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained">Tambah Tenaga Medis</Button>
    </main>
  )
}

export default DashboardTenagaMedisPage
