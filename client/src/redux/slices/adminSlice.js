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

const initialState = {
  allUsers: null,
  bannedUsers: null,
  userSessions: null,
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
  },
});

const { reducer } = adminSlice;

export { getAllUsers, getAllBannedUsers, banUser, unbanUser, getUserSessions };

export default reducer;
