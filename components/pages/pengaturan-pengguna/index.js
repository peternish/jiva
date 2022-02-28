import { useState } from "react"

import styled from "styled-components"

// component imports
import Button from "@mui/material/Button"
import styles from '@styles/Home.module.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

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
        <main>
        <h1>Pengaturan Pengguna</h1>

        <PengaturanPenggunaTable />

        <a href="/pengaturan-pengguna/tambah">
          <Button variant="contained" >
            Tambah Pengguna
          </Button>
        </a>
        </main>
  );
};

export default Dashboard;