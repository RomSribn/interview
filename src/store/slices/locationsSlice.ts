import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { IEpisode } from 'interfaces/index';
import httpClient from 'services/http';

export const getLocations = createAsyncThunk('locations/getLocations', async (page: number = 1) => {
  const response = await httpClient('/location', { params: { page } });
  return response.data;
});

// Type for our state
export interface appState {
  locations: IEpisode[];
  page: number;
  status: string | null;
}

// Initial state
const initialState: appState = {
  locations: [],
  page: 1,
  status: null
};

// Actual Slice
export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    // @ts-ignore
    builder.addCase(HYDRATE, (state: any, action: { payload: { app: any } }) => ({
      ...state,
      ...action.payload.app
    }));
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
      state.status = null;
    });
    builder.addCase(getLocations.pending, (state, action) => {
      state.status = 'Fetching locations. Please wait a moment...';
    });
    builder.addCase(getLocations.rejected, (state, action) => {
      state.status = 'Failed to fetch data...';
    });
  }
});

export const { setPage } = locationsSlice.actions;

export const selectLocationsState = (state: AppState) => state.locations;

export default locationsSlice.reducer;
