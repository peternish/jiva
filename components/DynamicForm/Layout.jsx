import React from "react";
import Head from "next/head";
import styled from "styled-components";
import constants from "@utils/constants";

const LayoutStyle = styled.div`
  max-width: ${constants.MAX_WIDTH}px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children, title }) => {
  return (
    <LayoutStyle>
      <Head>
        <title>{title || 'Jiva'}</title>
      </Head>
      {children}
    </LayoutStyle>
  );
};

export default Layout;
