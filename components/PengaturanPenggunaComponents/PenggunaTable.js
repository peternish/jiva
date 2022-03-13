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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPengaturanPengguna());
  });
  const { penggunaTable } = useSelector(state => state.pengaturanPengguna);

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

        <TableBody>
          {
            penggunaTable && penggunaTable.map((pengaturanPengguna) => (
              <TableRow key={pengaturanPengguna.id} className={tableStyles.row}>
                <TableCell>
                {pengaturanPengguna.full_name}
                </TableCell>
                <TableCell>
                  {pengaturanPengguna.email}
                </TableCell>
                <TableCell>
                  <ModifyDropdownMenu pengaturanPengguna={pengaturanPengguna}/>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PenggunaTable;