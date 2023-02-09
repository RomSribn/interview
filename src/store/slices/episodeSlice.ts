import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { IEpisode, TInfo } from 'interfaces/index';
import httpClient from 'services/http';

type TGetEpisodesParams = {
  page?: number;
  name?: string;
};

export const getEpisodes = createAsyncThunk(
  'episode/getEpisodes',
  async ({ page = 1, name = '' }: TGetEpisodesParams) => {
    const response = await httpClient('/episode', { params: { page, name } });
    return response.data;
  }
);

export const getEpisode = createAsyncThunk('episode/getEpisode', async (id: number) => {
  const response = await httpClient(`/episode/${id}`);
  return response.data;
});

// Type for our state
export interface appState {
  data: IEpisode[];
  currentElement: IEpisode | null;
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
export const episodeSlice = createSlice({
  name: 'episode',
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
    builder.addCase(getEpisodes.fulfilled, (state, action) => {
      state.data = action.payload.results;
      state.info = action.payload.info;
      state.status = null;
    });
    builder.addCase(getEpisodes.pending, (state, action) => {
      state.status = 'Fetching episodes. Please wait a moment...';
    });
    builder.addCase(getEpisodes.rejected, (state, action) => {
      state.status = 'Failed to fetch data...';
    });
    builder.addCase(getEpisode.fulfilled, (state, action) => {
      state.currentElement = action.payload;
      state.status = null;
    });
    builder.addCase(getEpisode.pending, (state) => {
      state.status = 'Fetching episode. Please wait a moment...';
    });
    builder.addCase(getEpisode.rejected, (state) => {
      state.status = 'Failed to fetch data...';
    });
  }
});

export const { setPage } = episodeSlice.actions;
export const selectEpisodeState = (state: AppState) => state.episode;

export default episodeSlice.reducer;
