import { useRouter } from 'next/router';

// table
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ModifyDropdownMenu from '@components/PengaturanPenggunaComponents/ModifyDropdownMenu';

// styles
import tableStyles from '@styles/Table.module.css';

// redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getPengaturanPengguna } from "@redux/modules/pengaturanPengguna/thunks";

function PenggunaTable() {
  const { query, isReady } = useRouter();
  useEffect(() => {
    if (!isReady) return;
  }, [isReady]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPengaturanPengguna( query ));
  },[dispatch, query]);

  const { penggunaTable } = useSelector(state => state.pengaturanPengguna);

  let tableView = <TableBody>
    {
      penggunaTable && penggunaTable.map((pengaturanPengguna) => (
        <TableRow key={pengaturanPengguna.account.id} className={tableStyles.row}>
          <TableCell>
          {pengaturanPengguna.account.full_name}
          </TableCell>
          <TableCell>
            {pengaturanPengguna.account.email}
          </TableCell>
          <TableCell>
            <ModifyDropdownMenu pengaturanPengguna={pengaturanPengguna}/>
          </TableCell>
        </TableRow>
      ))
    }
  </TableBody>

  if (penggunaTable && penggunaTable.length == 0) {
    tableView = <TableBody>
      {
        <TableRow className={tableStyles.row}>
          <TableCell colSpan={3} align='center'>
            <h2>Belum ada Staf yang terdaftar</h2>
          </TableCell>
        </TableRow>
      }
    </TableBody>
  }

  return (
    <TableContainer className={tableStyles.container}>
      <Table>
        <TableHead>
          <TableRow className={tableStyles.header}>
            <TableCell>Nama</TableCell>
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        {tableView}

      </Table>
    </TableContainer>
  );
}

export default PenggunaTable;