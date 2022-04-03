import styled from "styled-components";
import { Formik, Form, Fields, Field } from "formik";
import FormRender from "@components/common/FormRender";
import TextInput from "@components/common/TextInput";
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
    return {
      props: {
        namaKlinik: "Kinik Example",
        fields: [
          {
            type: "text",
            required: false,
            label: "Field 1",
            className: "form-control",
            name: "text-1648102772033-0",
            access: false,
            subtype: "text",
          },
          {
            type: "text",
            required: true,
            label: "Field 2",
            className: "form-control",
            name: "text-1648102772980-0",
            access: false,
            subtype: "text",
          },
        ],
      }
    }
    // const {
    //   data: { cabang_id, klinik, fields },
    // } = await jivaAPI.dynamicForm.fetch({ cabang_id, form_id: idForm })
    // return {
    //   props: {
    //     idKlinik,
    //     idCabang,
    //     namaKlinik: klinik.name,
    //     fields
    //   }, revalidate: 30, notFound: false
    // }
  } catch (error) {
    console.log(error)
    return { notFound: true }
  }
}

const RegistrationForm = ({ idKlinik, idCabang, namaKlinik, fields }) => {

  const formFields = [
    {
      type: "text",
      required: false,
      label: "Field 1",
      className: "form-control",
      name: "text-1648102772033-0",
      access: false,
      subtype: "text",
    },
    {
      "type": "select",
      "required": false,
      "label": "Pilih tenaga medis",
      "className": "form-control",
      "name": "select-1648991947973-0",
      "access": false,
      "multiple": false,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1",
          "selected": true
        },
        {
          "label": "Option 2",
          "value": "option-2",
          "selected": false
        },
        {
          "label": "Option 3",
          "value": "option-3",
          "selected": false
        }
      ]
    },
    ...fields
  ]

  const mandatoryFields = {
    nik: "",
    tenaga_medis: "",
    jadwal: "",
  }



  return (
    <Layout navType="topbar">
      <CSS>
        <Card id="card">
          <h1 id="title">
            Pendaftaran
            {' '}
            {namaKlinik}
          </h1>

          <Formik
            initialValues={{ ...mandatoryFields }}
            validate={(values) => {
              const errors = {}
              if (!values.nik) errors.email = "NIK wajib diisi"
              if (!values.tenaga_medis) errors.tenaga_medis = "Tenaga medis wajib dipilih"
              if (!values.jadwal) errors.jadwal = "Jadwal wajib dipilih"
              return errors
            }}
          >
            {({ errors, isSubmitting, submitForm }) => (
              <>
                <Form>
                  <TextInput
                    name="nik"
                    type="text"
                    label="NIK"
                    placeholder="1234567890"
                    error={errors.nik}
                  />
                  <Field as="select">

                  </Field>
                </Form>
                <FormRender
                  schema={fields}
                  submit={console.log}
                />
              </>
            )}

          </Formik>

        </Card>
      </CSS>
    </Layout>
  );
};

export default RegistrationForm;
