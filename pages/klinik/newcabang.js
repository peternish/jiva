import styled from "styled-components";
import Link from 'next/link'

// component imports
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

// redux
import { useDispatch } from "react-redux";
import { registerCabang } from "@redux/modules/klinik/thunks";
import Layout from "@components/Layout";

const CSS = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  #title {
    font-size: 3em;
  }

  #card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3em;
    width: max-content;
    box-sizing: border-box;
    height: max-content;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 0.5em;
  }

  #form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0;
    width: 100%;
  }

  button {
    width: 100%;
  }

  #button-container {
    display: flex;
    width: 100%;
    gap: 1em;

    button {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 2em 0;

    #card {
      width: 100%;
    }
  }
`;

const fields = {
  location: "",
};

const NewCabang = () => {
  const dispatch = useDispatch();
  return (
    <Layout navType="topbar">
      <CSS>
        <Card id="card">
          <h1 id="title">Tambah Cabang</h1>
          <Formik
            initialValues={fields}
            validate={(values) => {
              const errors = {};
              const ERR_MESSAGE = "Input ini wajib diisi";
              Object.keys(fields).forEach((key) => {
                if (!values[key]) errors[key] = ERR_MESSAGE;
              });
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              dispatch(registerCabang(values, setSubmitting));
            }}
          >
            {({ isValid, errors, isSubmitting }) => (
              <Form id="form">
                <TextInput
                  name="location"
                  label="Lokasi"
                  placeholder="Alam Sutra"
                  error={errors.location}
                />
                <div id="button-container">
                  <Link href="/klinik" passHref={true}>
                    <Button variant="outlined" sx={{ width: '100%' }}>
                      Kembali
                    </Button>
                  </Link>
                  <LoadingButton 
                    variant="contained"
                    type="submit"
                    disabled={!isValid}
                    loadingPosition="start"
                    loading={isSubmitting}
                  >
                    Buat
                  </LoadingButton >
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </CSS>
    </Layout>
  );
};

export default NewCabang;
