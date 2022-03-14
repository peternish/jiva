import Layout from "@components/Layout";
import { Button, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Card from "@components/KlinikPageComponents/CabangCard";
import Link from 'next/link'
import { getCabang, getKlinik } from "@redux/modules/klinik/thunks"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

export default function Klinik() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCabang())
    dispatch(getKlinik())
  }, [dispatch])

  const { cabangList, klinik } = useSelector(state => state.klinik)

  return (
    <Layout navType="topbar">

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        margin: 'auto',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 5
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%',
            rowGap: 2,
          }}>
            <h1>Cabang Klinik</h1>
            <Link href="/klinik/newcabang" passHref={true}>
              <Button variant="contained" type="submit" sx={{ width: 'min-content' }}>
                <AddIcon />
              </Button>
            </Link>
          </Box>

          <Box sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            columnGap: '1em',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
          }}>

            {klinik && cabangList?.map((cabang) => (
              <Link key={cabang.id} href={`/klinik/${klinik.id}/${cabang.id}`} passHref={true}>
                <a>
                  <Card klinik={klinik.name} location={cabang.location} />
                </a>
              </Link>
            ))}

          </Box>
        </Box>
      </Box>
    </Layout >
  )
}
