import { useState } from 'react';

// components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteConfirmationModal from "@components/PengaturanPenggunaComponents/DeleteConfirmationModal"

// redux
import { useDispatch } from "react-redux";


function ModifyDropdownMenu({ pengaturanPengguna }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setAnchorEl(null);
    setModalOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <IconButton
        data-testid="modify-dropdown-menu"
        id={`more-button-${pengaturanPengguna.account.id}`}
        aria-controls={open ? `modify-menu-${pengaturanPengguna.account.id}` : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id={`modify-menu-${pengaturanPengguna.account.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `more-button-${pengaturanPengguna.account.id}`,
        }}
      >
        <MenuItem onClick={handleDelete}>Hapus</MenuItem>
      </Menu>

      <DeleteConfirmationModal 
      pengaturanPengguna={pengaturanPengguna} 
      open={modalOpen} 
      handleClose={handleModalClose}/>
    </div>
  );
}

export default ModifyDropdownMenu;
