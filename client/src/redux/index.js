import { configureStore } from "@reduxjs/toolkit";
import parkOfficerReducer from './slices/parkOfficerSlice';
import protocolSlice from './slices/protocolSlice';

const store = configureStore({
  reducer: {
    parkOfficers: parkOfficerReducer,
    protocols: protocolSlice
  }
});

export default store;