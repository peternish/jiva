// components
import Layout from "@components/Layout";
import FormBuilder from "@components/common/FormBuilder";
import URLPreview from "@components/common/URLPreview";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { getSchemas, updateSchema } from "@redux/modules/dynamicForm/thunks";
import { findSchema } from "@redux/modules/dynamicForm/selectors";
import constants from "@utils/constants";

const PengaturanFormulirPendaftaran = () => {
  const { query, isReady } = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isReady) return;
    const { idCabang } = query;
    dispatch(getSchemas({ idCabang }));
  }, [isReady, query, dispatch]);

  const schema = useSelector(state => findSchema(state, constants.FORM_TYPES.PATIENT_APPLICATION))

  const saveSchema = async (schema) => {
    dispatch(updateSchema(schema))
  }

  return (
    <Layout navType="sidebar" title='Pengaturan Formulir Pendaftaran'>
      <FormBuilder schema={schema} onSave={saveSchema}>
        <URLPreview URL={'https://jiva.com/pendaftaran/1/2'}/>
      </FormBuilder>
    </Layout>
  );
};

export default PengaturanFormulirPendaftaran;
