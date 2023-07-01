import jivaAPI from "@api/index";
import { setJadwalPasien } from "@redux/modules/jadwalPasien";
import { toast } from "react-toastify";

const getJadwalPasienList = ({ idCabang }) => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.jadwalPasien.getJadwalPasienList({ idCabang });
            await dispatch(setJadwalPasien(data));
        } catch (error) {
            toast(error.toString(), { type: toast.TYPE.ERROR });
        }
    };
};

export { getJadwalPasienList }