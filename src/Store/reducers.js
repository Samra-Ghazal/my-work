import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// Front
// import Layout from './layout/reducer';

// Authentication Module

import { dynamicFormSlice } from "./dynamicForm/slice";

// import persistReducer from 'redux-persist/es/persistReducer';
// import AuthReducer

// const authPersistConfig = {
//     key: 'auth',
//     storage: storage,
//     keyPrefix: 'redux-',
//     whitelist: ['auth']
//   };

const resettable = (reducer) => (state, action) => {
  // if (action.type === LOGOUT) {
  //   removeAllLocalStorage();
  //   removeAllCookies();
  //   return reducer(undefined, action);
  // }
  // return reducer(state, action);
};

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),

    DynamicForm: resettable(dynamicFormSlice),
  });

export default rootReducer;
