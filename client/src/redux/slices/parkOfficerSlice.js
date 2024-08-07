import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';
import { toast } from 'react-toastify';

const SLICE_NAME = 'parkOfficer';

const getParkOfficers = createAsyncThunk(
  `${SLICE_NAME}/getParkOfficers`,
  async (param, thunkAPI) => {
    try {
      const {
        data: { data: parkOfficers },
      } = await API.getParkOfficers();

      return parkOfficers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/deleteParkOfficer`,
  async (parkOfficerID, thunkAPI) => {
    try {
      await API.deleteParkOfficer(parkOfficerID);
      toast.success('Officer successfully deleted');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const dismissParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/dismissParkOfficer`,
  async (parkOfficerID, thunkAPI) => {
    try {
      await API.dismissParkOfficer(parkOfficerID);
      toast.success('Officer successfully dismissed');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const restoreParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/restoreParkOfficer`,
  async (parkOfficerID, thunkAPI) => {
    try {
      await API.restoreParkOfficer(parkOfficerID);
      toast.success('Officer successfully restored');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/addParkOfficer`,
  async (parkOfficer, thunkAPI) => {
    try {
      await API.addParkOfficer(parkOfficer);
      toast.success('Officer successfully added');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const updateParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/updateParkOfficer`,
  async ({ parkOfficerID, updatedData }, thunkAPI) => {
    try {
      await API.updateParkOfficer(parkOfficerID, updatedData);
      toast.success('Officer successfully updated');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
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
    builder.addCase(getParkOfficers.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getParkOfficers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.parkOfficers = action.payload;
    });

    builder.addCase(getParkOfficers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteParkOfficer.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(deleteParkOfficer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(deleteParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(dismissParkOfficer.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(dismissParkOfficer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(dismissParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(restoreParkOfficer.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(restoreParkOfficer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(restoreParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(addParkOfficer.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(addParkOfficer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(addParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateParkOfficer.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(updateParkOfficer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = parkOfficerSlice;

export {
  getParkOfficers,
  deleteParkOfficer,
  dismissParkOfficer,
  addParkOfficer,
  updateParkOfficer,
  restoreParkOfficer,
};

export default reducer;
