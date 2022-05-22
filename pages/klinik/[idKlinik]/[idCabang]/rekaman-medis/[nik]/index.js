import { useRouter } from 'next/router';

// components
import Button from '@mui/material/Button';
import RekamanMedisTable from '@components/RekamanMedisPageComponents/RekamanMedisTable';
import Layout from '@components/Layout';
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';

// redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getPasien } from "@redux/modules/rekamanMedis/thunks";


function DaftarRekamanMedis() {
  const { query, isReady } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReady) return;
    const { nik } = query;
    dispatch(getPasien(nik));
  }, [isReady, dispatch, query]);
  
  const { idKlinik, idCabang, nik } = query;
  const { pasien } = useSelector(state => state.rekamanMedis);

  return (
    <main>
      { pasien && 
        <Layout title={`Daftar Rekaman Medis ${pasien.full_name}`}>
          <Box sx={{ width : '85%'}}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              width: '100%',
              rowGap: 2,
              my: 2
            }}>
              <Link href={`/klinik/${idKlinik}/${idCabang}/rekaman-medis/${nik}/tambah-entri`} passHref={true}>
                <Button variant="contained" type="submit" sx={{
                  whiteSpace: 'nowrap',
                  minWidth: 'auto',
                  width: 'min-content'
                }}>
                  <AddIcon />
                  <Box sx={{ pt: 0.2, pl: 1 }}>
                    Tambah Rekaman Medis
                  </Box>
                </Button>
              </Link>
            </Box>
            <RekamanMedisTable />
          </Box>
        </Layout>
      }
    </main>
  );
}

export default DaftarRekamanMedis;
