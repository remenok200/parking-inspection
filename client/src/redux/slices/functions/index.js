import { toast } from 'react-toastify';

export const handleAsyncThunk = async (apiCall, successMessage, thunkAPI) => {
  try {
    const { data: { data } } = await apiCall();
    if (successMessage) toast.success(successMessage);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};

export const handleFulfilled = (state, action, key) => {
  state.isLoading = false;
  state.error = null;
  state[key] = action.payload;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};