import { configureStore } from '@reduxjs/toolkit';
import parkOfficerReducer from './slices/parkOfficerSlice';
import protocolReducer from './slices/protocolSlice';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';

const store = configureStore({
  reducer: {
    parkOfficers: parkOfficerReducer,
    protocols: protocolReducer,
    users: userReducer,
    admins: adminReducer
  },
});

export default store;
