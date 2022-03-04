import { useState } from "react";

// component imports
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import TextInput from "@components/common/TextInput";
import CSS from "@components/RegisterPageComponents/CSS";
import Dropzone from "@components/RegisterPageComponents/Dropzone.js";

// redux
import { useDispatch } from "react-redux";
import { signup } from "@redux/modules/auth/thunks";

const Register = () => {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(0);
  const [sikFile, setSikFile] = useState(null);

  const Progress = () => (
    <div className="progress">
      {[0, 1].map((_, idx) => (
        <div
          className={`dot ${pageNum === idx ? "active" : ""}`}
          key={idx}
        ></div>
      ))}
    </div>
  );

  const nextPage = () => setPageNum(pageNum + 1);
  const prevPage = () => setPageNum(pageNum - 1);

  const fields = {
    email: "",
    password: "",
    fullName: "",
    clinicName: "",
  };

  return (
    <CSS>
      <Card id="register-card">
        <Formik
          initialValues={{ ...fields }}
          validate={(values) => {
            const errors = {};
            const ERR_MESSAGE = "Input ini wajib diisi";
            Object.keys(fields).forEach((key) => {
              if (!values[key]) errors[key] = ERR_MESSAGE;
            });
            return errors;
          }}
          onSubmit={(values) => {
            dispatch(signup({ ...values, sikFile }));
          }}
        >
          {({ errors, validateForm, isValid, validateField }) => (
            <Form className="form">
              {pageNum === 0 ? (
                <div className="container">
                  <h1 id="title">Daftar Pemilik Klinik</h1>
                  <div className="input-container">
                    <TextInput
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="jiva@gmail.com"
                      error={errors.email}
                    />
                    <TextInput
                      name="fullName"
                      type="text"
                      label="Nama Lengkap"
                      placeholder="John Doe"
                      error={errors.fullName}
                    />
                    <TextInput
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Password"
                      error={errors.password}
                    />
                  </div>
                  <Progress />
                  <div id="button-container">
                    <Button
                      variant="outlined"
                      onClick={() => location.assign("/")}
                    >
                      Batal
                    </Button>
                    <Button
                      variant="contained"
                      onClick={async () => {
                        const currentErrors = await validateForm();
                        if (
                          !currentErrors.email &&
                          !currentErrors.password &&
                          !currentErrors.fullName
                        ) {
                          nextPage();
                        }
                      }}
                    >
                      Lanjut
                    </Button>
                  </div>
                </div>
              ) : null}

              {pageNum === 1 ? (
                <div className="container">
                  <h1 id="title">Daftar Klinik</h1>
                  <div className="input-container">
                    <TextInput
                      name="clinicName"
                      type="text"
                      label="Nama Klinik"
                      placeholder="Jiva"
                      error={errors.clinicName}
                    />
                    <Dropzone setSikFile={setSikFile} sikFile={sikFile} />
                  </div>
                  <Progress />
                  <div id="button-container">
                    <Button variant="outlined" onClick={prevPage}>
                      Kembali
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={!isValid || !sikFile}
                    >
                      Daftar
                    </Button>
                  </div>
                </div>
              ) : null}
            </Form>
          )}
        </Formik>
      </Card>
    </CSS>
  );
};

export default Register;
