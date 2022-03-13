import React from "react";
import styled from "styled-components";

// components
import Head from "next/head";

// utils
import constants from "@utils/constants";
import Sidebar from "@components/Layout/Sidebar";
import Navbar from "@components/Layout/Navbar";

const LayoutStyle = styled.div`
  max-width: ${constants.MAX_WIDTH}px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children, navType = 'sidebar' }) => {
  return (
    <LayoutStyle>
      <Head>
        <title></title>
        <meta name="description" content=""/>
        <link rel="icon" href="/logo.ico" />
      </Head>
      {navType === 'topbar' ? <Navbar/> : <Sidebar/>}
      {children}
    </LayoutStyle>
  );
};

export default Layout;