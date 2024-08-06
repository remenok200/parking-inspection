import { configureStore } from '@reduxjs/toolkit';
import parkOfficerReducer from './slices/parkOfficerSlice';
import protocolReducer from './slices/protocolSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    parkOfficers: parkOfficerReducer,
    protocols: protocolReducer,
    users: userReducer,
  },
});

export default store;
