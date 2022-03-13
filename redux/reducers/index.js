import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "@redux/storage";

// reducers
import authReducer from "../modules/auth";
import klinikReducer from "../modules/klinik";
import pengaturanPenggunaReducer from "../modules/pengaturanPengguna";
import tenagaMedisReducer from "../modules/tenagaMedis";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken"],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
<<<<<<< HEAD
  klinik: klinikReducer,
  pengaturanPengguna: pengaturanPenggunaReducer,
=======
  tenagaMedis: tenagaMedisReducer,
>>>>>>> feat/dashboard-tenaga-medis
});

export default rootReducer;
