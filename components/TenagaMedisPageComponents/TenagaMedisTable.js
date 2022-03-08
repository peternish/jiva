// components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

// styles
import styles from '@styles/Table.module.css';

function TenagaMedisTable() {
  return (
    <TableContainer className={styles.container}>
      <Table>
        <TableHead>
          <TableRow className={styles.header}>
            <TableCell>Nama</TableCell>
            <TableCell>Tempat/Tanggal Lahir</TableCell>
            <TableCell>NIK</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow className={styles.row}>
            <TableCell>Budi Budiman</TableCell>
            <TableCell>Jakarta, 2 Januari 2001</TableCell>
            <TableCell>081234567890</TableCell>
            <TableCell><Link href="/tenaga-medis/detail" underline="none" className={styles.link}>Lihat</Link></TableCell>
          </TableRow>

          <TableRow className={styles.row}>
            <TableCell>Budi Budiman</TableCell>
            <TableCell>Jakarta, 2 Januari 2001</TableCell>
            <TableCell>081234567890</TableCell>
            <TableCell><Link href="/tenaga-medis/detail" underline="none" className={styles.link}>Lihat</Link></TableCell>
          </TableRow>

          <TableRow className={styles.row}>
            <TableCell>Budi Budiman</TableCell>
            <TableCell>Jakarta, 2 Januari 2001</TableCell>
            <TableCell>081234567890</TableCell>
            <TableCell><Link href="/tenaga-medis/detail" underline="none" className={styles.link}>Lihat</Link></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TenagaMedisTable;
