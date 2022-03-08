import jivaAPI from "@api/index";
import { setTenagaMedisList } from "@redux/modules/tenagaMedis"

const getTenagaMedis = () => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.tenagaMedis.getTenagaMedis
            await dispatch(setTenagaMedisList(data))
        } catch (error) {
            console.log(error);
        }
    }
}

const createTenagaMedis = ({ nomorTelepon }) => {
    return async (dispatch) => {
        try {
            await jivaAPI.tenagaMedis.createTenagaMedis
        } catch (error) {
            console.log(error);
        }
    }
}

export { getTenagaMedis, createTenagaMedis }
