import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "@redux/storage";

// reducers
import authReducer from "../modules/auth";
import tenagaMedisReducer from "../modules/tenagaMedis";
import klinikReducer from "../modules/klinik";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken"],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  tenagaMedis: tenagaMedisReducer,
  klinik: klinikReducer,
});

export default rootReducer;
