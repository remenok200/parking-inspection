import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';

const SLICE_NAME = 'protocols';

const getAllProtocols = createAsyncThunk(
  `${SLICE_NAME}/getAllProtocols`,
  async (param, thunkAPI) => {
    try {
      const {
        data: { data: protocols },
      } = await API.getAllProtocols();

      return protocols;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteProtocolByID = createAsyncThunk(
  `${SLICE_NAME}/deleteProtocolByID`,
  async ({ parkOfficerID, protocolID }, thunkAPI) => {
    try {
      await API.deleteProtocolByID(parkOfficerID, protocolID);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const createProtocol = createAsyncThunk(
  `${SLICE_NAME}/createProtocol`,
  async ({ parkOfficerID, protocolData }, thunkAPI) => {
    try {
      await API.createProtocol(parkOfficerID, protocolData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const updateProtocol = createAsyncThunk(
  `${SLICE_NAME}/updateProtocol`,
  async ({ parkOfficerID, protocolID, updatedData }, thunkAPI) => {
    try {
      await API.updateProtocol(parkOfficerID, protocolID, updatedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  protocols: [],
  isLoading: false,
  error: null,
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

    builder.addCase(deleteProtocolByID.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(deleteProtocolByID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(deleteProtocolByID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(createProtocol.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(createProtocol.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(createProtocol.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateProtocol.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(updateProtocol.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateProtocol.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = protocolSlice;

export { getAllProtocols, deleteProtocolByID, createProtocol, updateProtocol };

export default reducer;
