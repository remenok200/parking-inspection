import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';
import {
  handleAsyncThunk,
  handleFulfilled,
  handlePending,
  handleRejected,
} from './functions';

const SLICE_NAME = 'protocols';

export const getAllProtocols = createAsyncThunk(
  `${SLICE_NAME}/getAllProtocols`,
  async (page, thunkAPI) => {
    return handleAsyncThunk(() => API.getAllProtocols(page), null, thunkAPI);
  }
);

export const deleteProtocolByID = createAsyncThunk(
  `${SLICE_NAME}/deleteProtocolByID`,
  async ({ parkOfficerID, protocolID }, thunkAPI) => {
    return handleAsyncThunk(
      () => API.deleteProtocolByID(parkOfficerID, protocolID),
      'Protocol successfully deleted',
      thunkAPI
    );
  }
);

export const createProtocol = createAsyncThunk(
  `${SLICE_NAME}/createProtocol`,
  async ({ parkOfficerID, protocolData }, thunkAPI) => {
    return handleAsyncThunk(
      () => API.createProtocol(parkOfficerID, protocolData),
      'Protocol successfully created',
      thunkAPI
    );
  }
);

export const updateProtocol = createAsyncThunk(
  `${SLICE_NAME}/updateProtocol`,
  async ({ parkOfficerID, protocolID, updatedData }, thunkAPI) => {
    return handleAsyncThunk(
      () => API.updateProtocol(parkOfficerID, protocolID, updatedData),
      'Protocol successfully updated',
      thunkAPI
    );
  }
);

export const addImagesToProtocol = createAsyncThunk(
  `${SLICE_NAME}/addImagesToProtocol`,
  async ({ protocolID, images }, thunkAPI) => {
    return handleAsyncThunk(
      () => API.addProtocolImages(images, protocolID),
      'Images have been successfully added to the protocol',
      thunkAPI
    );
  }
);

export const getAllProtocolsByOfficerID = createAsyncThunk(
  `${SLICE_NAME}/getAllProtocolsByOfficerID`,
  async ({ parkOfficerID, page }, thunkAPI) => {
    return handleAsyncThunk(
      () => API.getAllProtocolsByOfficerID(parkOfficerID, page),
      null,
      thunkAPI
    );
  }
);

export const deleteProtocolImageByID = createAsyncThunk(
  `${SLICE_NAME}/deleteProtocolImageByID`,
  async ({ protocolID, imageID }, thunkAPI) => {
    return handleAsyncThunk(
      () => API.deleteProtocolImageByID(protocolID, imageID),
      'Protocol image deleted',
      thunkAPI
    );
  }
);

const initialState = {
  protocols: [],
  isLoading: false,
  error: null,
  totalProtocolsCount: 0,
};

const protocolSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProtocols.pending, handlePending);
    builder.addCase(getAllProtocols.fulfilled, (state, action) => {
      handleFulfilled(state, action, 'protocols');
      state.totalProtocolsCount = action.payload.totalProtocolsCount;
    });
    builder.addCase(getAllProtocols.rejected, handleRejected);

    builder.addCase(deleteProtocolByID.pending, handlePending);
    builder.addCase(deleteProtocolByID.fulfilled, handleFulfilled);
    builder.addCase(deleteProtocolByID.rejected, handleRejected);

    builder.addCase(createProtocol.pending, handlePending);
    builder.addCase(createProtocol.fulfilled, handleFulfilled);
    builder.addCase(createProtocol.rejected, handleRejected);

    builder.addCase(updateProtocol.pending, handlePending);
    builder.addCase(updateProtocol.fulfilled, handleFulfilled);
    builder.addCase(updateProtocol.rejected, handleRejected);

    builder.addCase(getAllProtocolsByOfficerID.pending, handlePending);
    builder.addCase(getAllProtocolsByOfficerID.fulfilled, (state, action) => {
      handleFulfilled(state, action, 'protocols');
      state.totalProtocolsCount = action.payload.totalProtocolsCount;
    });
    builder.addCase(getAllProtocolsByOfficerID.rejected, handleRejected);

    builder.addCase(addImagesToProtocol.pending, handlePending);
    builder.addCase(addImagesToProtocol.fulfilled, handleFulfilled);
    builder.addCase(addImagesToProtocol.rejected, handleRejected);

    builder.addCase(deleteProtocolImageByID.pending, handlePending);
    builder.addCase(deleteProtocolImageByID.fulfilled, handleFulfilled);
    builder.addCase(deleteProtocolImageByID.rejected, handleRejected);
  },
});

const { reducer } = protocolSlice;

export default reducer;
