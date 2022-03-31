import jivaAPI from "@api/index";
import { setTenagaMedis, setTenagaMedisList } from "@redux/modules/tenagaMedis";
import { toast } from "react-toastify";
import { capitalize } from "@utils/index";

const getTenagaMedisByID = ({ idTenagaMedis }) => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.tenagaMedis.getTenagaMedisByID({ idTenagaMedis });
            await dispatch(setTenagaMedis(data));
        } catch (error) {
            console.log(error);
        }
    };
};

const getTenagaMedis = ({ idCabang }) => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.tenagaMedis.getTenagaMedis({ idCabang });
            await dispatch(setTenagaMedisList(data));
        } catch (error) {
            console.log(error);
        }
    };
};

const updateTenagaMedisByID = ({ idKlinik, idCabang, idTenagaMedis, fullName }, setSubmitting) => {
    return async (dispatch) => {
        try {
            await jivaAPI.tenagaMedis.updateTenagaMedisByID({ idTenagaMedis, fullName });
            window.location.assign(`/klinik/${idKlinik}/${idCabang}/tenaga-medis`);
        } catch (error) {
            setSubmitting(false)
            console.log(error);
        }
    };
};

const createTenagaMedis = ({ idKlinik, idCabang, email, password, fullName, sipFile }, setSubmitting) => {
    return async (dispatch) => {
        try {
            await jivaAPI.tenagaMedis.createTenagaMedis({ idCabang, email, password, fullName, sipFile });
            window.location.assign(`/klinik/${idKlinik}/${idCabang}/tenaga-medis`);
        } catch (error) {
            setSubmitting(false)
            let errorMessage = "Terjadi kesalahan 😥";
            if (error?.response?.status === 400 && error?.response?.data) {
                const message = error.response.data?.account?.email[0];
                if (message) errorMessage = capitalize(message);
            }
            toast(errorMessage, { type: toast.TYPE.ERROR });
        }
    };
};

const deleteTenagaMedisByID = ({ idKlinik, idCabang, idTenagaMedis }) => {
    return async (dispatch) => {
        try {
            await jivaAPI.tenagaMedis.deleteTenagaMedisByID({ idTenagaMedis });
            window.location.assign(`/klinik/${idKlinik}/${idCabang}/tenaga-medis`);
        } catch {
            console.log(error);
        }
    };
};

export { getTenagaMedis, getTenagaMedisByID, updateTenagaMedisByID, createTenagaMedis, deleteTenagaMedisByID };
