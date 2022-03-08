import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "@redux/storage";

// reducers
import authReducer from "../modules/auth";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken"],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export default rootReducer;
