// components
import Layout from "@components/Layout";
import FormBuilder from "@components/common/FormBuilder";

// styles
import layoutStyles from "@styles/Layout.module.css";

const PengaturanFormulirPendaftaran = () => {
  return (
    <Layout navType="sidebar">
      <div className={layoutStyles.containerWithSidebar}>
        <h1>Pengaturan Formulir Pendaftaran</h1>
        <FormBuilder />
      </div>
    </Layout>
  );
};

export default PengaturanFormulirPendaftaran;
