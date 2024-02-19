import { configureStore } from '@reduxjs/toolkit';
import appReducer from './rootReducer';

const store = configureStore({
  reducer: appReducer,
});

export default store;
