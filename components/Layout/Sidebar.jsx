import Link from 'next/link'
import { useState } from 'react';

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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Sidebar() {

    const navItems = [
        {divider : 'Pasien'},
        {title : 'Pengaturan Formulir Pendaftaran', icon: <AppRegistrationIcon/>, link: '#'},
        {title : 'List Pendaftaran', icon: <FormatListBulletedIcon/>, link: '#'},

        {divider : 'Klinik'},
        {title : 'Pengaturan Klinik', icon: <SettingsIcon/>, link: '#'},
        {title : 'Pengaturan Pengguna', icon: <GroupIcon/>, link: '#'},
        
        {divider : 'Tenaga Medis'},
        {title : 'Pengaturan Jadwal Praktik', icon: <TodayIcon/>, link: '#'},
        
        {divider : 'Rekaman Medis'},
        {title : 'Pengaturan Formulir Rekaman Medis', icon: <ConstructionIcon/>, link: '#'},
        {title : 'Rekaman Medis', icon: <AssignmentIcon/>, link: '#'},
    ]

    const [open, setOpen] = useState(false)
    const toggleSidebar = () => {
        setOpen(!open)
    }

  return (
    <nav className={`${styles.sidebar} ${open ? styles.open : ''}`} data-testid="sidebar">
        <div>
            <div className={styles.sidebarHeader} onClick={toggleSidebar}>
                {open ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
            </div>
            <div className={styles.navList}>
                {navItems.map((navItem, index) => (
                    navItem.divider 
                        ? 
                        <div key={index}>
                            <Divider/>
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
                ))}
            </div>
        </div>
        <div className={styles.sidebarFooter}>
            <AccountCircleIcon/>
            Akun
        </div>
    </nav>
  )
}
