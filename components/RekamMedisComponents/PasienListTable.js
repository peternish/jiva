import { useRouter } from "next/router";

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

// util
import { getKabKot, getDOB } from '@utils/nikParser'

// redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getAllPasien } from "@redux/modules/rekamanMedis/thunks";


function PasienListTable() {
    const dispatch = useDispatch();
    const { query, isReady } = useRouter();
    const { idKlinik, idCabang } = query;

    useEffect(() => {
        if (!isReady) return;
        dispatch(getAllPasien());
    }, [dispatch, isReady]);

    const { pasienList } = useSelector(state => state.rekamanMedis);

    return (
        <TableContainer className={styles.container}>
            <Table>
                <TableHead>
                    <TableRow className={styles.header}>
                        <TableCell>Nama</TableCell>
                        <TableCell>Tempat/Tanggal Lahir</TableCell>
                        <TableCell>NIK</TableCell>
                        <TableCell>Rekaman Medis</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        (pasienList && pasienList.length == 0) ? (
                            <TableRow className={styles.row}>
                                <TableCell colSpan={4} align='center'>Belum ada Pasien yang terdaftar</TableCell>
                            </TableRow>
                        ) : pasienList && pasienList.map((pasien) => (
                            <TableRow key={0} className={styles.row}>
                                <TableCell>{pasien.full_name}</TableCell>
                                <TableCell>{`${getKabKot(pasien.nik)}, ${getDOB(pasien.nik).toLocaleDateString('en-GB')}`}</TableCell>
                                <TableCell>{pasien.nik}</TableCell>
                                <TableCell>
                                    <Link href={`/klinik/${idKlinik}/${idCabang}/rekaman-medis/${pasien.nik}/`} underline="none" className={styles.link}>
                                        <b>
                                            Lihat
                                        </b>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default PasienListTable;
