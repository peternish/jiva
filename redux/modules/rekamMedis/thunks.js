import jivaAPI from "@api/index";
import { toast } from "react-toastify";

const createPasien = ({ nik, fullName }, setSubmitting) => {
    return async () => {
        try {
            await jivaAPI.rekamanMedis.createPasien({ nik, fullName })
            setSubmitting(false)
            window.location.href = '../rekaman-medis'
        } catch (error) {
            setSubmitting(false)
            let errorMessage = "Terjadi kesalahan 😥";
            if (error?.response?.status === 400 && error?.response?.data) {
                const message = error.response.data
                if (message) errorMessage = capitalize(message);
            }
            toast(errorMessage, { type: toast.TYPE.ERROR });
        }
    }
}

export { createPasien };
