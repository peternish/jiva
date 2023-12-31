// components
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Layout from "@components/Layout";
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";
import { checkValidity } from '@utils/nikParser'

// redux
import { useDispatch } from "react-redux";
import { registerPatient } from "@redux/modules/rekamanMedis/thunks";


function TambahPasien() {
    const pasien = {}
    const dispatch = useDispatch();
    return (
        <main>
            <Layout title="Tambah Pasien">
                <Box sx={{
                    maxWidth: "45vw",
                    paddingTop: '1em'
                }}>
                    {true && (
                        <Formik
                            initialValues={{
                                fullName: pasien.full_name,
                                nik: pasien.nik,
                            }}
                            validate={(values) => {
                                const errors = {};

                                if (!values.fullName) errors.fullName = "Nama lengkap wajib diisi";
                                if (!values.nik) errors.nik = "NIK wajib diisi";
                                else {
                                    if (!checkValidity(values.nik) || isNaN(parseFloat(values.nik))) errors.nik = "NIK tidak valid";
                                }


                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true)
                                dispatch(registerPatient(setSubmitting, { nik: values.nik, full_name: values.fullName }));
                            }}
                        >
                            {({ isValid, errors, isSubmitting }) => (
                                <Form>
                                    <TextInput
                                        name="fullName"
                                        type="text"
                                        label="Nama Lengkap"
                                        placeholder="Budi Budiman"
                                        error={errors.fullName}
                                    />

                                    <TextInput
                                        name="nik"
                                        type="text"
                                        label="NIK"
                                        placeholder="3102010101010001"
                                        error={errors.nik}
                                    />

                                    <LoadingButton
                                        variant="contained"
                                        type="submit"
                                        disabled={!isValid}
                                        loading={isSubmitting}
                                    >
                                        Simpan
                                    </LoadingButton>
                                </Form>
                            )}
                        </Formik>
                    )}
                </Box>
            </Layout>
        </main >
    );
}

export default TambahPasien;
