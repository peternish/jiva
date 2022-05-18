import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/modules/auth/thunks";

import styles from '@styles/Sidebar.module.css'

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import TodayIcon from '@mui/icons-material/Today';
import ConstructionIcon from '@mui/icons-material/Construction';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from "@mui/material/Divider";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar() {
    const { query, isReady } = useRouter();
    useEffect(() => {
        if (!isReady) return;
    }, [isReady]);
    const { idKlinik, idCabang } = query;
    const dispatch = useDispatch()

    const { profile } = useSelector(state => state.auth)

    const navItems = [
        { divider: 'Pasien', roles: ["owner", "staf", "tenaga_medis"] },
        { title: 'Pengaturan Formulir Pendaftaran', icon: <AppRegistrationIcon />, link: `/klinik/${idKlinik}/${idCabang}/pengaturan-formulir-pendaftaran`, roles: ["owner", "staf"] },
        { title: 'List Pendaftaran', icon: <FormatListBulletedIcon />, link: `/klinik/${idKlinik}/${idCabang}/jadwal-pasien`, roles: ["owner", "staf", "tenaga_medis"] },

        { divider: 'Klinik', roles: ["owner", "staf"] },
        { title: 'Pengaturan Klinik', icon: <SettingsIcon />, link: '#', roles: ["owner", "staf"] },
        { title: 'Pengaturan Staf', icon: <GroupIcon />, link: `/klinik/${idKlinik}/${idCabang}/pengaturan-pengguna`, roles: ["owner"] },

        { divider: 'Tenaga Medis', roles: ["owner", "staf"] },
        { title: 'Pengaturan Jadwal Praktik', icon: <TodayIcon />, link: `/klinik/${idKlinik}/${idCabang}/jadwal-tenaga-medis`, roles: ["owner", "staf"] },
        { title: 'Pengaturan Tenaga Medis', icon: <GroupIcon />, link: `/klinik/${idKlinik}/${idCabang}/tenaga-medis`, roles: ["owner", "staf"] },

        { divider: 'Rekaman Medis', roles: ["tenaga_medis"] },
        { title: 'Pengaturan Formulir Rekaman Medis', icon: <ConstructionIcon />, link: `/klinik/${idKlinik}/${idCabang}/pengaturan-formulir-rekaman-medis`, roles: ["tenaga_medis"] },
        { title: 'Rekaman Medis', icon: <AssignmentIcon />, link: '/rekaman-medis', roles: ["tenaga_medis"] },
    ]

    const [open, setOpen] = useState(false)
    const toggleSidebar = () => {
        setOpen(!open)
    }

    return profile ? (
        <nav className={`${styles.sidebar} ${open ? styles.open : ''}`} data-testid="sidebar">
            <div>
                <div className={styles.sidebarHeader} onClick={toggleSidebar}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </div>
                <div className={styles.navList}>
                    {navItems.map((navItem, index) => navItem.roles.includes(profile.role) ? (
                        navItem.divider
                            ?
                            <div key={index}>
                                <Divider />
                                {open && <div className={styles.listDivider}>{navItem.divider}</div>}
                            </div>
                            :
                            <Link href={navItem.link} key={navItem.title}>
                                <a title={navItem.title}>
                                    <div className={styles.listItem}>
                                        {navItem.icon}
                                        <div className={styles.listItemText}> {navItem.title} </div>
                                    </div>
                                </a>
                            </Link>
                    ) : null)}
                </div>
            </div>
            <Link href="/login">
                <a onClick={dispatch(logout)}>
                    <div className={styles.sidebarFooter}>
                        <LogoutIcon />
                        Logout
                    </div>
                </a>
            </Link>
        </nav>
    ) : null
}
