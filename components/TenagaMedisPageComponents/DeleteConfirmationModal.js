// components
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// redux
import { useDispatch } from "react-redux";
import { deleteTenagaMedisByID } from "@redux/modules/tenagaMedis/thunks";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: '#FFFFFF',
  borderRadius: '5px',
  padding: '2em 3em',
};

function DeletionConfirmationModal({ idKlinik, idCabang, tenagaMedis, open, handleClose }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const idTenagaMedis = tenagaMedis.account.id;
    dispatch(deleteTenagaMedisByID({ idKlinik, idCabang, idTenagaMedis }));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" align='center'>
              Konfirmasi Hapus Tenaga Medis
            </Typography>

            <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2 }}>
              Anda akan menghapus <b>{tenagaMedis.account.full_name}</b> dari daftar tenaga medis. Semua data milik <b>{tenagaMedis.account.full_name}</b> akan dihapus dari sistem. Setelah dihapus, Anda tidak dapat membatalkan data tersebut.
            </Typography>

            <Stack spacing={2} direction="row" justifyContent='center' sx={{ mb: 1 }}>
              <Button variant="contained" onClick={handleClose}>Batal</Button>
              <Button variant="outlined" onClick={handleDelete} style={{ color: "#F44336", borderColor: "#F44336" }}>Hapus</Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DeletionConfirmationModal;
