import jivaAPI from "@api/index";
import { setJadwalPasien } from "@redux/modules/jadwalPasien";
import { toast } from "react-toastify";
import constants from "@utils/constants"

const getJadwalPasien = ({ idJadwalTenagaMedis }) => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.jadwalPasien.getJadwalPasien({ idJadwalTenagaMedis });
            await dispatch(setJadwalPasien(data));
        } catch (error) {
            toast(constants.BASE_ERROR_MESSAGE, { type: toast.TYPE.ERROR });
        }
    };
};

export { getJadwalPasien }