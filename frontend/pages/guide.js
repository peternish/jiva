// components
import Layout from '@components/Layout';
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-grow: 1;
  padding-top: 5%;

  hr {
    padding: 1rem 0;
    border: 0;
    border-bottom: 1px solid #F8F8FA;
  }

  section {
    padding-top: 5rem;
  }
`;

const Nav = styled.aside`
  flex-basis: 20%;
  font-weight: 200;
  ul {
    list-style: none;
    padding-left: 0;
    line-height: 1.8;
    position: fixed;
    top: 4rem;
  }
  ul.fixed {
    position: fixed;
    top: 30rem;
  }
  li:hover {
    color: #1d7ae2;
    cursor: pointer;
    transition: color .3s ease-in-out;
  }
  .selected {
    color: #888888;
    position: relative;
  }
  .selected:after {
    position: absolute;
    content: "";
    width: 1rem;
    height: 1rem;
    background-color: #999999;
    left: -1.5rem;
    top: 0.3rem;
  }
`;

const Content = styled.div`
  flex-basis: 80%;
  padding: 0 0 5rem 1rem;
`;



export default function Guide() {
  return (
    <Layout navType="topbar" title="Guide">
      <Wrapper>

        <Nav className="doc__nav">
          <ul>
            <li><Link href="/guide#daftar">Daftar</Link></li>
            <li><Link href="/guide#masuk">Masuk</Link></li>
            <li><Link href="/guide#cabang-klinik">Cabang Klinik</Link></li>
            <li><Link href="/guide#formulir-pendaftaran">Pengaturan Formulir Pendaftaran</Link></li>
            <li><Link href="/guide#pendaftaran">List Pendaftaran</Link></li>
            <li><Link href="/guide#klinik">Pengaturan Klinik</Link></li>
            <li><Link href="/guide#staf">Pengaturan Staf</Link></li>
            <li><Link href="/guide#jadwal-praktik">Pengaturan Jadwal Praktik</Link></li>
            <li><Link href="/guide#tenaga-medis">Pengaturan Tenaga Medis</Link></li>
          </ul>
        </Nav>

        <Content>
          <h1>Petunjuk Penggunaan (WIP)</h1>

          <section id="daftar">
            <h3>Daftar</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <hr></hr>
          </section>

          <section id="masuk">
            <h3>Masuk</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <hr></hr>
          </section>

          <section id="cabang-klinik">
            <h3>Cabang Klinik</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <hr></hr>
          </section>

          <section id="formulir-pendaftaran">
            <h3>Pengaturan Formulir Pendaftaran</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <hr></hr>
          </section>
          <section id="pendaftaran">
            <h3>List Pendaftaran</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <hr></hr>
          </section>

          <section id="klinik">
            <h3>Pengaturan Klinik</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <hr></hr>
          </section>

          <section id="staf">
            <h3>Pengaturan Staf</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <hr></hr>
          </section>

          <section id="jadwal-praktik">
            <h3>Pengaturan Jadwal Praktik</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <hr></hr>
          </section>

          <section id="tenaga-medis">
            <h3>Pengaturan Tenaga Medis</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <hr></hr>
          </section>
        </Content>
      </Wrapper>
    </Layout>
  );
}
