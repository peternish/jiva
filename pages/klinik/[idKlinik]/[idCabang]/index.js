import { useRouter } from 'next/router';

// components
import Layout from '@components/Layout';
import Button from '@mui/material/Button';

// styles
import layoutStyles from '@styles/Layout.module.css';

// redux
import { useEffect } from 'react';

function IndexCabang() {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady, router.query]);
  const { idKlinik, idCabang } = router.query;
  
  return (
    <main>
      <Layout>
        <div className={layoutStyles.containerWithSidebar}>
          <h1>Welcome to Cabang</h1>

          <Button href={`/klinik/${idKlinik}/${idCabang}/tenaga-medis`}>Tenaga Medis</Button>
        </div>
      </Layout>
    </main>
  );
}

export default IndexCabang;
