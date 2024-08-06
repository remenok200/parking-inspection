import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API/authUserApi';

const SLICE_NAME = 'users';

const registerUser = createAsyncThunk(
  `${SLICE_NAME}/registerUser`,
  async (userData, thunkAPI) => {
    try {
      const {
        data: { data: registeredUser },
      } = await API.registerUser(userData);

      return registeredUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const loginUser = createAsyncThunk(
  `${SLICE_NAME}/loginUser`,
  async (userData, thunkAPI) => {
    try {
      const {
        data: { data: user },
      } = await API.loginUser(userData);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(registerUser.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = userSlice;

export { loginUser, registerUser };

export default reducer;
