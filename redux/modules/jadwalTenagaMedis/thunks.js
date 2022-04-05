import jivaAPI from "@api/index";
import { setJadwalTenagaMedisList, setJadwalTenagaMedis } from "@redux/modules/jadwalTenagaMedis";
import { toast } from "react-toastify";
import constants from "@utils/constants"

const getJadwalTenagaMedisList = ({ idCabang }) => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.jadwalTenagaMedis.getJadwalTenagaMedisList({ idCabang });
            await dispatch(setJadwalTenagaMedisList(data));
        } catch (error) {
            toast(constants.BASE_ERROR_MESSAGE, { type: toast.TYPE.ERROR });
        }
    };
};

const getJadwalTenagaMedis = ({ idJadwal }) => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.jadwalTenagaMedis.getJadwalTenagaMedis({ idJadwal });
            await dispatch(setJadwalTenagaMedis(data));
        } catch (error) {
            toast(constants.BASE_ERROR_MESSAGE, { type: toast.TYPE.ERROR });
        }
    };
};

const createJadwalTenagaMedis = ({ idTenagaMedis, startTime, endTime, quota, day }) => {
    return async (dispatch) => {
        try {
            await jivaAPI.jadwalTenagaMedis.createJadwalTenagaMedis({ idTenagaMedis, startTime, endTime, quota, day });
        } catch(error) {
            toast(constants.BASE_ERROR_MESSAGE, { type: toast.TYPE.ERROR });
        }
    }
}

const deleteJadwalTenagaMedis = ({ idJadwal, idCabang }) => {
    return async (dispatch) => {
        try {
            await jivaAPI.jadwalTenagaMedis.deleteJadwalTenagaMedis({ idJadwal });
            dispatch(getJadwalTenagaMedisList({ idCabang }))
        } catch(error) {
            toast(constants.BASE_ERROR_MESSAGE, { type: toast.TYPE.ERROR });
        }
    }
}

const updateJadwalTenagaMedis = ({ idJadwal, startTime, endTime, quota, day }) => {
    return async (dispatch) => {
        try {
            await jivaAPI.jadwalTenagaMedis.updateJadwalTenagaMedis({ idJadwal, startTime, endTime, quota, day });
        } catch(error) {
            toast(constants.BASE_ERROR_MESSAGE, { type: toast.TYPE.ERROR });
        }
    }
}



export { getJadwalTenagaMedisList, getJadwalTenagaMedis, createJadwalTenagaMedis, deleteJadwalTenagaMedis, updateJadwalTenagaMedis };
