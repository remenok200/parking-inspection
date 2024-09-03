import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';
import history from '../../BrowserHistory';
import { toast } from 'react-toastify';

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

const authUser = createAsyncThunk(
  `${SLICE_NAME}/authUser`,
  async (_, thunkAPI) => {
    try {
      const {
        data: { data: user },
      } = await API.authUser();

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const logout = createAsyncThunk(
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

    builder.addCase(authUser.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(authUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    });

    builder.addCase(authUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = userSlice;

export { loginUser, registerUser, authUser, logout };

export default reducer;
