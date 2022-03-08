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

// redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getTenagaMedis } from "@redux/modules/tenagaMedis/thunks";

function TenagaMedisTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTenagaMedis());
  });
  const { tenagaMedisList } = useSelector(state => state.tenagaMedis);

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
          {
            tenagaMedisList && tenagaMedisList.map((tenagaMedis) => (
              <TableRow key={tenagaMedis.id} className={styles.row}>
                <TableCell>{tenagaMedis.name}</TableCell>
                <TableCell>{tenagaMedis.tempatTanggalLahir}</TableCell>
                <TableCell>{tenagaMedis.nik}</TableCell>
                <TableCell><Link href={`/tenaga-medis/detail/${tenagaMedis.id}`} underline="none" className={styles.link}>Lihat</Link></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TenagaMedisTable;
