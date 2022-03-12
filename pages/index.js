import Head from "next/head";
import Layout from "@components/Layout";
import styled from "styled-components";

import { Button } from "@mui/material";

const CSS = styled.div`
  height: 100%;
  overflow: hidden;
  & {
    width: 100%;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.2em;
  }
`;

const TitleContainer = styled.div`
  color: #000000;
  font-family: "Inter";

  #daftarkan_klinik {
    width: 25em;

    font-style: normal;
    font-weight: bold;
    font-size: 1em;
    line-height: 1.2em;
    display: flex;
    align-items: center;

    padding: 2em;

    color: #ffffff;
  }
`;

const LandingTitle = styled.h1`
  max-width: 10em;
  height: 2em;

  font-style: normal;
  font-weight: black;
  font-size: 2.5em;
  line-height: 1.2em;
  margin-bottom: 1em;
`;

const LandingSubTitle = styled.h1`
  max-width: 14em;
  height: 2em;

  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 1.5em;
  line-height: 1.2em;
  margin-bottom: 3em;
`;

const Row = styled.div`
  display: flex;
  flex: 50%;
  height: 100%;
`;

const Column = styled.div`
  width: 100%;
  :nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    :nth-child(2) {
      display: none;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(
    141.88deg,
    #2f67db 1.55%,
    #0d92e4 38.73%,
    #ffffff 115.74%
  );

  max-height: 100vh;
`;

const Image = styled.img`
  object-fit: contain;
  height: 100vh;
  padding-top: 5em;
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
                Aplikasi penyelamat klinik Anda. 9 dari 10 klinik terpercaya
                merekomendasikan aplikasi ini.
              </LandingSubTitle>
              <Button
                sx={{ width: "10em" }}
                variant="contained"
                id="daftarkan_klinik"
                href="/register"
              >
                Daftarkan Klinik Anda Sekarang
              </Button>
            </TitleContainer>
          </Column>
          <Column>
            <ImageContainer>
              <Image src="/assets/img/landing-illustration.png" alt="" />
            </ImageContainer>
          </Column>
        </Row>
      </CSS>
    </Layout>
  );
}
