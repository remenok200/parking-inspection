import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';
import history from '../../BrowserHistory';
import { toast } from 'react-toastify';
import {
  handleAsyncThunk,
  handleFulfilled,
  handlePending,
  handleRejected,
} from './functions';

const SLICE_NAME = 'users';

export const registerUser = createAsyncThunk(
  `${SLICE_NAME}/registerUser`,
  async (userData, thunkAPI) =>
    handleAsyncThunk(() => API.registerUser(userData), null, thunkAPI)
);

export const loginUser = createAsyncThunk(
  `${SLICE_NAME}/loginUser`,
  async (userData, thunkAPI) =>
    handleAsyncThunk(() => API.loginUser(userData), null, thunkAPI)
);

export const loginUserWithGoogle = createAsyncThunk(
  `${SLICE_NAME}/loginUserWithGoogle`,
  async (token, thunkAPI) =>
    handleAsyncThunk(() => API.loginUserWithGoogle(token), null, thunkAPI)
);

export const registerUserWithGoogle = createAsyncThunk(
  `${SLICE_NAME}/registerUserWithGoogle`,
  async (token, thunkAPI) =>
    handleAsyncThunk(() => API.registerUserWithGoogle(token), null, thunkAPI)
);

export const authUser = createAsyncThunk(
  `${SLICE_NAME}/authUser`,
  async (_, thunkAPI) => handleAsyncThunk(API.authUser, null, thunkAPI)
);

export const logout = createAsyncThunk(
  `${SLICE_NAME}/logout`,
  async (tokenId, thunkAPI) => {
    try {
      await API.logout(tokenId);
      localStorage.clear();
      history.push('/');
      toast.success('Logout successfully');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  `${SLICE_NAME}/resetPassword`,
  async (email, thunkAPI) => {
    try {
      const response = await API.resetPassword(email);
      toast.success('Password reset email sent successfully');
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const updatePassword = createAsyncThunk(
  `${SLICE_NAME}/updatePassword`,
  async ({ token, newPassword }, thunkAPI) =>
    handleAsyncThunk(
      () => API.updatePassword(token, newPassword),
      'Password updated successfully',
      thunkAPI
    )
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
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'user')
      )
      .addCase(loginUser.rejected, handleRejected)

      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'user')
      )
      .addCase(registerUser.rejected, handleRejected)

      .addCase(loginUserWithGoogle.pending, handlePending)
      .addCase(loginUserWithGoogle.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'user')
      )
      .addCase(loginUserWithGoogle.rejected, handleRejected)

      .addCase(registerUserWithGoogle.pending, handlePending)
      .addCase(registerUserWithGoogle.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'user')
      )
      .addCase(registerUserWithGoogle.rejected, handleRejected)

      .addCase(authUser.pending, handlePending)
      .addCase(authUser.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'user')
      )
      .addCase(authUser.rejected, handleRejected)

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(logout.rejected, handleRejected)

      .addCase(resetPassword.pending, handlePending)
      .addCase(resetPassword.fulfilled, handleFulfilled)
      .addCase(resetPassword.rejected, handleRejected)

      .addCase(updatePassword.pending, handlePending)
      .addCase(updatePassword.fulfilled, handleFulfilled)
      .addCase(updatePassword.rejected, handleRejected);
  },
});

const { reducer } = userSlice;

export default reducer;
