import { configureStore } from "@reduxjs/toolkit";
import parkOfficerReducer from './slices/parkOfficerSlice';

const store = configureStore({
  reducer: {
    parkOfficers: parkOfficerReducer
  }
});

export default store;