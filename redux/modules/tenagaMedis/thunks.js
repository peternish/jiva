import jivaAPI from "@api/index";
import { setTenagaMedis, setTenagaMedisList } from "@redux/modules/tenagaMedis";

const getTenagaMedisByID = ({ idTenagaMedis }) => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.tenagaMedis.getTenagaMedisByID({ idTenagaMedis });
            await dispatch(setTenagaMedis(data));
        } catch (error) {
            console.log(error);
        };
    };
};

const getTenagaMedis = ({ idCabang }) => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.tenagaMedis.getTenagaMedis({ idCabang });
            await dispatch(setTenagaMedisList(data));
        } catch (error) {
            console.log(error);
        };
    };
};

const updateTenagaMedisByID = ({ idKlinik, idCabang, idTenagaMedis, fullName }) => {
    return async (dispatch) => {
        try {
            await jivaAPI.tenagaMedis.updateTenagaMedisByID({ idTenagaMedis, fullName });
            window.location.assign(`/klinik/${idKlinik}/${idCabang}/tenaga-medis`);
        } catch (error) {
            console.log(error);
        };
    };
};

const createTenagaMedis = ({ idKlinik, idCabang, email, password, fullName, sipFile }) => {
    return async (dispatch) => {
        try {
            await jivaAPI.tenagaMedis.createTenagaMedis({ idCabang, email, password, fullName, sipFile });
            window.location.assign(`/klinik/${idKlinik}/${idCabang}/tenaga-medis`);
        } catch (error) {
            console.log(error);
        };
    };
};

const deleteTenagaMedisByID = ({ idKlinik, idCabang, idTenagaMedis }) => {
    return async (dispatch) => {
        try {
            await jivaAPI.tenagaMedis.deleteTenagaMedisByID({ idTenagaMedis });
            window.location.assign(`/klinik/${idKlinik}/${idCabang}/tenaga-medis`);
        } catch {
            console.log(error);
        };
    };
};

export { getTenagaMedis, getTenagaMedisByID, updateTenagaMedisByID, createTenagaMedis, deleteTenagaMedisByID };
