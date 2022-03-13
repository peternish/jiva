// table
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

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
            <TableCell>No.Telp</TableCell>
            <TableCell>Role</TableCell>
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
                  {pengaturanPengguna.inputValue}
                </TableCell>
                <TableCell>
                  placeholder role
                </TableCell>
                <TableCell>
                  :
                </TableCell>
              </TableRow>
            ))
          }

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
  );
};

export default PenggunaTable;