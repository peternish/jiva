import { useState } from 'react';

// components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteConfirmationModal from "@components/TenagaMedisPageComponents/DeleteConfirmationModal"

function ModifyDropdownMenu({ tenagaMedis }) {
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

  const handleUpdate = () => {
    setAnchorEl(null);
    console.log("update:" + tenagaMedis.id);
  };

  const handleDelete = () => {
    setModalOpen(true);
    console.log("delete:" + tenagaMedis.id);
  };
  
  return (
    <div>
      <IconButton
        data-testid="modify-dropdown-menu"
        id={`more-button-${tenagaMedis.id}`}
        aria-controls={open ? `modify-menu-${tenagaMedis.id}` : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id={`modify-menu-${tenagaMedis.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `more-button-${tenagaMedis.id}`,
        }}
      >
        <MenuItem onClick={handleUpdate}>Ubah</MenuItem>
        <MenuItem onClick={handleDelete}>Hapus</MenuItem>
      </Menu>

      <DeleteConfirmationModal tenagaMedis={tenagaMedis} open={modalOpen} handleClose={handleModalClose}/>
    </div>
  );
};

export default ModifyDropdownMenu;
