import { useRouter } from "next/router";
import { useState } from "react";

// components
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Layout from "@components/Layout";
import { Formik, Form } from "formik";
import TextInput from "@components/common/TextInput";
import { isValid } from '@utils/nikParser'

import DeleteConfirmationModal from "@components/TenagaMedisPageComponents/DeleteConfirmationModal";

// redux
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTenagaMedisByID } from "@redux/modules/tenagaMedis/thunks";
import { registerPatient } from "@redux/modules/rekamanMedis/thunks";


function DetailTenagaMedis() {
    const pasien = {}
    const dispatch = useDispatch();
    return (
        <main>
            <Layout title="Tambah Pasien">
                <Box sx={{
                    maxWidth: "45vw"
                }}>
                    <Box sx={{
                        marginTop: 2,
                        marginBottom: 2,
                        color: "#AEAEAE"
                    }}>
                        <h4>Informasi Pasien</h4>
                    </Box>
                    {true && (
                        <Formik
                            initialValues={{
                                full_name: pasien.full_name,
                                nik: pasien.nik,
                            }}
                            validate={(values) => {
                                const errors = {};

                                if (!values.fullName) errors.fullName = "Nama lengkap wajib diisi";
                                if (!values.nik) errors.nik = "NIK wajib diisi";
                                else {
                                    if (!isValid(values.nik) || isNaN(parseFloat(str))) errors.nik = "NIK tidak valid";
                                }


                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true)
                                dispatch(registerPatient({ nik: values.nik, full_name: values.fullName }, setSubmitting));
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

export default DetailTenagaMedis;
