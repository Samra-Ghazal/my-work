import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({});

const appReducer = (state, action) => {
  // if(action.type === LOGOUT){
  //     removeAllLocalStorage();
  //     removeAllCookies();
  //     state = undefined;
  // }
  return rootReducer(state, action);
};

export default appReducer;
