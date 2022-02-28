import { useState } from "react";

import styled from "styled-components";

// component imports
import Card from "@mui/material/Card";
import { Formik, Field, Form } from "formik";
import TextInput from "@components/common/TextInput";
import Button from "@mui/material/Button";

const CSS = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #title {
    font-size: 3em;
  }

  #register-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3em;
    width: max-content;
    box-sizing: border-box;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0;
  }

  #button-container {
    display: flex;
    width: 20em;
    gap: 1em;

    button {
      width: 100%;
    }
  }

  #progress {
    display: flex;
    gap: 0.5em;
    margin: 1em 0;

    .dot {
      width: 0.75em;
      height: 0.75em;
      background: #c4c4c4;
      border-radius: 50%;

      &.active {
        background: #0052d0;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 2em 0;

    #register-card {
      width: 100%;
    }
  }
`;

// forms
const CredentialsForm = () => {
  return (
    <>
      <TextInput
        name="email"
        type="email"
        label="Email"
        placeholder="jiva@gmail.com"
      />
      <TextInput
        name="full_name"
        type="text"
        label="Nama Lengkap"
        placeholder="John Doe"
      />
      <TextInput
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
      />
    </>
  );
};

const ClinicForm = () => {
  return (
    <>
      <TextInput
        name="clinic_name"
        type="text"
        label="Nama Klinik"
        placeholder="Jiva"
      />
      <TextInput
        name="sik"
        type="file"
        label="Surat Izin Klinik"
        placeholder="Unggah File"
      />
    </>
  );
};

const PAGE_COUNT = 2;

const Register = () => {
  const [pageNum, setPageNum] = useState(0);

  return (
    <CSS>
      <Card id="register-card">
        <h1 id="title">
          {pageNum === 0 ? "Daftar Pemilik Klinik" : "Daftar Klinik"}
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            full_name: "",
            clinic_name: "",
            sik: "",
          }}
          validate={(values) => {}}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {() => (
            <Form className="form">
              {pageNum === 0 ? <CredentialsForm /> : null}
              {pageNum === PAGE_COUNT - 1 ? <ClinicForm /> : null}
            </Form>
          )}
        </Formik>
        <div id="progress">
          {[...Array(PAGE_COUNT).keys()].map((_, idx) => (
            <div
              className={`dot ${pageNum === idx ? "active" : ""}`}
              key={idx}
            ></div>
          ))}
        </div>
        <div id="button-container">
          <Button
            variant="outlined"
            onClick={() => {
              if (pageNum > 0) setPageNum(pageNum - 1);
            }}
          >
            {pageNum === 0 ? "Batal" : "Kembali"}
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              if (pageNum < PAGE_COUNT - 1) setPageNum(pageNum + 1);
            }}
          >
            {pageNum === PAGE_COUNT - 1 ? "Daftar" : "Lanjut"}
          </Button>
        </div>
      </Card>
    </CSS>
  );
};

export default Register;
