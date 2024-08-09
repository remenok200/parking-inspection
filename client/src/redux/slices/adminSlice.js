import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';

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

const initialState = {
  allUsers: null,
  bannedUsers: null,
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
  },
});

const { reducer } = adminSlice;

export { getAllUsers, getAllBannedUsers };

export default reducer;
