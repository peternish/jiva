import { useState } from 'react';

// components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ModifyDropdownMenu({ id }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    setAnchorEl(null);
    console.log("update:" + id);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    console.log("delete:" + id);
  };
  
  return (
    <div>
      <IconButton
        data-testid="modify-dropdown-menu"
        id={`more-button-${id}`}
        aria-controls={open ? `modify-menu-${id}` : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id={`modify-menu-${id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `more-button-${id}`,
        }}
      >
        <MenuItem onClick={handleUpdate}>Ubah</MenuItem>
        <MenuItem onClick={handleDelete}>Hapus</MenuItem>
      </Menu>
    </div>
  );
};

export default ModifyDropdownMenu;
