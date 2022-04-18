import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { getSchemas, updateSchema } from "@redux/modules/dynamicForm/thunks";
import { findSchema } from "@redux/modules/dynamicForm/selectors";
import constants from "@utils/constants";

// components
import Layout from "@components/Layout";
import FormBuilder from "@components/common/FormBuilder";
import FormRender from "@components/common/FormRender";

// MUI Imports
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';


export default function PengaturanFormulirRekamanMedis() {
  const { query, isReady } = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isReady) return;
    const { idCabang } = query;
    dispatch(getSchemas({ idCabang }));
  }, [isReady,query, dispatch]);

  const saveSchema = async (newSchema, setSubmitting) => {
    dispatch(updateSchema(newSchema, setSubmitting))
  }

  const schema = useSelector(state => findSchema(state, constants.FORM_TYPES.HEALTH_RECORD))
  

  return isReady && query && schema ? (
    <Layout
      title="Pengaturan Formulir Rekaman Medis"
      TitleComponent={() => (
        <Tooltip title="Pada halaman ini Anda dapat mengatur jenis input yang akan ditampilkan pada formulir pembuatan rekaman medis">
          <InfoIcon color="info" />
        </Tooltip>
      )}
    >
      <FormBuilder 
        onSave={saveSchema}
        schema={schema} 
        PreviewComponent={() => <FormRender schema={schema.fields} submit={() => {}}/>}
      />
    </Layout>
  ) : null;
}
