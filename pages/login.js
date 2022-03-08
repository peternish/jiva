import styled from "styled-components";

// component imports
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";
import Button from "@mui/material/Button";

// redux
import { useDispatch } from "react-redux";
import { login } from "@redux/modules/auth/thunks";
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

  @media (max-width: 768px) {
    padding: 2em 0;

    #card {
      width: 100%;
    }
  }
`;

const fields = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  return (
    <Layout navType="topbar">
      <CSS>
        <Card id="card">
          <h1 id="title">Masuk</h1>
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
            onSubmit={(values) => {
              try {
                dispatch(login(values));
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {({ isValid, errors }) => (
              <Form id="form">
                <TextInput
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="jiva@gmail.com"
                  error={errors.email}
                />
                <TextInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="password"
                  error={errors.password}
                />
                <Button variant="contained" type="submit" disabled={!isValid}>
                  Masuk
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </CSS>
    </Layout>
  );
};

export default Login;
