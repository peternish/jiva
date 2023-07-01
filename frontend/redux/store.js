import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import persistReducer from "@redux/reducers";
import thunk from "redux-thunk";

const middleware = [thunk];

const store = createStore(
  persistReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };