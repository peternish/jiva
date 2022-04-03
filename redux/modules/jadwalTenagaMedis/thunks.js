import jivaAPI from "@api/index";
import { setJadwalTenagaMedisList, setJadwalTenagaMedis } from "@redux/modules/jadwalTenagaMedis";
import { toast } from "react-toastify";
import { capitalize } from "@utils/index";

const getJadwalTenagaMedisList = ({ idCabang }) => {
    return async (dispatch) => {
        try {
            //console.log(idCabang, "idcabang");
            const { data } = await jivaAPI.jadwalTenagaMedis.getJadwalTenagaMedisList({ idCabang });
            //console.log(data);
            await dispatch(setJadwalTenagaMedisList(data));
        } catch (error) {
            console.log(error);
        }
    };
};

const getJadwalTenagaMedis = ({ idJadwal }) => {
    return async (dispatch) => {
        try {
            console.log(data);
            const { data } = await jivaAPI.jadwalTenagaMedis.getJadwalTenagaMedis({ idJadwal });
            await dispatch(setJadwalTenagaMedis(data));
        } catch (error) {
            console.log(error);
        }
    };
};

const createJadwalTenagaMedis = ({ idTenagaMedis, startTime, endTime, quota, day }) => {
    return async (dispatch) => {
        try {
            //console.log(data);
            await jivaAPI.jadwalTenagaMedis.createJadwalTenagaMedis({ idTenagaMedis, startTime, endTime, quota, day });
        } catch(error) {
            console.log(error);
        }
    }
}



export { getJadwalTenagaMedisList, getJadwalTenagaMedis, createJadwalTenagaMedis };
