import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { ILocation, TInfo } from 'interfaces/index';
import httpClient from 'services/http';

type TGetLocationsParams = {
  page?: number;
  name?: string;
};

export const getLocations = createAsyncThunk(
  'location/getLocations',
  async ({ page = 1, name = '' }: TGetLocationsParams) => {
    const response = await httpClient('/location', { params: { page, name } });
    return response.data;
  }
);

export const getLocation = createAsyncThunk('location/getLocation', async (id: number) => {
  const response = await httpClient(`/location/${id}`);
  return response.data;
});

// Type for our state
export interface appState {
  data: ILocation[];
  currentElement: ILocation | null;
  info: TInfo | null;
  page: number;
  status: string | null;
}

// Initial state
const initialState: appState = {
  data: [],
  currentElement: null,
  info: null,
  page: 1,
  status: null
};

// Actual Slice
export const locationSlice = createSlice({
  name: 'location',
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
      state.data = action.payload.results;
      state.info = action.payload.info;
      state.status = null;
    });
    builder.addCase(getLocations.pending, (state, action) => {
      state.status = 'Fetching locations. Please wait a moment...';
    });
    builder.addCase(getLocations.rejected, (state, action) => {
      state.status = 'Failed to fetch data...';
    });
    builder.addCase(getLocation.fulfilled, (state, action) => {
      state.currentElement = action.payload;
      state.status = null;
    });
    builder.addCase(getLocation.pending, (state) => {
      state.status = 'Fetching location. Please wait a moment...';
    });
    builder.addCase(getLocation.rejected, (state) => {
      state.status = 'Failed to fetch data...';
    });
  }
});

export const { setPage } = locationSlice.actions;
export const selectLocationsState = (state: AppState) => state.location;

export default locationSlice.reducer;
