import jivaAPI from "@api/index";
import { setTenagaMedis, setTenagaMedisList } from "@redux/modules/tenagaMedis";

const getTenagaMedisByID = ({ idTenagaMedis }) => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.tenagaMedis.getTenagaMedisByID({ idTenagaMedis });
            await dispatch(setTenagaMedis(data[0]));
        } catch (error) {
            console.log(error);
        };
    };
};

const getTenagaMedis = () => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.tenagaMedis.getTenagaMedis();
            await dispatch(setTenagaMedisList(data));
        } catch (error) {
            console.log(error);
        };
    };
};

const createTenagaMedis = ({ nomorTelepon }) => {
    return async (dispatch) => {
        try {
            await jivaAPI.tenagaMedis.createTenagaMedis();
        } catch (error) {
            console.log(error);
        };
    };
};

export { getTenagaMedis, getTenagaMedisByID, createTenagaMedis };
