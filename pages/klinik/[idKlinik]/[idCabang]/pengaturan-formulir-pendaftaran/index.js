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
import TextInput from "@components/common/TextInput"
import { Formik, Form } from "formik"
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import FormulirPendaftaranPasien from "@pages/form/[idKlinik]/[idCabang]/[idForm]/formulir-pendaftaran-pasien"

const PengaturanFormulirPendaftaran = () => {
  const { query, isReady } = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isReady) return;
    const { idCabang } = query;
    dispatch(getSchemas({ idCabang }));
  }, [isReady, query, dispatch]);

  const schema = useSelector(state => findSchema(state, constants.FORM_TYPES.PATIENT_APPLICATION))

  const saveSchema = async (newSchema, setSubmitting) => {
    dispatch(updateSchema(newSchema, setSubmitting))
  }

  return isReady && query && schema ? (
    <Layout 
      navType="sidebar" 
      title='Pengaturan Formulir Pendaftaran' 
      TitleComponent={() => (
        <Tooltip title="Pada halaman ini Anda dapat mengatur jenis input yang akan ditampilkan pada formulir pendaftaran pasien.">
          <InfoIcon color="info"/>
        </Tooltip>
      )}>
      <h4>Input Wajib</h4>
      <small>Input ini bersifat wajib dan akan selalu tampil pada formulir pendaftaran pasien</small>
      <Formik>
        {() => <Form style={{ marginTop: "1em" }}>
          <TextInput label="NIK" placeholder="NIK" disabled={true}/>
          <TextInput label="Pilih Tenaga Medis" as="select" disabled={true}>
            <option value="">Pilih Tenaga Medis</option>
          </TextInput>
          <TextInput label="Pilih Jadwal" as="select" disabled={true}>
            <option value="">Pilih Jadwal</option>
          </TextInput>
        </Form>}
      </Formik>
      <Divider sx={{ margin: "1em 0" }}/>
      <h4>Input Tambahan</h4>
      <small style={{ marginBottom: "1em" }}>
        Anda dapat menambahkan input baru pada bagian di bawah ini sesuai yang diperlukan
      </small>
      <FormBuilder schema={schema} onSave={saveSchema} PreviewComponent={() => <FormulirPendaftaranPasien isPreview previewSchema={schema}/>}>
        <URLPreview URL={`${process.env.NEXT_PUBLIC_HOST}/form/${query.idKlinik}/${query.idCabang}/${schema.id}/formulir-pendaftaran-pasien`}/>
      </FormBuilder>
    </Layout>
  ) : null
};

export default PengaturanFormulirPendaftaran;
