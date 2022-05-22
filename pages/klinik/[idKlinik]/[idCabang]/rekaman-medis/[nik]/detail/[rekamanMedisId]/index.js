import { useRouter } from 'next/router';

// components
import styled from "styled-components";
import Layout from '@components/Layout';
import Box from "@mui/material/Box";
import constants from "@utils/constants";


// redux
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from 'react';
import { getPasien } from "@redux/modules/rekamanMedis/thunks";
import { getListRekamanMedis } from "@redux/modules/rekamanMedis/thunks";


function DetailRekamanMedis() {
  const { query, isReady } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReady) return;
    const { nik } = query;
    dispatch(getPasien(nik));
  }, [isReady, dispatch, query]);
    
  const { pasien } = useSelector(state => state.rekamanMedis);

  useEffect(() => {
    if (!isReady) return;
    const { nik } = query;
    dispatch(getListRekamanMedis({ nik }));
  }, [isReady, dispatch, query]);

  const { rekamanMedisId } = query;
  const { listRekamanMedis } = useSelector(state => state.rekamanMedis);

  const [rekamanDetail, setRekamanDetail] = useState({});

  const [signal, setSignal] = useState(false)

  const getRekamMedisById = useCallback((rekamanMedisId) => {
    if(listRekamanMedis) {
      listRekamanMedis.map((rekam) => {
        const idRekam = rekam.id
        if(idRekam == rekamanMedisId) {
          setRekamanDetail(rekam)
          setSignal(true)
        }
      })
    }
  }, [listRekamanMedis])
  

  useEffect(() => {
    getRekamMedisById(rekamanMedisId)
  }, [getRekamMedisById, rekamanMedisId])

  const CSS = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-top: 0.8em;
    margin-bottom: 0.8em;
  }

  #info {
    color: gray;
  }

  #detail {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    padding: 1em 0.75em;
    margin-bottom: 1em;
    box-shadow: ${(props) =>
      props.isError ? `0px 0px 2px ${constants.COLORS.ERROR}` : "none"};
    border: 1px solid
      ${(props) => (props.isError ? constants.COLORS.ERROR : "rgba(0, 0, 0, 0.23)")};
    
    background: #FFFFFF;
    box-sizing: border-box;
    border-radius: 4px;

    &, * {
      font-family: "Roboto";
    }
  }
`;

  return (listRekamanMedis && rekamanDetail && pasien && signal)? (
    <main>
      { pasien && 
        <Layout title={`Entri Rekaman Medis ${rekamanDetail.time_created} untuk ${pasien.full_name}`}>
          <Box sx={{ width : '85%'}}>
            <CSS>
              <label id='info'>Informasi Pasien</label>
              <label>Nama Lengkap</label>
              <input type="text" readOnly value={pasien.full_name}></input>
              <label>NIK</label>
              <input type="number" readOnly value={pasien.nik}></input>
              <label id='info'>Rekaman Medis</label>
              {Object.keys(rekamanDetail.fields).map((key) => 
                <div key={key} id="detail">
                  <label>{rekamanDetail.fields[key].label}</label> 
                  <input type={rekamanDetail.fields[key].type} value={rekamanDetail.fields[key].value} readOnly></input>
                </div>)}
            </CSS>
          </Box>
        </Layout>
      }
    </main>
  ): null
}

export default DetailRekamanMedis;
