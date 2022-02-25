import Head from 'next/head'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained">Tambah Tenaga Medis</Button>
    </main>
  )
}

export default DashboardTenagaMedisPage
