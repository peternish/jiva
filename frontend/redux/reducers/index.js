import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "@redux/storage";

// reducers
import authReducer from "../modules/auth";
import klinikReducer from "../modules/klinik";
import pengaturanPenggunaReducer from "../modules/pengaturanPengguna";
import tenagaMedisReducer from "../modules/tenagaMedis";
import dynamicFormReducer from "../modules/dynamicForm";
import jadwalTenagaMedisReducers from "../modules/jadwalTenagaMedis";
import jadwalPasienReducers from "../modules/jadwalPasien";
import rekamanMedisReducers from "../modules/rekamanMedis";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken", "profile"],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  klinik: klinikReducer,
  pengaturanPengguna: pengaturanPenggunaReducer,
  tenagaMedis: tenagaMedisReducer,
  dynamicForm: dynamicFormReducer,
  jadwalTenagaMedis: jadwalTenagaMedisReducers,
  jadwalPasien: jadwalPasienReducers,
  rekamanMedis: rekamanMedisReducers
});

export default rootReducer;
