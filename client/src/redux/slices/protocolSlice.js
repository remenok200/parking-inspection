import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../API';
import { toast } from 'react-toastify';

const SLICE_NAME = 'protocols';

const getAllProtocols = createAsyncThunk(
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

const deleteProtocolByID = createAsyncThunk(
  `${SLICE_NAME}/deleteProtocolByID`,
  async ({ parkOfficerID, protocolID }, thunkAPI) => {
    try {
      await API.deleteProtocolByID(parkOfficerID, protocolID);
      toast.success('Protocol successfully deleted');
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
      toast.success('Protocol successfully created');
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
      toast.success('Protocol successfully updated');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addImagesToProtocol = createAsyncThunk(
  `${SLICE_NAME}/addImagesToProtocol`,
  async ({ protocolID, images }, thunkAPI) => {
    try {
      await API.addProtocolImages(images, protocolID);
      toast.success('Images have been successfully added to the protocol');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const getAllProtocolsByOfficerID = createAsyncThunk(
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

const deleteProtocolImageByID = createAsyncThunk(
  `${SLICE_NAME}/deleteProtocolImageByID`,
  async ({ protocolID, imageID }, thunkAPI) => {
    await API.deleteProtocolImageByID(protocolID, imageID);
    toast.success('Protocol image deleted');
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
    builder.addCase(getAllProtocols.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getAllProtocols.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.totalProtocolsCount = action.payload.totalProtocolsCount;
      state.protocols = action.payload.protocols;
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

    builder.addCase(getAllProtocolsByOfficerID.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getAllProtocolsByOfficerID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.protocols = action.payload.protocols;
      state.totalProtocolsCount = action.payload.totalProtocolsCount;
      state.error = null;
    });

    builder.addCase(getAllProtocolsByOfficerID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(addImagesToProtocol.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(addImagesToProtocol.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(addImagesToProtocol.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteProtocolImageByID.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(deleteProtocolImageByID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(deleteProtocolImageByID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = protocolSlice;

export {
  getAllProtocols,
  deleteProtocolByID,
  createProtocol,
  updateProtocol,
  getAllProtocolsByOfficerID,
  addImagesToProtocol,
  deleteProtocolImageByID,
};

export default reducer;
