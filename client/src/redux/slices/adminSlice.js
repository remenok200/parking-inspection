import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';
import { toast } from 'react-toastify';

const SLICE_NAME = 'admins';

const getAllUsers = createAsyncThunk(
  `${SLICE_NAME}/getAllUsers`,
  async (_, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.getAllUsers();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const getAllBannedUsers = createAsyncThunk(
  `${SLICE_NAME}/getAllBannedUsers`,
  async (_, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.getAllBannedUsers();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const banUser = createAsyncThunk(
  `${SLICE_NAME}/banUser`,
  async ({ userId, reason }, thunkAPI) => {
    try {
      await API.banUser(userId, reason);

      toast.success('User successfully banned');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const unbanUser = createAsyncThunk(
  `${SLICE_NAME}/unbanUser`,
  async (userId, thunkAPI) => {
    try {
      await API.unbanUser(userId);

      toast.success('User successfully unbanned');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const endSession = createAsyncThunk(
  `${SLICE_NAME}/endSession`,
  async (tokenId, thunkAPI) => {
    try {
      await API.endSession(tokenId);

      toast.success('Session successfully revoked');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const getUserSessions = createAsyncThunk(
  `${SLICE_NAME}/getUserSessions`,
  async (userId, thunkAPI) => {
    try {
      const {
        data: { data: refreshTokens },
      } = await API.getUserSessions(userId);

      toast.success('User sessions received');

      const sortedRefreshTokens = refreshTokens.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return sortedRefreshTokens;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const getAllLogs = createAsyncThunk(
  `${SLICE_NAME}/getAllLogs`,
  async (_, thunkAPI) => {
    try {
      const {
        data: { data: userLogs },
      } = await API.getAllLogs();

      const sortedLogs = userLogs.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      toast.success('User logs received');

      return sortedLogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const getAllLogsByUserID = createAsyncThunk(
  `${SLICE_NAME}/getAllLogsByUserID`,
  async (userId, thunkAPI) => {
    try {
      const {
        data: { data: userLogs },
      } = await API.getAllLogsByUserID(userId);

      const sortedLogs = userLogs.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      toast.success('User logs received');

      return sortedLogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
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
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.allUsers = action.payload;
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getAllBannedUsers.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getAllBannedUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.bannedUsers = action.payload;
    });

    builder.addCase(getAllBannedUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(banUser.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(banUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(banUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(unbanUser.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(unbanUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(unbanUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getUserSessions.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getUserSessions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.userSessions = action.payload;
    });

    builder.addCase(getUserSessions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(endSession.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(endSession.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(endSession.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getAllLogs.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getAllLogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userLogs = action.payload;
      state.error = null;
    });

    builder.addCase(getAllLogs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getAllLogsByUserID.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getAllLogsByUserID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userLogs = action.payload;
      state.error = null;
    });

    builder.addCase(getAllLogsByUserID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = adminSlice;

export {
  getAllUsers,
  getAllBannedUsers,
  banUser,
  unbanUser,
  getUserSessions,
  endSession,
  getAllLogs,
  getAllLogsByUserID,
};

export default reducer;
