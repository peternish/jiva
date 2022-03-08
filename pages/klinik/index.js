import Layout from "@components/Layout";
import { Button, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Card from "@components/KlinikPageComponents/CabangCards";
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
  console.log("cabangList")
  console.log(cabangList)

  return (
    <Layout navType="topbar">

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pt: 20,
        rowGap: 5
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 2
        }}>
          <h1>Cabang Klinik</h1>
          <Link href="/klinik/newcabang" passHref={true}>
            <Button variant="contained" type="submit">
              <AddIcon />
            </Button>
          </Link>
        </Box>

        <Box sx={{
          display: 'inline-flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: '1em',
          flexWrap: 'wrap-reverse',
          maxWidth: '60%',
          alignContent: 'flex-start',
        }}>

          {klinik && cabangList?.map((cabang) => (
            <Card klinik={klinik.name} location={cabang.location} key={cabang.id} />
          ))}

        </Box>
      </Box>
    </Layout>
  )
}
