import React from "react";
import styled from "styled-components";

// components
import Head from "next/head";

// utils
import constants from "@utils/constants";

const LayoutStyle = styled.div`
  max-width: ${constants.MAX_WIDTH}px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout = ({ children }) => {
  return (
    <LayoutStyle>
      <Head>
        <title></title>
        <meta name="description" content=""/>
        <link rel="icon" href="/logo.ico" />
      </Head>
      {children}
    </LayoutStyle>
  );
};

export default Layout;