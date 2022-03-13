import { useState } from 'react';

// components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteConfirmationModal from "@components/PengaturanPenggunaComponents/DeleteConfirmationModal"

// redux
import { deletePengaturanPengguna } from "@redux/modules/pengaturanPengguna/thunks";
import { useDispatch } from "react-redux";


function ModifyDropdownMenu({ pengaturanPengguna }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setAnchorEl(null);
    setModalOpen(false);
  };
  
  const handleModalDelete = () => {
    setAnchorEl(null);
    setModalOpen(false);
    dispatch(deletePengaturanPengguna(pengaturanPengguna.id))
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setModalOpen(true);
    console.log("delete:" + pengaturanPengguna.id);
  };

  return (
    <div>
      <IconButton
        data-testid="modify-dropdown-menu"
        id={`more-button-${pengaturanPengguna.id}`}
        aria-controls={open ? `modify-menu-${pengaturanPengguna.id}` : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id={`modify-menu-${pengaturanPengguna.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `more-button-${pengaturanPengguna.id}`,
        }}
      >
        <MenuItem onClick={handleDelete}>Hapus</MenuItem>
      </Menu>

      <DeleteConfirmationModal 
      pengaturanPengguna={pengaturanPengguna} 
      open={modalOpen} 
      handleClose={handleModalClose} 
      handleDelete={handleModalDelete
      }/>
    </div>
  );
};

export default ModifyDropdownMenu;
