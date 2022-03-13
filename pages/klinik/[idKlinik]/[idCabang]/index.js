// components
import Layout from '@components/Layout';

// styles
import layoutStyles from '@styles/Layout.module.css';

function IndexCabang() {
  return (
    <main>
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Welcome to Cabang</h1>
        </div>
      </Layout>
    </main>
  );
};

export default IndexCabang;
