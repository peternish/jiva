import React from "react";
import styled from "styled-components";
import styles from "@styles/Layout.module.css";

// components
import Head from "next/head";

// utils
import constants from "@utils/constants";
import Sidebar from "@components/Layout/Sidebar";
import Navbar from "@components/Layout/Navbar";
import PageHeader from "./PageHeader";

const LayoutStyle = styled.div`
  max-width: ${constants.MAX_WIDTH}px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children, navType = "sidebar", title }) => {
  const classStyle =
    navType === "sidebar" ? styles.sidebarContainer : styles.topbarContainer;
  return (
    <LayoutStyle className={classStyle}>
      <Head>
        <title>{title || 'Jiva'}</title>
      </Head>
      {{
          sidebar: (
            <>
              <Sidebar />
              <PageHeader>{title || "Title"}</PageHeader>
            </>
          ),
          topbar: (
            <Navbar/>
          ),
      }[navType]}
      {children}
    </LayoutStyle>
  );
};

export default Layout;
