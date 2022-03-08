import Head from "next/head";
import Layout from "@components/Layout";
import styled from "styled-components";

import { Button } from "@mui/material";

const CSS = styled.div`
  &,
  * {
    width: 100%;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.2em;
  }
`;

const TitleContainer = styled.div`
overflow: auto ;
  position: relative;
  left: 15em;
  top: 20em;

  color: #000000;

  #daftarkan_klinik {
    width: 30em ;

    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 1em;
    line-height: 1.2em;
    display: flex;
    align-items: center;

    padding: 2em ;

    color: #FFFFFF;
  }
`;

const LandingTitle = styled.h1`
  max-width: 10em;
    height: 2em;

    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 2.5em;
    line-height: 1.2em;
    margin-bottom: 1em ;
`;

const LandingSubTitle = styled.h1`
  max-width: 14em;
    height: 2em;

    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5em;
    line-height: 1.2em;
    margin-bottom: 3em ;
`

const Row = styled.div`
  display: flex;
  flex: 50%;
`;

const Column = styled.div`
`;

const ImageContainer = styled.div`
  background: 
    linear-gradient(141.88deg, 
      #2F67DB 1.55%, 
      #0D92E4 38.73%, 
      #FFFFFF 115.74%);

  max-height: 100vh ;
`;

const Image = styled.img`
  object-fit: contain ;
  height: 100vh ;
`;


export default function Home() {
  return (
    <Layout navType="topbar">
      <Head>
        <title>Jiva: Halaman Utama</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CSS>
        <Row>
          <Column>
            <TitleContainer>
              <LandingTitle>ERP terpercaya untuk klinik Anda</LandingTitle>
              <LandingSubTitle>
                Aplikasi penyelamat klinik Anda. 9 dari 10 klinik terpercaya merekomendasikan aplikasi ini.
              </LandingSubTitle>
              <Button variant="contained" id="daftarkan_klinik">
                Daftarkan Klinik Anda Sekarang
              </Button>
            </TitleContainer>
          </Column>
          <Column>
            <ImageContainer>
              <Image src="https://files.catbox.moe/ici97p.png"/>
            </ImageContainer>
          </Column>
        </Row>
      </CSS>
    </Layout>
  );
}
