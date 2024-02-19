import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";

const persistConfig = {
  key: "root",
  storage,
};

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const middleware = [...getDefaultMiddleware(), sagaMiddleware, routeMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check middleware
    }).concat(sagaMiddleware, routeMiddleware),
  middleware,
  // devTools: process.env.NODE_ENV !== "production",
});

// sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor, history };
