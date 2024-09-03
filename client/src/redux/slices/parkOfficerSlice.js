import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';
import {
  handleAsyncThunk,
  handleFulfilled,
  handlePending,
  handleRejected,
} from './functions';

const SLICE_NAME = 'parkOfficer';

export const getParkOfficers = createAsyncThunk(
  `${SLICE_NAME}/getParkOfficers`,
  async (_, thunkAPI) =>
    handleAsyncThunk(API.getParkOfficers, 'Park officers received', thunkAPI)
);

export const deleteParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/deleteParkOfficer`,
  async (parkOfficerID, thunkAPI) =>
    handleAsyncThunk(
      () => API.deleteParkOfficer(parkOfficerID),
      'Officer successfully deleted',
      thunkAPI
    )
);

export const dismissParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/dismissParkOfficer`,
  async (parkOfficerID, thunkAPI) =>
    handleAsyncThunk(
      () => API.dismissParkOfficer(parkOfficerID),
      'Officer successfully dismissed',
      thunkAPI
    )
);

export const restoreParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/restoreParkOfficer`,
  async (parkOfficerID, thunkAPI) =>
    handleAsyncThunk(
      () => API.restoreParkOfficer(parkOfficerID),
      'Officer successfully restored',
      thunkAPI
    )
);

export const addParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/addParkOfficer`,
  async (parkOfficer, thunkAPI) =>
    handleAsyncThunk(
      () => API.addParkOfficer(parkOfficer),
      'Officer successfully added',
      thunkAPI
    )
);

export const updateParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/updateParkOfficer`,
  async ({ parkOfficerID, updatedData }, thunkAPI) =>
    handleAsyncThunk(
      () => API.updateParkOfficer(parkOfficerID, updatedData),
      'Officer successfully updated',
      thunkAPI
    )
);

const initialState = {
  parkOfficers: [],
  isLoading: false,
  error: null,
};

const parkOfficerSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getParkOfficers.pending, handlePending)
      .addCase(getParkOfficers.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'parkOfficers')
      )
      .addCase(getParkOfficers.rejected, handleRejected)

      .addCase(deleteParkOfficer.pending, handlePending)
      .addCase(deleteParkOfficer.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteParkOfficer.rejected, handleRejected)

      .addCase(dismissParkOfficer.pending, handlePending)
      .addCase(dismissParkOfficer.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(dismissParkOfficer.rejected, handleRejected)

      .addCase(restoreParkOfficer.pending, handlePending)
      .addCase(restoreParkOfficer.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(restoreParkOfficer.rejected, handleRejected)

      .addCase(addParkOfficer.pending, handlePending)
      .addCase(addParkOfficer.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addParkOfficer.rejected, handleRejected)

      .addCase(updateParkOfficer.pending, handlePending)
      .addCase(updateParkOfficer.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateParkOfficer.rejected, handleRejected);
  },
});

const { reducer } = parkOfficerSlice;

export default reducer;
