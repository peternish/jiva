import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import TodayIcon from '@mui/icons-material/Today';
import ConstructionIcon from '@mui/icons-material/Construction';
import AssignmentIcon from '@mui/icons-material/Assignment';

const drawerWidth = 360;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navItems = [
    {title : 'Pengaturan Formulir Pendaftaran', icon: <AppRegistrationIcon/>, link: ''},
    {title : 'List Pendaftaran', icon: <FormatListBulletedIcon/>, link: ''},
    {divider : <Divider/>},
    {title : 'Pengaturan Klinik', icon: <SettingsIcon/>, link: ''},
    {title : 'Pengaturan Pengguna', icon: <GroupIcon/>, link: ''},
    {divider : <Divider/>},
    {title : 'Pengaturan Jadwal Praktik', icon: <TodayIcon/>, link: ''},
    {divider : <Divider/>},
    {title : 'Pengaturan Formulir Rekaman Medis', icon: <ConstructionIcon/>, link: ''},
    {title : 'Rekaman Medis', icon: <AssignmentIcon/>, link: ''},
  ]

  return (
      <Drawer variant="permanent" open={open} data-testid='sidebar'>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {navItems.map(navItem => (
            navItem.divider ? <Divider/> :
            <ListItem button key={navItem.title}>
              <ListItemIcon> {navItem.icon} </ListItemIcon>
              <ListItemText primary={navItem.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
}
