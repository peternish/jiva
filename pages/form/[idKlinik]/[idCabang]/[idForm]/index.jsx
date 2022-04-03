import styled from "styled-components";
import FormRender from "@components/common/FormRender";
import jivaAPI from "@api/index"
import Layout from "@components/DynamicForm/Layout";
import Card from "@mui/material/Card";

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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { idKlinik, idCabang, idForm } = params
  try {
    const {
      data: { cabang_id, klinik, fields },
    } = await jivaAPI.dynamicForm.fetch({ cabang_id, form_id: idForm })
    return {
      props: {
        idKlinik,
        idCabang,
        namaKlinik: klinik.name,
        fields
      }, revalidate: 30, notFound: false
    }
  } catch (error) {
    console.log(error)
    return { notFound: true }
  }
}

const RegistrationForm = ({ idKlinik, idCabang, namaKlinik, fields }) => {

  return (
    <Layout navType="topbar">
      <CSS>
        <Card id="card">
          <h1 id="title">
            Pendaftaran
            {' '}
            {namaKlinik}
          </h1>
          <FormRender
            schema={fields}
            submit={console.log}
          />
        </Card>
      </CSS>
    </Layout>
  );
};

export default RegistrationForm;
