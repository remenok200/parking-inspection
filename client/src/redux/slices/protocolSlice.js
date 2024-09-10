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
    try {
      let response;
      if (page) {
        response = await API.getAllProtocols(page);
      } else {
        response = await API.getAllProtocols();
      }

      const { data, totalProtocolsCount } = response.data;

      return { protocols: data, totalProtocolsCount };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProtocolById = createAsyncThunk(
  `${SLICE_NAME}/getProtocolById`,
  async (protocolID, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.getProtocolById(protocolID);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
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
    try {
      let response;
      if (page) {
        response = await API.getAllProtocolsByOfficerID(parkOfficerID, page);
      } else {
        response = await API.getAllProtocolsByOfficerID(parkOfficerID);
      }

      const { data, totalProtocolsCount } = response.data;

      return { protocols: data, totalProtocolsCount };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
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
  selectedProtocol: null,
};

const protocolSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProtocols.pending, handlePending);
    builder.addCase(getAllProtocols.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.totalProtocolsCount = action.payload.totalProtocolsCount;
      state.protocols = action.payload.protocols;
    });
    builder.addCase(getAllProtocols.rejected, handleRejected);

    builder.addCase(getProtocolById.pending, handlePending);
    builder.addCase(getProtocolById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.selectedProtocol = action.payload;
    });
    builder.addCase(getProtocolById.rejected, handleRejected);

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
      state.isLoading = false;
      state.protocols = action.payload.protocols;
      state.totalProtocolsCount = action.payload.totalProtocolsCount;
      state.error = null;
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
