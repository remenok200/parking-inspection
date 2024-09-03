import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';
import {
  handleAsyncThunk,
  handleFulfilled,
  handlePending,
  handleRejected,
} from './functions';

const SLICE_NAME = 'admins';

export const getAllUsers = createAsyncThunk(
  `${SLICE_NAME}/getAllUsers`,
  async (_, thunkAPI) => handleAsyncThunk(API.getAllUsers, null, thunkAPI)
);

export const getAllBannedUsers = createAsyncThunk(
  `${SLICE_NAME}/getAllBannedUsers`,
  async (_, thunkAPI) => handleAsyncThunk(API.getAllBannedUsers, null, thunkAPI)
);

export const banUser = createAsyncThunk(
  `${SLICE_NAME}/banUser`,
  async ({ userId, reason }, thunkAPI) =>
    handleAsyncThunk(
      () => API.banUser(userId, reason),
      'User successfully banned',
      thunkAPI
    )
);

export const unbanUser = createAsyncThunk(
  `${SLICE_NAME}/unbanUser`,
  async (userId, thunkAPI) =>
    handleAsyncThunk(
      () => API.unbanUser(userId),
      'User successfully unbanned',
      thunkAPI
    )
);

export const endSession = createAsyncThunk(
  `${SLICE_NAME}/endSession`,
  async (tokenId, thunkAPI) =>
    handleAsyncThunk(
      () => API.endSession(tokenId),
      'Session successfully revoked',
      thunkAPI
    )
);

export const getUserSessions = createAsyncThunk(
  `${SLICE_NAME}/getUserSessions`,
  async (userId, thunkAPI) => {
    const data = await handleAsyncThunk(
      () => API.getUserSessions(userId),
      'User sessions received',
      thunkAPI
    );
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
);

export const getAllLogs = createAsyncThunk(
  `${SLICE_NAME}/getAllLogs`,
  async (_, thunkAPI) => {
    const data = await handleAsyncThunk(
      API.getAllLogs,
      'User logs received',
      thunkAPI
    );
    return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
);

export const getAllLogsByUserID = createAsyncThunk(
  `${SLICE_NAME}/getAllLogsByUserID`,
  async (userId, thunkAPI) => {
    const data = await handleAsyncThunk(
      () => API.getAllLogsByUserID(userId),
      'User logs received',
      thunkAPI
    );
    return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
);

export const makeAdmin = createAsyncThunk(
  `${SLICE_NAME}/makeAdmin`,
  async (userId, thunkAPI) =>
    handleAsyncThunk(
      () => API.makeAdmin(userId),
      'User promoted to admin successfully',
      thunkAPI
    )
);

export const removeAdmin = createAsyncThunk(
  `${SLICE_NAME}/removeAdmin`,
  async (userId, thunkAPI) =>
    handleAsyncThunk(
      () => API.removeAdmin(userId),
      'Admin role removed successfully',
      thunkAPI
    )
);

const initialState = {
  allUsers: null,
  bannedUsers: null,
  userSessions: null,
  userLogs: null,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, handlePending)
      .addCase(getAllUsers.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'allUsers')
      )
      .addCase(getAllUsers.rejected, handleRejected)
      .addCase(getAllBannedUsers.pending, handlePending)
      .addCase(getAllBannedUsers.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'bannedUsers')
      )
      .addCase(getAllBannedUsers.rejected, handleRejected)
      .addCase(banUser.pending, handlePending)
      .addCase(banUser.fulfilled, handleFulfilled)
      .addCase(banUser.rejected, handleRejected)
      .addCase(unbanUser.pending, handlePending)
      .addCase(unbanUser.fulfilled, handleFulfilled)
      .addCase(unbanUser.rejected, handleRejected)
      .addCase(getUserSessions.pending, handlePending)
      .addCase(getUserSessions.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'userSessions')
      )
      .addCase(getUserSessions.rejected, handleRejected)
      .addCase(endSession.pending, handlePending)
      .addCase(endSession.fulfilled, handleFulfilled)
      .addCase(endSession.rejected, handleRejected)
      .addCase(getAllLogs.pending, handlePending)
      .addCase(getAllLogs.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'userLogs')
      )
      .addCase(getAllLogs.rejected, handleRejected)
      .addCase(getAllLogsByUserID.pending, handlePending)
      .addCase(getAllLogsByUserID.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'userLogs')
      )
      .addCase(getAllLogsByUserID.rejected, handleRejected)
      .addCase(makeAdmin.pending, handlePending)
      .addCase(makeAdmin.fulfilled, handleFulfilled)
      .addCase(makeAdmin.rejected, handleRejected)
      .addCase(removeAdmin.pending, handlePending)
      .addCase(removeAdmin.fulfilled, handleFulfilled)
      .addCase(removeAdmin.rejected, handleRejected);
  },
});

const { reducer } = adminSlice;

export default reducer;