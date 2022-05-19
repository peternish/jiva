import { useRouter } from 'next/router';

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
import { getListRekamanMedis } from "@redux/modules/rekamanMedis/thunks";


function RekamanMedisTable() {
  const { query, isReady } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReady) return;
    const { nik } = query;
    dispatch(getListRekamanMedis({ nik }));
  }, [isReady, dispatch, query]);

  const { idKlinik, idCabang, nik } = query;
  const { listRekamanMedis } = useSelector(state => state.rekamanMedis);

  return (
    <TableContainer className={styles.container}>
      <Table>
        <TableHead>
          <TableRow className={styles.header}>
            <TableCell>Tanggal</TableCell>
            <TableCell>Dokter</TableCell>
            <TableCell>Rekaman Medis</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            listRekamanMedis && listRekamanMedis.length == 0 ? (
              <TableRow className={styles.row}>
                <TableCell colSpan={3} align='center'>Belum ada Rekaman Medis yang tersimpan</TableCell>
              </TableRow>
            ) : listRekamanMedis && listRekamanMedis.map((rekamanMedis) => (
              <TableRow key={rekamanMedis.id} className={styles.row}>
                <TableCell>{rekamanMedis.time_created}</TableCell>
                <TableCell>{rekamanMedis.author.account.full_name}</TableCell>
                <TableCell>
                  <Link href={`/klinik/${idKlinik}/${idCabang}/rekaman-medis/${nik}/detail/${rekamanMedis.id}`} underline="none" className={styles.link}>Lihat</Link>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RekamanMedisTable;
