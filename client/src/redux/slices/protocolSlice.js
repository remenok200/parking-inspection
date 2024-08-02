import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';

const SLICE_NAME = 'protocols';

const getAllProtocols = createAsyncThunk(
  `${SLICE_NAME}/getAllProtocols`,
  async (param, thunkAPI) => {
    try {
      const { data: { data: protocols } } = await API.getAllProtocols();

      return protocols;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  protocols: [],
  isLoading: false,
  error: null
};

const protocolSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProtocols.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getAllProtocols.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.protocols = action.payload;
    });

    builder.addCase(getAllProtocols.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
});

const { reducer } = protocolSlice;

export { getAllProtocols };

export default reducer;